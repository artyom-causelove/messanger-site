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
    @input="setInputValue(1)"
    class="app-input app-auth-form__input">
  <span ref="error"
    class="app-auth-form__error">{{ loginError }}</span>
  <span class="app-auth-form__label">Password:</span>
  <input v-model="password"
    @input="setInputValue(2)"
    class="app-input app-auth-form__input" type="password">
  <span class="app-auth-form__error">{{ passwordError }}</span>
  <transition name="fade" mode="in-out">
    <div v-if="formState === 'full'"
      class="app-auth-form__input-wrapper">
      <span class="app-auth-form__label">Nickname:</span>
      <input v-model="nickname"
        @input="setInputValue(3)"
        class="app-input app-auth-form__input">
      <span class="app-auth-form__error">{{ nicknameError }}</span>
    </div>
  </transition>
  <div ref="wrapper"
    class="app-auth-form__button-wrapper">
    <app-button @click="swapAction"
      :disabled="inAnimation"
      class="app-auth-form__button">
      <span class="app-auth-form__button-text">{{ isLogin ? 'Sign up' : 'Sign in' }}</span>
    </app-button>
    <app-button :disabled="isDisabledGo"
      @click="startAction"
      class="app-auth-form__button">
      <span class="app-auth-form__button-text">Go</span>
    </app-button>
  </div>
  <transition name="fade">
    <img v-show="isLoading"
      class="app-auth-form__loading" src="@/assets/images/loading.svg">
  </transition>
  <div v-if="$store.state.user.id"
    class="app-auth-form__already-login">
    <app-button
      @click="$router.push('account')"
      class="app-auth-form__already-login-button"
    >To account</app-button>
    <app-button
      @click="logout"
      class="app-auth-form__already-login-button"
    >Logout</app-button>
  </div>
</div>
</template>

<script>
import appButton from '@/components/form-components/app-button'
import { required, minLength } from 'vuelidate/lib/validators'
import gql from 'graphql-tag'

const ADD_NEW_USER = gql`
  mutation ($personalId: String!, $nickname: String!, $password: String!) {
    addUser(personalId: $personalId, nickname: $nickname, password: $password) {
      id
      personalId
      nickname
      password
      age
      status
      lastVisit
    }
  }
`

const SIGN_IN_USER = gql`
  mutation ($personalId: String!, $password: String!) {
    loginUser(personalId: $personalId, password: $password) {
      id
      personalId
      nickname
      password
      age
      status
      lastVisit
      apiKey
    }
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
      inAnimation: false,
      loginError: '',
      passwordError: '',
      nicknameError: '',
      isLoading: false
    }
  },
  validations: {
    login: {
      required,
      minLength: minLength(5)
    },
    password: {
      required,
      minLength: minLength(8)
    },
    nickname: {
      required,
      minLength: minLength(1)
    }
  },
  watch: {
    $v: {
      handler (val) {
        if (this.$v.login.$dirty) {
          if (!this.$v.login.required) {
            this.loginError = 'The field is required'
          } else if (!this.$v.login.minLength) {
            this.loginError = `Minimum length is 5 characters`
          } else {
            this.loginError = ''
          }
        }

        if (this.$v.password.$dirty) {
          if (!this.$v.password.required) {
            this.passwordError = 'The field is required'
          } else if (!this.$v.password.minLength) {
            this.passwordError = `Minimum length is 8 characters`
          } else {
            this.passwordError = ''
          }
        }

        if (this.$v.nickname.$dirty) {
          if (!this.$v.nickname.required) {
            this.nicknameError = 'The field is required'
          } else if (!this.$v.nickname.minLength) {
            this.nicknameError = `Minimum length is 1 characters`
          } else {
            this.nicknameError = ''
          }
        }
      },
      deep: true
    }
  },
  computed: {
    isDisabledGo () {
      if (this.isLogin) {
        if (!this.$v.login.$invalid && !this.$v.password.$invalid) {
          return false
        }
      } else {
        if (!this.$v.login.$invalid && !this.$v.password.$invalid && !this.$v.nickname.$invalid) {
          return false
        }
      }
      return true
    }
  },
  mounted () {
    const formHeight = this.$refs['form'].clientHeight + this.$refs['wrapper'].clientHeight

    this.formHeight = formHeight
    this.realHeight = formHeight
  },
  methods: {
    logout () {
      this.$store.commit('setDefaultUser')

      window.localStorage.removeItem('apiKey')
    },
    setInputValue (number) {
      switch (number) {
        case 1:
          this.$v.login.$touch()
          break
        case 2:
          this.$v.password.$touch()
          break
        case 3:
          this.$v.nickname.$touch()
          break
      }
    },
    startAction () {
      if (this.isLogin) {
        this.signInUser()
      } else {
        this.signUpNewUser()
      }
    },
    swapAction () {
      this.isLogin = !this.isLogin

      if (this.isLogin) {
        this.reduceFormHeight()
      } else {
        this.inreaseFormHeight()
      }
    },
    signUpNewUser () {
      this.isLoading = true
      this.$apollo.mutate({
        mutation: ADD_NEW_USER,
        variables: {
          personalId: this.login,
          nickname: this.nickname,
          password: this.password
        }
      })
        .then(({ data }) => {
          this.isLoading = false

          this.signInUser()
        })
    },
    signInUser () {
      this.isLoading = true
      this.$apollo.mutate({
        mutation: SIGN_IN_USER,
        variables: {
          personalId: this.login,
          password: this.password
        }
      })
        .then(({ data }) => {
          delete data.loginUser.__typename
          this.$store.commit('setUser', data.loginUser)

          window.localStorage.setItem('apiKey', JSON.stringify(data.loginUser.apiKey))

          this.$router.push('account')
        })
        .catch(reason => {
          this.$emit('signInError', reason.message.replace('GraphQL error: ', ''))
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    inreaseFormHeight () {
      const input = this.$refs['input']
      const span = this.$refs['span']
      const error = this.$refs['error']
      const form = this.$refs['form']

      const inputHeight = input.clientHeight + +input.style.borderWidth.replace('px', '')
      const spanHeight = span.clientHeight
      const errorHeight = error.clientHeight

      this.realHeight = form.clientHeight + inputHeight + spanHeight + errorHeight

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

  padding: 46px 20px 25px 20px;

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
    display: block;

    padding: 4px 0 5px 0;

    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    color: $main-color;
  }

  &__input {
    display: block;

    height: 25px;
    width: 100%;
  }

  &__button {
    display: inline-block;

    width: 100px;

    margin-top: 8px;

    &:last-child {
      float: right;
    }
  }

  &__button-wrapper {
    position: absolute;

    bottom: 15px;
    left: 20px;
    right: 20px;
  }

  &__error {
    display: block;

    font-family: 'Roboto', sans-serif;
    font-size: 13px;
    line-height: 13px;
    color: #9b0000;

    min-height: calc(1em + 14px);

    padding: 7px 0;
  }

  &__loading {
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: rgba($color: white, $alpha: 0.7);
    border-radius: 5px;
  }

  &__already-login {
    position: absolute;
    display: flex;

    flex-direction: column;
    justify-content: center;
    align-items: center;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    padding: 0 15px;

    background-color: rgba($color: white, $alpha: 0.8);
    border-radius: 5px;
  }

  &__already-login-button {
    min-width: 70%;

    margin-top: 30px;

    &:first-child {
      margin-top: 0;
    }
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
