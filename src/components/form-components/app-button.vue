<template>
<button class="app-button" @click="$emit('click')" :disabled="disabled">
  <span class="app-button__text"><slot></slot></span>
</button>
</template>

<script>
export default {
  name: 'app-button',
  props: {
    disabled: {
      default: false,
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
.app-button {
  cursor: pointer;

  padding: 5px 10px;

  text-align: center;
  border-radius: 3px;
  border: none;

  background-color: $main-color;
  box-shadow: 0 1px 2px 1px rgba($color: black, $alpha: 0.1);

  &:disabled {
    background-color: rgb(100, 100, 100);
  }

  &__text {
    font-family: 'Roboto', sans-serif;
    font-size: 17px;
    text-transform: uppercase;
    color: whitesmoke;
    font-weight: bold;
    letter-spacing: 1px;
  }
}
</style>
