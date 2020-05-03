<template>
<div class="home-page">
  <section class="preview">
    <div class="logo-container">
      <img class="logo-container__icon" src="@/assets/images/logo.svg">
      <span class="logo-container__name">
        essanger
      </span>
    </div>
    <app-wave-animation class="preview__animation"/>
    <a href="#ourAdvantages">
      <button class="preview__button">i</button>
    </a>
  </section>

  <section class="about-project">
    <p class="about-project__text">
      Fully anonymous and secure messenger.
    </p>
  </section>

  <section class="auth" id="authForm">
    <app-auth-form
      @logouted="logout"
      @signedIn="signInUser"
      @signedUp="signUpNewUser"
      @toAccountClicked="redirectToAccount"
      :user="user"
      :isLoading="isLoading"
      class="auth__form"/>
  </section>

  <section class="our-advantages" id="ourAdvantages">
    <p class="our-advantages__item">
      Communicate using messanger and be sure that no one will find out anything extra about you
    </p>
    <p class="our-advantages__item">
      Messanger will not allow your data to leak during transmission
    </p>
    <p class="our-advantages__item">
      Messanger will protect your data even if an attacker has direct access to your phone
    </p>

    <a href="#authForm">
      <app-button class="our-advantages__button">
        <span class="our-advantages__button-text">Sign up</span>
      </app-button>
    </a>
  </section>

  <section class="author">
    <span class="author__text">Causelove</span>
  </section>

  <section class="awesome-team">
    <p class="awesome-team__title">Team</p>
    <div class="awesome-team__wrapper">
      <div class="awesome-team__column">
        <div class="awesome-team__column-item">
          <img class="awesome-team__column-image" src="@/assets/images/alex.png">
          <p class="awesome-team__column-name">Alex</p>
        </div>
        <div class="awesome-team__column-item">
          <img class="awesome-team__column-image" src="@/assets/images/andrey.png">
          <p class="awesome-team__column-name">Andrey</p>
        </div>
      </div>
      <div class="awesome-team__column">
        <div class="awesome-team__column-item">
          <img class="awesome-team__column-image" src="@/assets/images/master.png">
          <p class="awesome-team__column-name">Coach</p>
        </div>
      </div>
      <div class="awesome-team__column">
        <div class="awesome-team__column-item">
          <img class="awesome-team__column-image" src="@/assets/images/vovan.png">
          <p class="awesome-team__column-name">Vovan</p>
        </div>
        <div class="awesome-team__column-item">
          <img class="awesome-team__column-image" src="@/assets/images/artyom.png">
          <p class="awesome-team__column-name">Artyom</p>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import appAuthForm from '@/components/form-components/app-auth-form'
import appButton from '@/components/form-components/app-button'
import appWaveAnimation from '@/components/animation-components/app-wave-animation'
import userService from '@/services/user.service'

