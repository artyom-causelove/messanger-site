<template>
  <div id="app" class="app">
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
import appPhoneModalWindow from '@/components/modal-windows/app-phone-modal-window'
import AppFooter from '@/components/app-footer'
import userService from '@/services/user.service'
import conferenceService from '@/services/conference.service'

export default {
  name: 'app',
  data () {
    return {
      error: '',
      user: this.$store.state.user.getValue()
    }
  },
  async created () {
    this.$store.state.user.subscribe(async user => {
      this.user = user

      if (this.user === null && this.$route.name !== 'home') {
        this.$router.push({ name: 'home' })
        this.error = 'You are not sign in'
      } else if (this.user) {
        const conferences = await conferenceService.getConferences(this.user.conferences)
        const socket = conferenceService.startSocket({ apiKey: userService.getApiKey() })
        this.$store.commit('setSocket', socket)
        this.$store.commit('setConferences', conferences)

        socket.on('messageFromConf', async message => {
          if (this.$store.state.messages.length !== 0) {
            this.$store.commit('addMessages', { confId: message.confId, messages: message })
          }
        })
      }
    })

    this.$store.state.conferences.subscribe(conferences => {
      conferences.forEach(async conf => {
        const messageBlock = await conferenceService.getMessageBlock(conf['_id'], 0)
        this.$store.commit('addMessagesObj', conf['_id'])

        if (messageBlock.systemMessage !== 'empty') {
          const messages = await conferenceService.getMessages(messageBlock['_id'])
          this.$store.commit('addMessages', { confId: conf['_id'], messages })
        }
      })
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
    }
  },
  components: {
    AppFooter,
    appPhoneModalWindow
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
