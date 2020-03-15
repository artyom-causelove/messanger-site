<template>
  <div id="app">
    <div class="app__header" v-if="$route.name !== 'home'">
      aaaaaaaaaaaaaaaaaaaaaaaaaa
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import gql from 'graphql-tag'

const LOGIN_WITH_API_KEY_USER = gql`
  mutation ($apiKey: String!) {
    loginWithApiKeyUser(apiKey: $apiKey) {
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

export default Vue.extend({
  name: 'app',
  created () {
    const apiKey = JSON.parse(window.localStorage.getItem('apiKey'))

    if (apiKey) {
      this.$apollo.mutate({
        mutation: LOGIN_WITH_API_KEY_USER,
        variables: {
          apiKey
        }
      })
        .then(({ data }) => {
          delete data.loginWithApiKeyUser.__typename
          this.$store.commit('setUser', data.loginWithApiKeyUser)
        })
    }
  }
})
</script>

<style lang="scss">
#app {
  display: flex;

  flex-direction: column;

  width: 100vw;
  height: 100vh;
}
</style>
