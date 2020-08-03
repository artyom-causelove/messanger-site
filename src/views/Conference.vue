<template>
  <div class="conference page">
    <div class="conference__messages-wrapper">
      <div v-for="message of messages" :key="message['_id']"
        class="conference__messages-item-wrapper"
      >
        <p class="conference__messages-text">{{ message.text }}</p>
        <app-avatar-input
          :src="message.avatar"
          isChangeble="false"
          class="conference__messages-avatar"
        />
      </div>

      <div class="conference__messages-input-wrapper">
        <app-message-input
          @sendMessage="onSendMessage"
          class="conference__messages-input"
        />
      </div>
    </div>
    <transition name="fade">
      <div v-if="isEditing || isAdding"
        class="cloak"
      >
        <app-form v-if="isEditing"
          :hasClose="true"
          @formClosed="toggleEditing"
          class="conference__edit-form"
        >
          <template v-slot:title>
            <app-editable-input
              v-model="name"
              @valueChanged="onInfoChanged('name', $event)"
              @input="setInputValue('name')"
              borderColor="#3f51b5"
              initialBorderColor="#c5cae9"
              maxlength="30"
              class="conference__edit-name"
            />
          </template>

          <template v-slot:data>
            <app-avatar-input
              :src="avatar"
              @imageChanged="onNewConfImageChanged"
              class="conference__edit-image-input"
            />
            <div class="conference__edit-participants-wrapper">
              <app-button
                @click="toggleAdding"
                class="conference__edit-participant-button"
              >+ Add users</app-button>
              <div v-for="participant of participants" :key="participant.outerId"
                class="conference__edit-participant-item"
              >
                <app-avatar-input
                  :src="participant.avatar"
                  isChangeble="false"
                  class="conference__edit-participant-item-img"
                />
                <span class="conference__edit-participant-item-nickname">{{ participant.nickname }}</span>
                <button v-if="conference.ownerUserOuterId === user.outerId  "
                  @click="deleteParticipant(participant.outerId)"
                  class="conference__edit-participant-item-delete"
                >
                  <img class="conference__edit-participant-item-delete-icon" src="@/assets/images/close.svg">
                </button>
              </div>
            </div>
          </template>
        </app-form>

        <transition name="fade">
          <app-form v-if="isAdding"
            :hasClose="true"
            @formClosed="toggleAdding"
            class="conference__adding-form"
          >
            <template v-slot:title>
              <div class="conference__adding-tab-wrapper">
                <button
                  @click="moveSlider('0')"
                  class="conference__adding-tab"
                  :class="{ active: currentTab === 'friends' }">
                  <span>Friends</span>
                </button>
                <button
                  @click="moveSlider('calc(-100% - 30px)')"
                  class="conference__adding-tab"
                  :class="{ active: currentTab === 'all' }">
                  <span>All</span>
                </button>
              </div>
            </template>

            <template v-slot:data>
              <div ref="slider"
                :style="{ transform: `translateX(${sliderTranslate})` }"
                class="conference__adding-slider">
                <div class="conference__adding-wrapper">
                </div>
                <div class="conference__adding-wrapper">
                  <input
                    v-model="findText"
                    @input="findByNickname"
                    class="conference__adding-search app-input">
                  <div v-for="man of findedUsers" :key="man.outerId"
                    class="conference__adding-search-item"
                  >
                    <app-avatar-input
                      :src="man.avatar"
                      isChangeble="false"
                      class="conference__adding-search-avatar"
                    />
                    <span class="conference__adding-search-nickname">
                      {{ man.nickname }}
                    </span>
                    <button
                      @click="addParticipant($event, man.outerId)"
                      class="conference__adding-add-button"
                    >
                      <svg viewBox="0 0 30 30" class="conference__adding-add-icon">
                        <path d="M15 0C6.72914 0 0 6.72914 0 15C0 23.2709 6.72914 30 15 30C23.2709
                          30 30 23.2709 30 15C30 6.72914 23.2709 0 15 0ZM23.75 15.625C23.75 15.9705
                          23.4704 16.25 23.125 16.25H16.25V23.125C16.25 23.4705 15.9704 23.75 15.625
                          23.75H14.375C14.0295 23.75 13.75 23.4705 13.75 23.125V16.25H6.87498C6.52951
                          16.25 6.24996 15.9704 6.24996 15.625V14.375C6.24996 14.0295 6.52951 13.75
                          6.87498 13.75H13.75V6.87498C13.75 6.52951 14.0295 6.24996 14.375
                          6.24996H15.625C15.9704 6.24996 16.25 6.52951 16.25
                          6.87498V13.75H23.125C23.4704 13.75 23.75 14.0295 23.75 14.375V15.625V15.625Z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </template>
          </app-form>
        </transition>
      </div>
    </transition>
    <app-header
      @showError="$emit('showError', $event)"
      class="conference__header app__header"
    >
      <button
        @click="toggleEditing"
        class="conference__header-button"
      >
        <span class="conference__header-name">{{ conference.name }}</span>
        <svg class="conference__header-icon" viewBox="0 0 19 19">
          <path d="M18 7.4H16.2C16 7.4 15.7 7.2 15.6 7 15.5 6.7 15.6 6.4 15.8 6.2L17 5C17.2
            4.8 17.3 4.5 17.3 4.3 17.3 4 17.2 3.8 17 3.6L15.4 2C15 1.6 14.4 1.6 14 2L12.8
            3.2C12.6 3.4 12.4 3.4 12.3 3.4 12.1 3.4 11.9 3.4 11.8 3.3 11.7 3.2 11.6 3 11.6
            2.8V1C11.6 0.4 11.2 0 10.6 0H8.4C7.8 0 7.4 0.4 7.4 1V2.8C7.4 3.2 7 3.4 6.7 3.4
            6.6 3.4 6.4 3.4 6.2 3.2L5 2C4.6 1.6 4 1.6 3.6 2L2 3.6C1.8 3.8 1.7 4 1.7 4.3 1.7
            4.5 1.8 4.8 2 5L3.2 6.2C3.4 6.4 3.5 6.7 3.4 7 3.3 7.2 3 7.4 2.8 7.4H1C0.4 7.4 0
            7.8 0 8.4V10.6C0 11.2 0.4 11.6 1 11.6H2.8C3 11.6 3.3 11.8 3.4 12 3.5 12.3 3.4 12.6
            3.2 12.8L2 14C1.8 14.2 1.7 14.5 1.7 14.7 1.7 15 1.8 15.2 2 15.4L3.6 17C4 17.4 4.6
            17.4 5 17L6.2 15.8C6.4 15.6 6.6 15.6 6.7 15.6 7 15.6 7.4 15.8 7.4 16.2V18C7.4
            18.6 7.8 19 8.4 19H10.6C11.2 19 11.6 18.6 11.6 18V16.2C11.6 15.8 12 15.6 12.3
            15.6 12.4 15.6 12.6 15.6 12.8 15.8L14 17C14.4 17.4 15 17.4 15.4 17L17 15.4C17.2
            15.2 17.3 15 17.3 14.7 17.3 14.5 17.2 14.2 17 14L15.8 12.8C15.6 12.6 15.5 12.3
            15.6 12 15.7 11.8 16 11.6 16.2 11.6H18C18.6 11.6 19 11.2 19 10.6V8.4C19 7.8 18.6
            7.4 18 7.4ZM12 9.5C12 10.9 10.9 12 9.5 12 8.1 12 7 10.9 7 9.5 7 8.1 8.1 7 9.5 7
            10.9 7 12 8.1 12 9.5Z"/>
        </svg>
      </button>
    </app-header>
  </div>
