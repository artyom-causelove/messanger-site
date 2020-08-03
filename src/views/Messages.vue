<template>
  <div class="messages page">
    <app-header
      class="messages__header app__header">
      <span class="messages__header-text">
        {{ $route.name[0].toUpperCase() + $route.name.slice(1) }}
      </span>
    </app-header>
    <app-conference-item
      @click="navigateToConf(conference)"
      v-for="conference of conferences"
      :key="conference._id"
      :conference="conference"
      :message="$store.getters.getMessages(conference._id) ? $store.getters.getMessages(conference._id)[0] : null"
      class="messages__conference-item"/>
    <button
      @click="turnCreateConference"
      class="messages__create-conference-button">
      <svg viewBox="0 0 30 30" class="messages__create-conference-icon">
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
    <transition name="fade">
      <div
        v-if="isCreating"
        class="messages__create-conference-shadow cloak">
        <app-form
          :hasClose="true"
          :isLoading="isLoading"
          @formClosed="turnCreateConference"
          class="messages__create-conference-wrapper">
          <template v-slot:data>
            <app-avatar-input
              :src="newConfImage"
              @imageChanged="onNewConfImageChanged"
              class="messages__create-conference-image-input"/>
            <span
              class="messages__create-conference-error">
              {{ newConfTitleError }}
            </span>
            <app-editable-input
              v-model="newConfTitle"
              @input="setInputValue('newConfTitle')"
              placeholder="Title..."
              borderColor="#3f51b5"
              initialBorderColor="#c5cae9"
              class="messages__create-conference-input"/>
            <app-button
              @click="createNewConf"
              :disabled="isDisabledCreate"
              class="messages__create-conference-create">
              Create
            </app-button>
          </template>

          <template v-slot:title>
            <span class="messages__create-conference-title">
              Creating conference
            </span>
          </template>
        </app-form>
      </div>
    </transition>
  </div>
</template>

<script>
import AppConferenceItem from '@/components/conference-components/app-conference-item'
import AppAvatarInput from '@/components/form-components/app-avatar-input'
import AppEditableInput from '@/components/form-components/app-editable-input'
import AppButton from '@/components/form-components/app-button'
import AppHeader from '@/components/app-header'
import AppForm from '@/components/form-components/app-form'
import conferenceService from '@/services/conference.service'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'Messages',
  data () {
    return {
      conferences: this.$store.state.conferences.getValue(),
      isCreating: false,
      isLoading: false,
      newConfImage: null,
      newConfTitle: '',
      newConfTitleError: ''
    }
  },
  created () {
    this.$store.state.conferences.subscribe(conferences => { this.conferences = conferences })
  },
  validations: {
    newConfTitle: {
      required,
      minLength: minLength(1)
    }
  },
  watch: {
    $v: {
      handler (val) {
        if (this.$v.newConfTitle.$dirty) {
          if (!this.$v.newConfTitle.required) {
            this.newConfTitleError = 'The field is required'
          } else if (!this.$v.newConfTitle.minLength) {
            this.newConfTitleError = 'The field is required'
          } else {
            this.newConfTitleError = ''
          }
        }
      },
      deep: true
    }
  },
  computed: {
    isDisabledCreate () {
      if (!this.$v.newConfTitle.$invalid) {
        return false
      }

      return true
    }
  },
  methods: {
    turnCreateConference () {
      this.isCreating = !this.isCreating
    },
    setInputValue (inputName) {
      switch (inputName) {
        case 'newConfTitle': this.$v.newConfTitle.$touch(); break
      }
    },
    async onNewConfImageChanged (image) {
      try {
        const imageString = await conferenceService.stringifyImage(image)

        this.newConfImage = imageString
      } catch (exception) {
        console.log(exception.message)
      }
    },
    async createNewConf () {
      this.isLoading = true
      try {
        const newConf = await conferenceService.create(this.newConfTitle, this.newConfImage)

        this.$store.commit('addConferences', newConf)
        this.turnCreateConference()
      } catch (exception) {
        console.log(exception.message)
      } finally {
        this.isLoading = false
      }
    },
    navigateToConf (conference) {
      this.$router.push({
        name: 'conference',
        params: {
          name: conference.name,
          conference
        }
      })
    }
  },
  components: {
    AppConferenceItem,
    AppEditableInput,
    AppAvatarInput,
    AppButton,
    AppHeader,
    AppForm
  }
}
</script>

<style lang="scss" scoped>
.messages {
  overflow-y: scroll;
  position: relative;
  display: flex;

  flex-direction: column;

  &__header-text {
    margin: 0 auto;

    font-size: 23px;
    line-height: 22px;
    color: whitesmoke;
    font-family: 'Roboto', sans-serif;
  }

  &__conference-item {
    cursor: pointer;

    height: 120px;

    background-color: inherit;

    transition: background-color .2s;

    &:hover {
      background-color: $hover-color-light;
    }
  }

  &__create-conference-icon {
    fill: $main-color;

    transition: fill .2s;
  }

  &__create-conference-button {
    position: fixed;

    bottom: 60px;
    left: 50%;

    height: 40px;
    width: 40px;

    border: none;
    background-color: transparent;
    outline: none;
    -webkit-tap-highlight-color: transparent;

    transform: translateX(-50%);

    &:hover .messages__create-conference-icon {
      fill: $main-color-light;
    }
  }

  &__create-conference-wrapper {
    position: absolute;

    top: 50%;
    left: 50%;

    padding: 15px;

    width: 80%;

    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, $alpha: 0.3);

    transform: translate(-50%, -50%);
  }

  &__create-conference-input {

    &:first-child {
      margin-top: 45px;
    }
  }

  &__create-conference-image-input {
    height: 150px;

    margin: 45px auto 0 auto;
  }

  &__create-conference-title {
    font-family: 'Roboto', sans-serif;
    color: $main-color;
    font-weight: bold;
    font-size: 18px;
    line-height: 20px;
  }

  &__create-conference-create {
    align-self: flex-end;

    width: 50%;

    margin-top: 40px;
  }

  &__create-conference-error {
    display: block;

    font-family: 'Roboto', sans-serif;
    color: $error-color;
    font-size: 13px;
    line-height: 13px;
    text-align: left;

    margin-bottom: 5px;
    margin-top: 25px;

    min-height: 13px;
    width: 100%;

    color: $error-color;
  }
}
</style>
