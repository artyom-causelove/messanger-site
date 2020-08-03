<template>
  <div class="app-ediatable-input">
    <input
      ref="input"
      class="app-ediatable-input__input"
      :value="value"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :type="type"
      @input="onInput"
      @change="valueChanged"
    >
    <button
      @click="startEdit"
      class="app-ediatable-input__button"
    >
      <svg
        :style="{ fill: borderColor }"
        viewBox="0 0 19 19"
        class="app-ediatable-input__icon">
        <path d="m11.815 3.1554 3.865 3.865-9.7835 9.7835-3.8628-3.865
          9.7813-9.7835zm6.7978-0.93215-1.7236-1.7236c-0.6662-0.66613-1.7478-0.66613-2.4162
          0l-1.6511 1.6511 3.865 3.865 1.9259-1.9259c0.5167-0.51669 0.5167-1.3499
          0-1.8666zm-18.602 16.148c-0.070339 0.3166 0.21547 0.6002 0.53207
          0.5232l4.3069-1.0442-3.8628-3.865-0.97615 4.386z"
        />
      </svg>
    </button>
    <div
      :style="{ backgroundColor: initialBorderColor }"
      class="app-ediatable-input__border"></div>
    <div
      :style="{ backgroundColor: borderColor }"
      class="app-ediatable-input__border"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'app-ediatable-input',
  props: {
    maxlength: {
      default: Number.MAX_SAFE_INTEGER.toString(),
      type: String
    },
    value: {
      default: '',
      type: String
    },
    type: {
      default: 'text',
      type: String
    },
    placeholder: {
      default: '',
      type: String
    },
    initialBorderColor: {
      default: 'transparent',
      type: String
    },
    borderColor: {
      default: 'whitesmoke',
      type: String
    }
  },
  methods: {
    onInput (event) {
      this.$emit('input', event.srcElement.value)
    },
    startEdit () {
      this.$refs.input.focus()
    },
    valueChanged (event) {
      this.$emit('valueChanged', event.srcElement.value)
    }
  }
})
</script>

<style lang="scss" scoped>
.app-ediatable-input {
  position: relative;
  display: flex;

  align-items: center;

  &__input {
    display: block;

    width: 100%;
    height: 100%;

    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    line-height: 100%;
    color: inherit;
    text-align: inherit;

    outline: none;
    border: none;
    background-color: transparent;

    &:focus ~ .app-ediatable-input__border {
      opacity: 1;
    }
  }

  &__button {
    cursor: pointer;

    height: 100%;
    width: 30px;

    margin-left: 10px;

    border: none;
    background-color: transparent;
    -webkit-tap-highlight-color: transparent;
  }

  &__border {
    position: absolute;

    bottom: 0;
    left: 0;

    width: 100%;
    height: 2px;

    border-radius: 5px;

    &:last-child {
      opacity: 0;

      transition: opacity .3s;
    }
  }

  &__icon {
    height: 19px;
    width: 19px;
  }
}
</style>
