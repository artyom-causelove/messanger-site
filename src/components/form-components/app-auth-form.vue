<template>
<div ref="form"
  class="app-auth-form" :style="{ height: realHeight + 'px'}">
  <div class="app-auth-form__title-wrapper">
    <transition name="fade" mode="out-in">
      <div v-if="isLogin"
        key="login"
        class="app-auth-form__title">
        <span class="app-auth-form__action">Sign in</span>
        <img class="app-auth-form__action-image" src="@/assets/images/login.svg">
      </div>

      <div v-else
        key="register"
        class="app-auth-form__title">
        <span class="app-auth-form__action">Sign up</span>
        <img class="app-auth-form__action-image" src="@/assets/images/register.svg">
      </div>
    </transition>
  </div>
  <div class="app-auth-form__title-decor"></div>
  <span ref="span"
    class="app-auth-form__label">Login:</span>
  <input ref="input"
    v-model="login"
    class="app-input app-auth-form__input">
  <span class="app-auth-form__label">Password:</span>
  <input v-model="password"
    class="app-input app-auth-form__input" type="password">
  <transition name="fade" mode="in-out">
    <div v-if="formState === 'full'"
      class="app-auth-form__input-wrapper">
      <span class="app-auth-form__label">Nickname:</span>
      <input v-model="nickname"
        class="app-input app-auth-form__input">
    </div>
  </transition>
  <div ref="wrapper"
    class="app-auth-form__button-wrapper">
    <app-button @click="swapAction"
      :disabled="inAnimation"
      class="app-auth-form__button">
      <span class="app-auth-form__button-text">{{ isLogin ? 'Sign up' : 'Sign in' }}</span>
    </app-button>
    <app-button class="app-auth-form__button">
      <span class="app-auth-form__button-text">Go</span>
    </app-button>
  </div>
</div>
</template>

<script>
import appButton from '@/components/form-components/app-button'
import gql from 'graphql-tag'

const ADD_NEW_USER = gql`
  mutation ($personalId: String!, $nickname: String!, $password: String!) {
    addUser(personalId: $personalId, nickname: $nickname, password: $password)
  }
`

export default {
  name: 'app-auth-form',
  data () {
    return {
      login: '',
      nickname: '',
      password: '',
      isLogin: true,
      formState: 'small',
      realHeight: 'auto',
      formHeight: null,
      inAnimation: false
    }
  },
  mounted () {
    const formHeight = this.$refs['form'].clientHeight + this.$refs['wrapper'].clientHeight

    this.formHeight = formHeight
    this.realHeight = formHeight
  },
  methods: {
    swapAction () {
      this.isLogin = !this.isLogin

      if (this.isLogin) {
        this.reduceFormHeight()
      } else {
        this.inreaseFormHeight()
      }
    },
    signUpNewUser () {
      this.$apollo.mutate({
        mutation: ADD_NEW_USER,
        variables: {
          personalId: this.login,
          nickname: this.nickname,
          password: this.password
        }
      })
        .then(data => console.log(data))
    },
    inreaseFormHeight () {
      const input = this.$refs['input']
      const span = this.$refs['span']
      const form = this.$refs['form']

      const inputHeight = +input.style.marginTop.replace('px', '') + input.clientHeight + 1
      const spanHeight = +span.style.marginTop.replace('px', '') + span.clientHeight + 1

      this.realHeight = form.clientHeight + inputHeight + spanHeight + 10

      this.inAnimation = true

      setTimeout(() => {
        this.formState = 'full'
        this.inAnimation = false
      }, 500)
    },
    reduceFormHeight () {
      this.formState = 'small'
      this.inAnimation = true

      setTimeout(() => {
        this.realHeight = this.formHeight
        setTimeout(() => {
          this.inAnimation = false
        }, 500)
      }, 500)
    }
  },
  components: {
    appButton
  }
}
</script>

<style lang="scss" scoped>
.app-auth-form {
  position: relative;
  display: flex;

  flex-direction: column;

  padding: 46px 20px 40px 20px;

  background-color: whitesmoke;
  box-shadow: 0 4px 12px 1px rgba($color: black, $alpha: 0.2);
  border-radius: 5px;

  transition: 0.5s;

  &__title-wrapper {
    position: absolute;

    top: 10px;
    left: 20px;

    width: calc(100% - 40px);
  }

  &__title-decor {
    position: absolute;

    top: 46px;
    left: 20px;

    width: calc(100% - 40px);
    height: 1px;

    background-color: rgba($color: $main-color-light, $alpha: 0.5);
  }

  &__input-wrapper {
    width: 100%;

    margin-top: 15px;
  }

  &__title {
    display: flex;

    justify-content: center;
    align-items: center;
  }

  &__action {
    margin-right: 10px;

    font-family: 'Roboto', sans-serif;
    font-size: 22px;
    font-weight: bold;
    color: $main-color;
  }

  &__label {
    margin-top: 15px;

    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    color: $main-color;
  }

  &__input {
    height: 25px;
    width: 100%;

    margin-top: 5px;
  }

  &__button {
    display: inline-block;

    width: 100px;

    margin-top: 15px;

    &:last-child {
      float: right;
    }
  }

  &__button-text {
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    text-transform: uppercase;
    color: whitesmoke;
    font-weight: bold;
    letter-spacing: 1px;
  }

  &__button-wrapper {
    position: absolute;

    bottom: 15px;
    left: 20px;
    right: 20px;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: .5s opacity;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.fade-enter-to, .fade-leave {
  opacity: 1;
}
</style>
