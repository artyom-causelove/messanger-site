<template>
  <div id="app" class="app">
    <app-header
      v-if="$route.name === 'account'"
      @showError="onShowError"
      class="app__account-header app__header">
      <app-editable-input
        v-model="nickname"
        @input="setInputValue"
        @valueChanged="onNicknameChanged"
        class="app__account-header-input"/>
    </app-header>
    <div v-else-if="$route.name === 'home'"></div>
    <app-header
      v-else
      class="app__other-header app__header">
      <span class="app__other-header-text">
        {{ $route.name[0].toUpperCase() + $route.name.slice(1) }}
      </span>
    </app-header>
    <router-view
      class="app__content"
      @showError="onShowError"/>
    <app-footer class="app__footer" v-if="$route.name !== 'home'"/>
    <transition name="fade" duration="300">
      <app-phone-modal-window
        v-if="error != ''"
        :closeButton="true"
        @closeWindow="error = ''"
        class="app__modal-window"
        >{{ error }}</app-phone-modal-window>
    </transition>
  </div>
</template>

<script>
import AppHeader from '@/components/app-header'
import appPhoneModalWindow from '@/components/modal-windows/app-phone-modal-window'
import AppEditableInput from '@/components/form-components/app-editable-input'
import AppFooter from '@/components/app-footer'
import userService from '@/services/user.service'
import conferenceService from '@/services/conference.service'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'app',
  data () {
    return {
      error: '',
      user: this.$store.state.user.getValue(),
      nickname: 'Loading...',
      nicknameError: ''
    }
  },
  validations: {
    nickname: {
      required
    }
  },
  watch: {
    $v: {
      handler (val) {
        if (this.$v.nickname.$dirty) {
          if (!this.$v.nickname.required) {
            this.nicknameError = 'Min count of chars is 1'
          } else {
            this.nicknameError = ''
          }
        }
      },
      deep: true
    }
  },
  async created () {
    this.$store.state.user.subscribe(async user => {
      this.user = user

      if (this.user === null && this.$route.name !== 'home') {
        this.$router.push({ name: 'home' })
        this.error = 'You are not sign in'
      } else if (this.user) {
        this.nickname = this.user.nickname

        const conferences = await conferenceService.getConferences(this.user.conferences)
        this.$store.commit('setConferences', conferences)
      }
    })

    try {
      const user = await userService.loginByApiKey()

      this.$store.commit('setUser', user)
    } catch (exception) {
      console.log(exception.message)
      this.$store.commit('setDefaultUser')
    }
  },
  methods: {
    onShowError (error) {
      this.error = error
    },
    setInputValue () {
      this.$v.nickname.$touch()
    },
    async onNicknameChanged (nickname) {
      if (!this.$v.nickname.required) {
        this.nickname = this.user.nickname
        this.$emit('showError', this.nicknameError)

        return
      }

      try {
        if (nickname !== this.user.nickname) {
          const editedUser = await userService.edit(this.user._id, { nickname })
          this.$store.commit('setUser', editedUser)
        }
      } catch (exception) {
        this.$emit('showError', exception.message)

        this.nickname = this.user.nickname
      }
    }
  },
  components: {
    AppHeader,
    AppFooter,
    appPhoneModalWindow,
    AppEditableInput
  }
}
</script>

<style lang="scss">
.app {
  display: flex;
  overflow: hidden;

  flex-direction: column;

  width: 100vw;
  height: 100vh;

  &__header {
    flex-shrink: 0;
  }

  &__content {
    position: relative;

    flex-shrink: 1;
    flex-grow: 1;
  }

  &__footer {
    flex-shrink: 0;
  }

  &__modal-window {
    z-index: 1000;

    position: fixed;

    top: 10px;
    left: 50%;

    width: 92%;

    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    color: rgba($color: black, $alpha: 0.7);

    transform: translateX(-50%);
  }

  &__account-header-input {
    width: 55%;
    height: 40px;

    margin: 0 auto;

    color: whitesmoke;
    text-align: center;

    transform: translateX(15px);
  }

  &__other-header-text {
    margin: 0 auto;

    font-size: 23px;
    line-height: 22px;
    color: whitesmoke;
    font-family: 'Roboto', sans-serif;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: .5s opacity;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.fade-enter-to, .fade-leave {
  opacity: 1;
}
</style>