</template>

<script>
import AppHeader from '@/components/app-header'
import AppMessageInput from '@/components/message-components/app-message-input'
import AppEditableInput from '@/components/form-components/app-editable-input'
import AppAvatarInput from '@/components/form-components/app-avatar-input'
import AppButton from '@/components/form-components/app-button'
import AppForm from '@/components/form-components/app-form'
import conferenceService from '@/services/conference.service'
import userService from '@/services/user.service'

export default {
  props: {
    conference: {
      default: null
    }
  },
  name: 'Conference',
  data () {
    return {
      user: null,
      messages: [],
      isEditing: false,
      isAdding: false,
      name: null,
      avatar: null,
      sliderTranslate: '0',
      participants: [],
      findedUsers: [],
      findTimer: null,
      findText: '',
      currentTab: 'friends'
    }
  },
  async created () {
    this.name = this.conference.name
    this.avatar = this.conference.avatar
    this.participants = await conferenceService.getParticipants(this.conference['_id'])

    this.$store.state.messages.subscribe(messages => {
      const msgObj = messages.find(msgObj => msgObj.confId === this.conference['_id'])

      if (msgObj) {
        this.messages = msgObj.messages
      }
    })

    this.$store.state.user.subscribe(user => {
      if (user) {
        this.user = user
      }
    })
  },
  methods: {
    onSendMessage (text) {
      this.$store.state.socket.getValue().emit('messageToConf', { text, confId: this.conference['_id'] })
    },
    toggleEditing () {
      this.isEditing = !this.isEditing
    },
    toggleAdding () {
      this.isAdding = !this.isAdding
    },
    moveSlider (transalte) {
      this.sliderTranslate = transalte

      if (transalte === 'calc(-100% - 30px)') {
        this.currentTab = 'all'
      } else {
        this.currentTab = 'friends'
      }
    },
    async findByNickname (event) {
      if (this.findTimer === null && this.findText !== '') {
        this.findTimer = setTimeout(async () => {
          try {
            if (this.findText !== '') {
              const res = await userService.findByNickname(this.findText)

              this.findedUsers = res.filter(obj => {
                let isExists = false

                this.participants.forEach(user => {
                  if (user.outerId === obj.outerId) {
                    isExists = true
                  }
                })

                if (!isExists) {
                  return true
                }

                return false
              })
            }

            this.findTimer = null
          } catch (exception) {
            console.log(exception.message)
          }
        }, 1500)
      }
    },
    async addParticipant (event, outerId) {
      try {
        event.srcElement.style.display = 'none'
        const addedUser = await conferenceService.addParticipant(this.conference['_id'], outerId)

        this.participants.push(addedUser)
      } catch (exception) {
        event.srcElement.style.display = 'block'
      }
    },
    async deleteParticipant (userOuterId) {
      try {
        await conferenceService.deleteParticipant(this.conference['_id'], userOuterId)

        this.participants = this.participants.filter(participant => participant.outerId !== userOuterId)
      } catch (exception) {
        console.log(exception.message)
      }
    },
    onInfoChanged () {

    },
    setInputValue () {

    },
    onNewConfImageChanged () {

    }
  },
  components: {
    AppHeader,
    AppMessageInput,
    AppEditableInput,
    AppAvatarInput,
    AppButton,
    AppForm
  }
}
</script>

