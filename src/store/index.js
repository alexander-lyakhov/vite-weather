import { createStore } from "vuex";
// import { showError } from '@/utils'
import api from '@/api';
import data from './data.json'

export default createStore({
  strict: true,

  state: () => ({
    cards: [{name: 'Dnipro', country: 'UA', ...data}]
  }),

  getters: {
    getByCity(state) {
      return (name) => state.cards.find(el => el.name === name)
    }
  },

  mutations: {
  },

  actions: {
  }
});
