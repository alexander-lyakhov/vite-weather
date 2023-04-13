import { createStore } from "vuex";
// import { showError } from '@/utils'
import api from '@/api';
import data from './data.json'

export default createStore({
  strict: true,

  state: () => ({
    cities: [{name: 'Dnipro', country: 'UA', ...data}]
  }),

  getters: {
  },

  mutations: {
  },

  actions: {
  }
});
