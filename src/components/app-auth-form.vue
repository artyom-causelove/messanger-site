<template>
<div class="app-auth-form">
  <span class="app-auth-form__action">Sign in</span>
  <span class="app-auth-form__label">Login:</span>
  <app-input class="app-auth-form__input"/>
  <span class="app-auth-form__label">Password:</span>
  <app-input class="app-auth-form__input"/>
</div>
</template>

<script>
import appInput from '@/components/app-input'

export default {
  name: 'app-auth-form',
  components: {
    appInput
  }
}
</script>

<style lang="scss" scoped>
.app-auth-form {
  display: flex;

  flex-direction: column;

  &__action {
    position: relative;

    font-family: 'Roboto', sans-serif;
    font-size: 22px;
    font-weight: bold;
    color: $main-color;
    text-align: center;

    &::after {
      content: '';
      position: absolute;

      bottom: -5px;
      left: 0;

      width: 100%;
      height: 1px;

      background-color: rgba($color: $main-color-light, $alpha: 0.5);
    }
  }

  &__label {
    margin-bottom: 5px;
    margin-top: 15px;

    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    color: $main-color;

    &:first-child {
      margin-top: 0;
    }
  }

  &__input {
    height: 25px;
  }
}
</style>
