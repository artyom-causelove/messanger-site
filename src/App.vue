<template>
  <div id="app">
    <div class="app__header" v-if="$route.name !== 'home'">
      aaaaaaaaaaaaaaaaaaaaaaaaaa
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  display: flex;

  flex-direction: column;

  width: 100vw;
  height: 100vh;
}
</style>