<style lang="scss" scoped>
.conference {
  position: relative;

  &__header {
    position: fixed;

    top: 0;
    left: 0;

    &-button {
      display: flex;

      align-items: center;

      background-color: transparent;
      border: none;
      outline: none;

      margin: 0 auto;

      height: 100%;
    }

    &-name {
      font-size: 23px;
      line-height: 22px;
      color: whitesmoke;
      font-family: 'Roboto', sans-serif;

      margin-right: 10px;
    }

    &-icon {
      fill: white;

      height: 50%;
    }
  }

  &__messages {
    &-item-wrapper {
      display: flex;

    }

    &-avatar {
      height: 40px;
    }

    &-input {
      width: 100%;
      height: 100%;
    }

    &-wrapper {
      position: relative;
      display: flex;
      overflow-y: scroll;
      overflow-x: hidden;

      height: 100%;
      width: 100%;

      flex-direction: column-reverse;

      padding-bottom: 60px;
    }

    &-input-wrapper {
      position: fixed;

      bottom: 50px;
      left: 0;

      height: 60px;
      width: 100%;

      padding: 10px;

      background-color: rgb(228, 228, 228);
      border-top: rgba(32, 178, 171, 0.151) 1px solid;
    }
  }

  &__adding {
    &-form {
      position: absolute;
      overflow: hidden;

      top: 50%;
      left: 50%;

      width: 80%;
      height: 70%;

      border-radius: 5px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

      transform: translate(-50%, -50%);
    }

    &-wrapper {
      overflow-y: scroll;

      flex-shrink: 0;

      width: 100%;
      max-height: calc(100% - 45px);

      padding: 0 15px 15px 15px;

      &:first-child {
        margin-right: 30px;
      }
    }

    &-add-button {
      height: 60%;

      outline: none;
      border: none;
      background-color: transparent;

      margin-left: auto;
    }

    &-add-icon {
      height: 100%;

      fill: $main-color;
      border-radius: 50%;
    }

    &-slider {
      display: flex;

      height: 100%;

      transition: transform .25s;
    }

    &-search {
      display: flex;

      height: 35px;
      width: 100%;

      padding: 5px;
      margin-top: 10px;

      border-radius: 5px;
      outline: none;
    }

    &-search-item {
      display: flex;

      width: 100%;
      height: 50px;

      align-items: center;

      margin-top: 10px;
    }

    &-search-nickname {
      font-family: 'Roboto', sans-serif;
      font-size: 16px;
      color: $main-color;
      font-weight: bold;
    }

    &-search-avatar {
      height: 100%;

      margin-right: 20px;
    }

    &-tab-wrapper {
      display: flex;

      top: 0;
      left: 0;

      width: 75%;
      height: 45px;

      flex-shrink: 0;
    }

    &-tab {
      display: flex;
      position: relative;

      align-items: center;
      justify-content: center;
      flex-grow: 1;

      padding: 0 8px;

      border: none;
      outline: none;
      background-color: whitesmoke;
      border-right: 2px solid rgba(128, 128, 128, 0.3);

      font-family: 'Roboto', sans-serif;
      color: $main-color-light;
      font-weight: bold;
      font-size: 16px;

      transition: color .3s;

      &::after {
        content: '';
        position: absolute;
        display: block;

        bottom: 0;
        left: 0;

        width: calc(100% + 2px);
        height: 2px;

        background-color: $main-color-light;

        transition: background-color .3s;
      }

      &:first-child {
        border-top-left-radius: 5px;
      }

      &:last-child {
        border-right: none;
      }

      &.active {
        color: $main-color;

        &::after {
          background-color: $main-color;
        }
      }
    }
  }

  &__edit {
    &-form {
      position: absolute;
      overflow-y: scroll;

      top: 50%;
      left: 50%;

      width: 80%;
      max-height: 70%;

      padding: 10px 15px 15px 15px;

      border-radius: 5px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

      transform: translate(-50%, -50%);
    }

    &-name {
      width: 70%;

      color: $main-color;
    }

    &-image-input {
      height: 150px;

      margin: 50px auto 0 auto;
    }

    &-participants-wrapper {
      width: 100%;

      margin-top: 20px;

      border-radius: 5px;

      background-color: whitesmoke;
    }

    &-participant-button {
      width: 100%;

      outline: none;

      border-radius: 5px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    &-participant-item {
      display: flex;

      align-items: center;

      width: 100%;
      height: 45px;

      padding: 5px 10px;

      background-color: rgba(128, 128, 128, 0.15);

      &-img {
        height: 100%;
      }

      &-nickname {
        font-family: 'Roboto', sans-serif;
        font-size: 18px;
        color: $main-color;

        margin: 0 auto;
      }

      &-delete {
        height: 50%;

        background-color: transparent;
        border: none;
        outline: none;
        border-radius: 50%;
      }

      &-delete-icon {
        width: 100%;
        height: 100%;
      }

      &:last-child {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }
  }
}
</style>
