<template>
  <div class="notifications">
    <app-notify-item v-for="notify of notifications" :key="notify['_id']"
      :notify="notify"
      class="notifications__item"
    />

    <button
      class="notifications__clear"
    >
      <svg class="notifications__clear-icon" viewBox="0 0 305 305">
        <circle cx="152.5" cy="152.5" r="152.5" fill="#3F51B5"/>
        <path d="M133.7 63C131.096 63 129 65.0963 129 67.7V81.8H91.4C86.1924 81.8 82
          85.9923 82 91.2C82 96.4075 86.1924 100.6 91.4 100.6H213.6C218.808 100.6 223
          96.4075 223 91.2C223 85.9923 218.808 81.8 213.6 81.8H176V67.7C176 65.0963
          173.904 63 171.3 63H133.7ZM138.4 72.3999H166.6V81.8H138.4V72.3999ZM91.4
          110C86.1924 110 81.2906 114.264 82.1469 119.4L100.8 232.2C101.65 237.337
          104.992 241.6 110.2 241.6H194.8C200.008 241.6 203.344 237.336 204.2
          232.2L222.853 119.4C223.703 114.263 218.808 110 213.6 110H91.4Z" fill="#EEEEEE"
        />
      </svg>
    </button>

    <app-header class="notifications__header app__header">
      <span class="notifications__header-text">
        {{ $route.name[0].toUpperCase() + $route.name.slice(1) }}
      </span>
    </app-header>
  </div>
</template>

<script>
import AppHeader from '@/components/app-header'
import AppNotifyItem from '@/components/notifications-components/app-notify-item'

export default {
  name: 'notifications',
  data () {
    return {
      notifications: [
        {
          type: 'inviteToConf',
          participants: ['Peter', ' Ivan', ' Egor'],
          avatar: null,
          name: 'AWddwada'
        }
      ]
    }
  },
  created () {
    // this.$store.getters.getNotifications.subscribe(notifications => {
    //   this.notifications = notifications
    // })
  },
  methods: {
  },
  components: {
    AppHeader,
    AppNotifyItem
  }
}
</script>

<style lang="scss" scoped>
.notifications {
  overflow-y: scroll;
  position: relative;
  display: flex;

  flex-direction: column;

  padding-top: 50px;

  &__header {
    position: fixed;

    top: 0;
    left: 0;

    &-text {
      margin: 0 auto;

      font-size: 23px;
      line-height: 22px;
      color: whitesmoke;
      font-family: 'Roboto', sans-serif;
    }
  }

  &__item {
    height: 125px;

    flex-shrink: 0;

    border-bottom: 1px solid rgba($main-color-light, 0.1);
  }

  &__clear {
    position: fixed;

    bottom: 60px;
    left: 50%;

    width: 40px;
    height: 40px;

    border: none;
    outline: none;
    background-color: transparent;
    border-radius: 50%;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);

    transform: translateX(-50%);

    &__icon {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
