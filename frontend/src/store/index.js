import Vue from 'vue'
import Vuex from 'vuex'
import { petStore } from './pet.store.js'
import { userStore } from './user.srote.js'
import { orderStore } from './order.store.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    petStore,
    userStore,
    orderStore,
  }
})
