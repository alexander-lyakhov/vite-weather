import { createStore } from "vuex";
// import { showError } from '@/utils'
import api from '@/api';
import data from './data.json'

export default createStore({
  strict: true,

  state: () => ({
    // cards: [{uid: 'lghpzx7o', name: 'Dnipro', country: 'UA', ...data}]
    cards: []
  }),

  getters: {
    getByCity(state) {
      return (name) => state.cards.find(el => el.name === name)
    },

    getByUID(state) {
      return (uid) => state.cards.find(el => el.uid === uid)
    }
  },

  mutations: {
    ADD_CARD(state) {
      console.log('ADD_CARD')
      const uid = Date.now().toString(36);
      state.cards.push({uid})
    },

    DELETE_CARD(state, uid) {
      console.log('DELETE_CARD', uid)
      state.cards = state.cards.filter(el => el.uid != uid)
    },

    UPDATE_CARD(state, data) {
      console.log('UPDATE_CARD', data)
      const index = state.cards.findIndex(el => el.uid === data.uid)
      
      if (index >= 0) {
        state.cards[index] = data
      }
    }
  },

  actions: {
    addCard({commit}, data) {
      commit('ADD_CARD')
    },

    deleteCard({commit}, uid) {
      commit('DELETE_CARD', uid)
    },

    async getCardData({commit}, data) {
      const res = {
        ...data,
        ...await api.onecall(data)
      }
      commit('UPDATE_CARD', res)
      return res
    }
  }
});
