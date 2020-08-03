<template>
  <div class="message-input">
    <textarea v-model="text"
      class="message-input__input"></textarea>
    <button ref="button"
      @click="onSendMessage"
      :style="{ width: buttonHeight + 'px' }"
      class="message-input__button">
      <svg class="message-input__icon" viewBox="0 0 48 48">
        <path d="M4 42l42-18-42-18 0 14 30 4-30 4z" fill="whitesmoke"/>
        <path d="M0 0h48v48h-48z" fill="none"/>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'app-massage-input',
  data () {
    return {
      buttonHeight: '',
      text: ''
    }
  },
  mounted () {
    this.buttonHeight = this.$refs['button'].offsetHeight
  },
  methods: {
    onSendMessage () {
      if (this.text.trim() !== '') {
        this.$emit('sendMessage', this.text)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.message-input {
  display: flex;

  &__input {
    flex-grow: 1;

    margin-right: 10px;

    padding: 5px;

    resize: none;
    border-radius: 8px;
    border: $main-color-light solid 1px;
    outline: none;
    background-color: whitesmoke;
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.05);

    transition: border-color .1s;

    &:focus {
      border-color: $main-color;
    }
  }

  &__button {
    display: flex;

    justify-content: center;
    align-items: center;

    height: 100%;

    padding: 7px;

    background-color: $main-color-light;
    border: 1px solid rgba($color: $main-color, $alpha: 0.3);
    outline: none;
    border-radius: 50%;
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);

    transition: background-color .1s;

    &:active {
      background-color: $main-color;
    }
  }

  &__icon {
    width: 100%;
    height: 100%;
  }
}
</style>
