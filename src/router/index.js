import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Account from '../views/Account.vue'
import Messages from '../views/Messages.vue'
import Notifications from '../views/Notifications.vue'
import Conference from '../views/Conference.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/account',
    name: 'account',
    component: Account
  },
  {
    path: '/messages',
    name: 'messages',
    component: Messages
  },
  {
    path: '/notify',
    name: 'notifications',
    component: Notifications
  },
  {
    path: '/conference/:name',
    name: 'conference',
    component: Conference,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
