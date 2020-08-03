<template>
  <div class="notify">
    <span class="notify__type">{{ getNotifyType(notify.type) }}</span>
    <template v-if="notify.type === 'inviteToConf'">
      <div class="notify__wrapper">
        <app-avatar-input
          :src="notify.avatar"
          isChangeble="false"
          class="notify__avatar"
        />
        <div class="notify__bottom-wrapper">
          <span class="notify__title">{{ notify.name }}</span>
          <span class="notify__participants">{{ toParticipantParagraph(notify.participants) }}</span>
          <div class="notify__button-wrapper">
            <button
              class="notify__button">
              <svg class="notify__button-icon" viewBox="0 0 342 342">
                <circle cx="171" cy="171" r="171" fill="#2E7D32"/>
                <path d="M144 271C136.667 271 129.333 268.067 123.467 262.2L64.8 203.533C53.0667
                  191.8 53.0667 174.2 64.8 162.467C76.5333 150.733 95.6 150.733 105.867 162.467L144
                  200.6L240.8 103.8C252.533 92.0667 270.133 92.0667 281.867 103.8C293.6 115.533 293.6
                  133.133 281.867 144.867L164.533 262.2C158.667 268.067 151.333 271 144 271Z" fill="#EEEEEE"/>
              </svg>
            </button>
            <button
              class="notify__button">
              <svg class="notify__button-icon" viewBox="0 0 342 342">
                <circle cx="171" cy="171" r="171" fill="#8E0000"/>
                <path d="M87.994 234.562L106.268 253.098C112.995 259.923 123.978 259.999
                  130.8 253.276L170.697 213.939L210.016 253.831C216.747 260.655 227.731 260.732
                  234.551 254.005L253.078 235.743C259.902 229.016 259.983 218.032 253.252
                  211.203L213.931 171.313L253.832 131.981C260.652 125.254 260.736 114.27
                  254.001 107.441L235.736 88.9045C229.006 82.085 218.023 82.0038 211.203
                  88.7267L171.299 128.063L131.979 88.168C125.248 81.3478 114.264 81.2674
                  107.443 87.9902L88.9174 106.256C82.0932 112.987 82.0107 123.966 88.7396
                  130.795L128.063 170.69L88.1718 210.031C81.3476 216.754 81.2651
                  227.742 87.994 234.562Z" fill="#EEEEEE"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import AppAvatarInput from '@/components/form-components/app-avatar-input'

export default {
  props: {
    notify: {
      required: true,
      type: Object
    }
  },
  name: 'notify',
  methods: {
    toParticipantParagraph (participants) {
      return participants.toString()
    },
    getNotifyType (type) {
      switch (type) {
        case 'inviteToConf': return 'Invite into conference'
        default: return 'Notify'
      }
    }
  },
  components: {
    AppAvatarInput
  }
}
</script>

<style lang="scss" scoped>
.notify {
  overflow: hidden;

  padding: 10px;

  &__type {
    display: block;

    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    font-weight: bold;
    color: $main-color;

    margin-bottom: 5px;
  }

  &__wrapper {
    display: flex;

    height: calc(100% - 26px);
  }

  &__avatar {
    height: 100%;

    margin-right: 8px;
  }

  &__bottom-wrapper {
    flex-grow: 1;
    flex-shrink: 1;
  }

  &__title {
    display: block;

    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: bold;
    color: $main-color-light;

    margin-bottom: 3px;
  }

  &__participants {
    display: block;

    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    color: $main-color-light;
  }

  &__button-wrapper {
    display: flex;

    flex-direction: row-reverse;
  }

  &__button {
    height: 32px;
    width: 32px;

    margin-top: 2px;

    border: none;
    outline: none;
    background-color: transparent;
    border-radius: 50%;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);

    &:last-child {
      margin-right: 10px;
    }
  }

  &__button-icon {
    height: 100%;
    width: 100%;
  }
}
</style>
