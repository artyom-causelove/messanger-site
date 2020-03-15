<template>
  <div class="app-phone-modal-window">
    <div class="app-phone-modal-window__content">
      <slot @close="$emit('closeModalWindow')"></slot>
    </div>
    <button
      @click="$emit('closeWindow')"
      v-if="closeButton"
      class="app-phone-modal-window__close-button">
      <img class="app-phone-modal-window__close-button-icon" src="@/assets/images/close.svg">
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    closeButton: {
      default: false,
      type: Boolean
    }
  }
})
</script>

<style lang="scss" scoped>
  .app-phone-modal-window {
    display: flex;

    min-height: 100px;

    padding: 25px 10px 10px 10px;

    justify-content: center;
    align-items: center;

    background-color: whitesmoke;
    box-shadow: 0 4px 12px 1px rgba($color: black, $alpha: 0.2);
    border-radius: 6px;

    &__close-button {
      position: absolute;

      right: 15px;
      top: 15px;

      width: 20px;
      height: 20px;

      background-color: transparent;
      border: none;
    }

    &__close-button-icon {
      width: 20px;
      height: 20px;
    }
  }
</style>
