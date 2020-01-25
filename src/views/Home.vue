<template>
<div class="home-page">
  <section class="preview">
    <div class="logo-container">
      <img class="logo-container__icon" src="@/assets/images/logo.svg">
      <span class="logo-container__name">
        essanger
      </span>
    </div>
  </section>

  <section class="auth">
    <app-auth-form class="auth__form"/>
  </section>
</div>
</template>

<script>
import appAuthForm from '@/components/app-auth-form'

export default {
  name: 'Home',
  components: {
    appAuthForm
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  overflow-x: hidden;
  overflow-y: scroll;
}

.preview {
  position: relative;

  padding: 20px 0;

  background-color: whitesmoke;

  &::after {
    content: 'i';
    position: absolute;
    cursor: pointer;

    bottom: -20px;
    right: 20px;

    height: 40px;
    width: 40px;

    font-family: 'Nanum Gothic', sans-serif;
    font-weight: bolder;
    font-size: 25px;
    color: whitesmoke;
    text-align: center;
    line-height: 40px;

    background-color: $main-color;
    border-radius: 50%;
  }
}

.auth {
  padding-top: 30px;
  padding-bottom: 30px;

  &__form {
    width: 80%;

    margin: 0 auto;
    padding: 10px 20px 15px 20px;

    background-color: whitesmoke;
    box-shadow: 0 4px 12px 1px rgba($color: black, $alpha: 0.2);
    border-radius: 5px;
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
</style>
