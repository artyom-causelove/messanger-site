import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuelidate from 'vuelidate'

import { createProvider } from './vue-apollo'

Vue.config.productionTip = false
Vue.use(vuelidate)

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
