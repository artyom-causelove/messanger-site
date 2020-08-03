<template>
  <div class="app-form">
    <slot name="title"
      class="app-form__title"></slot>
    <slot name="data"></slot>
    <button v-if="hasClose"
      @click="$emit('formClosed')"
      class="app-form__close-button">
      <img class="app-form__close-icon" src="@/assets/images/close.svg">
    </button>
    <transition name="fade">
      <img v-show="isLoading"
        class="app-form__loading" src="@/assets/images/loading.svg">
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      default: false,
      type: Boolean
    },
    hasClose: {
      default: true,
      type: Boolean
    }
  },
  name: 'app-form'
}
</script>

<style lang="scss" scoped>
.app-form {
  display: flex;

  flex-direction: column;

  background-color: whitesmoke;

  &__close-button {
    position: absolute;

    top: 15px;
    right: 15px;

    height: 20px;
    width: 20px;

    background-color: transparent;
    border: none;
    outline: none;
  }

  &__close-icon {
    width: 100%;
    height: 100%;
  }

  &__loading {
    position: fixed;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: rgba($color: white, $alpha: 0.7);
  }
}
</style>
