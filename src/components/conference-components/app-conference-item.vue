<template>
  <div class="app-conference-item">
    <app-avatar-input
      :src="conference.avatar"
      isChangeble="false"
      class="app-conference-item__avatar-input"/>
    <div
      class="app-conference-item__info-wrapper">
      <span
        class="app-conference-item__message-name">
        {{ conference.name }}
      </span>
      <span
        v-if="message"
        class="app-conference-item__message-text">
        {{ message.text }}
      </span>
      <span
        v-else
        class="app-conference-item__default-message">
        There are no posts yet
      </span>
      <span
        v-if="message"
        class="app-conference-item__message-date">
        {{ message.date }}
      </span>
    </div>
  </div>
</template>

<script>
import AppAvatarInput from '@/components/form-components/app-avatar-input'

export default {
  name: 'app-conference-item',
  props: {
    conference: {
      type: Object,
      required: true
    },
    message: {
      default: null
    }
  },
  components: {
    AppAvatarInput
  }
}
</script>

<style lang="scss" scoped>
.app-conference-item {
  display: flex;

  padding: 10px;

  &__avatar-input {
    height: 100%;
  }

  &__info-wrapper {
    position: relative;
    display: flex;

    flex-grow: 1;

    flex-direction: column;
  }

  &__message-name {
    font-family: 'Roboto', sans-serif;
    font-size: 18px;

    margin-left: 8px;
  }

  &__default-message {
    position: absolute;

    top: 50%;
    right: 0;

    width: 100%;

    text-align: center;
    font-family: 'Roboto', sans-serif;
    font-size: 17px;
    color: #5f5f5f;

    transform: translateY(-50%);
  }
}
</style>
