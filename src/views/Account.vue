<template>
  <div class="account">
    <app-avatar-input
      @imageChanged="onImageChanged"
      :src="user ? user.avatar : null"
      class="account__avatar-input"/>
    <span class="account__info-error">{{ statusError }}</span>
    <div class="account__input-wrapper">
      <span class="account__info-label">Status:</span>
      <app-editable-input
        v-model="status"
        @valueChanged="onInfoChanged('status', $event)"
        @input="setInputValue('status')"
        borderColor="#3f51b5"
        initialBorderColor="#c5cae9"
        maxlength="30"
        class="account__info-input"/>
    </div>
    <span class="account__info-error">{{ ageError }}</span>
    <div class="account__input-wrapper">
      <span class="account__info-label">Age:</span>
      <app-editable-input
        v-model="age"
        @valueChanged="onInfoChanged('age', $event)"
        @input="setInputValue('age')"
        borderColor="#3f51b5"
        initialBorderColor="#c5cae9"
        maxlength="3"
        class="account__info-input"/>
    </div>
    <app-button
      @click="turnIsChangingPassword"
      class="account__reset-button">
      Change password
    </app-button>
    <transition name="fade">
      <div
        v-if="isChangingPassword"
        class="account__change-password-shadow">
        <div class="account__change-password-wrapper">
          <span
            class="account__change-password-error">
            {{ oldPasswordError }}
          </span>
          <app-editable-input
            @valueChanged="changeOldPassword"
            @input="setInputValue('oldPassword')"
            placeholder="Password..."
            type="password"
            borderColor="#3f51b5"
            initialBorderColor="#c5cae9"
            class="account__change-password-input"/>
          <span
            class="account__change-password-error">
            {{ newPasswordError }}
          </span>
          <app-editable-input
            v-model="newPassword"
            @input="setInputValue('newPassword')"
            placeholder="New password..."
            type="password"
            borderColor="#3f51b5"
            initialBorderColor="#c5cae9"
            class="account__change-password-input"/>
          <app-button
            :disabled="isDisabledChange"
            @click="changePassword"
            class="account__change-password-change">
            Change
          </app-button>
          <button
            @click="turnIsChangingPassword"
            class="account__change-password-close">
            <img class="account__change-password-icon" src="@/assets/images/close.svg">
          </button>
          <span class="account__change-password-title">
            Changing password
          </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import userService from '@/services/user.service'
import appAvatarInput from '@/components/form-components/app-avatar-input'
import appEditableInput from '@/components/form-components/app-editable-input'
import appButton from '@/components/form-components/app-button'
import { numeric, maxLength, minLength, or, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'Account',
  data () {
    return {
      age: 'Loading...',
      status: 'Loading...',
      user: this.$store.state.user.getValue(),
      ageError: '',
      statusError: '',
      oldPasswordError: '',
      newPasswordError: '',
      isChangingPassword: false,
      oldPassword: '',
      newPassword: ''
    }
  },
  created () {
    this.$store.state.user.subscribe(user => {
      this.user = user

      if (this.user) {
        this.age = this.user.age ? this.user.age.toString() : ''
        this.status = this.user.status
      }
    })
  },
  validations: {
    age: {
      numberOrNull: or(sameAs(''), numeric),
      maxLength: maxLength(3)
    },
    status: {
      maxLength: maxLength(30)
    },
    oldPassword: {
      async isEqual (oldPassword) {
        if (!this.user) {
          return true
        }

        try {
          return await userService.checkPassword(this.user._id, oldPassword)
        } catch (exception) {
          console.log(exception.meesage)
        }
      }
    },
    newPassword: {
      minLength: minLength(8),
      async isAlreadyUse (newPassword) {
        if (this.oldPassword !== newPassword) {
          return true
        }

        return false
      }
    }
  },
  watch: {
    $v: {
      handler (val) {
        if (this.$v.age.$dirty) {
          if (!this.$v.age.numberOrNull) {
            this.ageError = 'The field is must be a number'
          } else if (!this.$v.age.maxLength) {
            this.statusError = 'Max count of chars is 3'
          } else {
            this.ageError = ''
          }
        }

        if (this.$v.status.$dirty) {
          if (!this.$v.status.maxLength) {
            this.statusError = 'Max count of chars is 30'
          } else {
            this.statusError = ''
          }
        }

        if (this.$v.oldPassword.$dirty) {
          if (!this.$v.oldPassword.isEqual) {
            this.oldPasswordError = 'Wrong password'
          } else {
            this.oldPasswordError = ''
          }
        }

        if (this.$v.newPassword.$dirty) {
          if (!this.$v.newPassword.minLength) {
            this.newPasswordError = 'Password must have 8 chars'
          } else if (!this.$v.newPassword.isAlreadyUse && !this.$v.oldPassword.isEqual) {
            this.newPasswordError = ''
          } else if (!this.$v.newPassword.isAlreadyUse) {
            this.newPasswordError = 'Passwords are equal'
          } else {
            this.newPasswordError = ''
          }
        }
      },
      deep: true
    }
  },
  computed: {
    isDisabledChange () {
      if (!this.$v.newPassword.$invalid && !this.$v.oldPassword.$invalid) {
        return false
      }

      return true
    }
  },
  methods: {
    async changePassword () {
      try {
        const updatedUser = await userService.edit(this.user._id, { password: this.newPassword })

        this.$store.commit('setUser', updatedUser)
        this.isChangingPassword = false
      } catch (exception) {
        this.$emit('showError', exception.message)
      }
    },
    changeOldPassword (value) {
      this.oldPassword = value
    },
    turnIsChangingPassword () {
      this.isChangingPassword = !this.isChangingPassword
    },
    setInputValue (inputName) {
      switch (inputName) {
        case 'status': this.$v.status.$touch(); break
        case 'age': this.$v.age.$touch(); break
        case 'oldPassword': this.$v.oldPassword.$touch(); break
        case 'newPassword': this.$v.newPassword.$touch(); break
      }
    },
    async onInfoChanged (field, value) {
      if (!this.$v[field].$anyError) {
        try {
          const updatedUser = await userService.edit(this.user._id, { [field]: value })

          this.$store.commit('setUser', updatedUser)
        } catch (exception) {
          console.log(exception.message)
        }
      }
    },
    async onImageChanged (image) {
      try {
        const imageString = await userService.stringifyImage(image)
        const updatedUser = await userService.edit(this.user._id, { avatar: imageString })

        this.$store.commit('setUser', updatedUser)
      } catch (exception) {
        console.log(exception.message)
      }
    }
  },
  components: {
    appAvatarInput,
    appEditableInput,
    appButton
  }
}
</script>

