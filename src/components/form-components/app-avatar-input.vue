<template>
  <div
    :style="{ width: avatarWidth }"
    ref="div"
    class="app-avatar-input">
    <input
      @change="onImageChanged"
      type="file"
      class="app-avatar-input__input"
      ref="input">
    <img
      v-if="!src"
      class="app-avatar-input__image"
      src="@/assets/images/defaultAvatar.png">
    <img
      v-else
      class="app-avatar-input__image"
      :src="src"
      ref="image">
    <button
      v-if="isChangeble === 'true'"
      @click="onChangeImageClick"
      class="app-avatar-input__button">
      <div class="app-avatar-input__icon-wrapper">
        <svg class="app-avatar-input__icon" viewBox="0 0 19 19">
          <path d="m11.815 3.1554 3.865 3.865-9.7835 9.7835-3.8628-3.865
            9.7813-9.7835zm6.7978-0.93215-1.7236-1.7236c-0.6662-0.66613-1.7478-0.66613-2.4162
            0l-1.6511 1.6511 3.865 3.865 1.9259-1.9259c0.5167-0.51669 0.5167-1.3499
            0-1.8666zm-18.602 16.148c-0.070339 0.3166 0.21547 0.6002 0.53207
            0.5232l4.3069-1.0442-3.8628-3.865-0.97615 4.386z"
          />
        </svg>
      </div>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'app-avatar-input',
  props: {
    src: {
      required: true
    },
    isChangeble: {
      default: 'true',
      type: String
    }
  },
  data () {
    return {
      avatarWidth: ''
    }
  },
  mounted () {
    this.avatarWidth = this.$refs['div'].clientHeight + 'px'
  },
  methods: {
    onChangeImageClick () {
      this.$refs.input.click()
    },
    onImageChanged () {
      const file = this.$refs.input.files[0]
      this.$emit('imageChanged', file)
    }
  }
})
</script>

<style lang="scss" scoped>
.app-avatar-input {
  position: relative;

  &__input {
    display: none;
  }

  &__image {
    height: 100%;
    width: 100%;

    object-fit: cover;

    border-radius: 50%;
  }

  &__button {
    overflow: hidden;
    position: absolute;

    bottom: 5px;
    right: 5px;

    width: 25%;
    height: 25%;

    border-radius: 50%;
    background-color: whitesmoke;
    border: none;
  }

  &__icon-wrapper {
    display: flex;

    align-items: center;
    justify-content: center;

    width: 80%;
    height: 80%;

    margin: 0 auto;

    background-color: $main-color;
    border-radius: 50%;
  }

  &__icon {
    display: block;

    width: 50%;
    height: 50%;

    fill: whitesmoke;
  }
}
</style>