export default {
  name: 'Home',
  data () {
    return {
      isLoading: false,
      user: this.$store.state.user.getValue()
    }
  },
  created () {
    this.$store.state.user.subscribe(user => { this.user = user })
  },
  methods: {
    async signUpNewUser ({ login, nickname, password }) {
      this.isLoading = true

      try {
        await userService.signUp(login, nickname, password)

        this.signInUser({ login, password })
      } catch (exception) {
        this.$emit('showError', exception.message)
      } finally {
        this.isLoading = false
      }
    },
    async signInUser ({ login, password }) {
      this.isLoading = true

      try {
        const user = await userService.login(login, password)

        this.$store.commit('setUser', user)
        this.$router.push({ name: 'account' })
      } catch (exception) {
        this.$emit('showError', exception.message)
      } finally {
        this.isLoading = false
      }
    },
    async logout () {
      try {
        await userService.logout()

        this.$store.commit('setDefaultUser')
      } catch (exception) {
        this.$emit('showError', exception.message)
      }
    },
    redirectToAccount () {
      this.$router.push({ name: 'account' })
    }
  },
  components: {
    appAuthForm,
    appWaveAnimation,
    appButton
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  overflow-x: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;
}

.preview {
  position: relative;

  padding: 20px 0;

  background-color: whitesmoke;

  &__animation {
    position: absolute;

    bottom: -43px;
    right: -3px;
  }

  &__button {
    position: absolute;
    cursor: pointer;

    bottom: -20px;
    right: 20px;

    height: 40px;
    width: 40px;

    font-family: 'Nanum Gothic', sans-serif;
    font-weight: bolder;
    font-size: 25px;
    color: #f5f5f5;
    text-align: center;
    line-height: 40px;

    background-color: $main-color-light;
    box-shadow: 0 0px 2px 1px rgba($color: black, $alpha: 0.3);
    border-width: 0;
    border-color: white;
    border-style: solid;
    border-radius: 50%;
  }
}

.about-project {
  padding: 25px 0;

  background-color: $main-color;
  background-image:
    url('~@/assets/images/anonymousMask.svg'),
    url('~@/assets/images/lock.svg');
  background-position:
    -5% 90%,
    93% 160%;
  background-size:
    80px auto,
    50px auto;
  background-repeat: no-repeat;

  &__text {
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    color: whitesmoke;
    text-align: center;
  }
}

.auth {
  padding-top: 30px;
  padding-bottom: 30px;

  &__form {
    max-width: 340px;
    width: 80%;

    margin: 0 auto;
  }
}

.logo-container {
  display: flex;

  justify-content: center;
  align-items: center;

  &__name {
    font-family: 'Roboto', sans-serif;
    font-weight: bolder;
    font-size: 25px;
    color: $main-color;

    margin-left: 2px;
    padding-top: 15px;

    text-transform: uppercase;
  }
}

.our-advantages {
  padding: 20px 20px 40px 20px;

  width: 100%;

  background-color: $main-color-light;

  &__item {
    padding: 15px 100px 15px 15px;
    margin-bottom: 15px;

    text-indent: 10px;
    font-family: 'Roboto', sans-serif;
    font-size: 17px;
    color: $main-color;

    border-radius: 5px;
    box-shadow: 0 4px 12px 1px rgba($color: black, $alpha: 0.2);
    background-color: whitesmoke;
    background-repeat: no-repeat;
    background-position: calc(100% - 15px) center;
    background-size: 25%;

    &:nth-child(1) {
      background-image: url('~@/assets/images/anonymousWindow.svg')
    }

    &:nth-child(2) {
      background-image: url('~@/assets/images/transferSecurity.svg')
    }

    &:nth-child(3) {
      background-image: url('~@/assets/images/storageSecurity.svg')
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__button {
    display: block;

    width: 110px;
    height: 35px;

    margin: 0 auto;

    background-color: $main-color;
    box-shadow: 0 4px 8px 1px rgba($color: black, $alpha: 0.3);
  }

  &__button-text {
    color: whitesmoke;

    font-weight: bold;
    font-size: 16px;
    line-height: 30px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
}

.author {
  width: 100%;

  padding: 5px 0;

  background-color: $main-color;
  box-shadow: 0 -1px 8px 1px rgba(0, 0, 0, 0.2);

  &__text {
    display: block;

    width: 100%;

    color: whitesmoke;
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }
}

.awesome-team {
  background-color: whitesmoke;

  padding-top: 15px;

  &__wrapper {
    display: flex;
  }

  &__title {
    font-family: 'Roboto', sans-serif;
    font-size: 36px;
    color: rgba(0, 0, 0, 0.7);
    text-align: center;
  }

  &__column {
    display: flex;

    flex-direction: column;

    padding-bottom: 35px;

    width: 30%;

    &:nth-child(1) {
      align-items: flex-end;

      .awesome-team__column-item:nth-child(1) {
        transform: rotateZ(-5deg);
      }

      .awesome-team__column-item:nth-child(2) {
        transform: rotateZ(-10deg);
      }
    }

    &:nth-child(2) {
      position: relative;

      width: 38%;

      flex-direction: row;

      justify-content: center;
      align-items: center;

      .awesome-team__column-item:nth-child(1) {
        z-index: 100;
      }

      &::before {
        content: '';
        position: absolute;
        z-index: 5;

        top: 50%;
        left: 50%;

        background-image: url('~@/assets/images/laura.webp');
        background-repeat: no-repeat;
        background-position: top left;
        background-size: 100% 100%;

        width: 125px;
        height: 125px;

        transform: translate(-50%, -50%);
      }
    }

    &:nth-child(3) {
      align-items: flex-start;

      .awesome-team__column-item:nth-child(1) {
        transform: rotateZ(5deg);
      }

      .awesome-team__column-item:nth-child(2) {
        transform: rotateZ(10deg);
      }
    }
  }

  &__column-item {
    margin-top: 35px;
    padding: 6px 6px 4px 6px;

    background-color: white;
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.3);

    transform-origin: 50% 50%;
  }

  &__column-image {
    width: 70px;
    height: 70px;

    object-fit: cover;
  }

  &__column-name {
    font-family: 'Roboto', sans-serif;
    font-size: 15px;
    text-align: center;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.7);
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