<style lang="scss" scoped>
.account {
  position: relative;
  overflow-y: scroll;
  display: flex;

  flex-direction: column;
  align-items: center;

  height: 100%;

  background-color: whitesmoke;

  &__avatar-input {
    margin-top: 20px;

    height: 200px;
  }

  &__info-input {
    color: $main-color;
    text-align: center;
  }

  &__input-wrapper {
    display: flex;

    align-items: center;

    padding: 0 30px;
  }

  &__info-label {
    margin-right: 10px;

    font-family: 'Roboto', sans-serif;
    color: $main-color;
  }

  &__info-error {
    display: block;

    font-family: 'Roboto', sans-serif;
    color: $error-color;
    font-size: 13px;
    line-height: 13px;
    text-align: left;

    margin-top: 25px;
    margin-bottom: 5px;
    padding: 0 30px;

    min-height: 13px;
    width: 100%;
  }

  &__reset-button {
    margin-top: 30px;
  }

  &__change-password-shadow {
    position: absolute;

    height: 100%;
    width: 100%;

    top: 0;
    left: 0;

    background-color: rgba(0, 0, 0, 0.4);
  }

  &__change-password-wrapper {
    position: absolute;
    display: flex;

    flex-direction: column;

    top: 50%;
    left: 50%;

    padding: 15px;

    width: 80%;

    background-color: whitesmoke;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, $alpha: 0.3);

    transform: translate(-50%, -50%);
  }

  &__change-password-close {
    position: absolute;

    top: 15px;
    right: 15px;

    height: 20px;
    width: 20px;

    background-color: transparent;
    border: none;
  }

  &__change-password-icon {
    height: 100%;
    width: 100%;
  }

  &__change-password-input {
    color: $main-color;
  }

  &__change-password-error {
    display: block;

    font-family: 'Roboto', sans-serif;
    color: $error-color;
    font-size: 13px;
    line-height: 13px;
    text-align: left;

    margin-bottom: 5px;
    margin-top: 25px;

    min-height: 13px;
    width: 100%;

    color: $error-color;

    &:first-child {
      margin-top: 45px;
    }
  }

  &__change-password-title {
    position: absolute;

    top: 15px;
    left: 15px;

    font-family: 'Roboto', sans-serif;
    color: $main-color;
    font-weight: bold;
    font-size: 18px;
    line-height: 20px;
  }

  &__change-password-change {
    align-self: flex-end;

    width: 50%;

    margin-top: 40px;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: .3s opacity;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.fade-enter-to, .fade-leave {
  opacity: 1;
}
</style>
