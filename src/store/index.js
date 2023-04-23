import { createStore } from "vuex";
// import { showError } from '@/utils'
import api from '@/api';
import data from './data.json'

export default createStore({
  strict: true,

  state: () => ({
    cards: [],
    favorites: [],
    dataSrc: 'cards', // 'cards', 'favorites'
  }),

  getters: {
    getByCity(state) {
      return (name) => state.cards.find(el => el.name === name)
    },

    getByUID(state) {
      return (uid) => state[state.dataSrc].find(el => el.uid === uid)
    },

    getChartData(state) {
      return (uid) => {
        const card = state[state.dataSrc].find(el => el.uid === uid)
        return card?.hourly?.map((el, index) => {
          return {
            time: (index & 1) === 0 ? (index >> 1) + ':00' : (index >> 1) + ':30',
            temp: Math.round(el.temp)
          }
        })
      }
    },

    isInFavorites(state) {
      return (locationId) =>
        state.favorites.some(el => el.locationId === locationId)
    },

    favCount(state) {
      return state.favorites.length
    }
  },

  mutations: {
    SET_DATA_SRC(state, val = 'cards') {
      state.dataSrc = val
    },

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
    },

    ADD_TO_FAVORITES(state, data) {
      console.log('ADD_TO_FAVORITES')
      const uid = Date.now().toString(36);
      state.favorites.push({uid, ...data})
    },

    REMOVE_FROM_FAVORITES(state, data) {
      console.log('REMOVE_FROM_FAVORITES')
      state.favorites = state.favorites.filter(el => el.locationId !== data.locationId)
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
        ...await api.onecall(data.position)
      }
      commit('UPDATE_CARD', res)
      return res
    },

    async loadFromFavorites({ dispatch }) {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || []
      console.log('loadFromFavorites', favorites)
      for (let item of favorites) {
        const data = await api.onecall(item.position)
        console.log(item, data)
        dispatch('addToFavorites', {...item, ...data})
      }
    },

    addToFavorites({ commit, state, getters }, data) {
      if (!getters.isInFavorites(data.locationId)) {
        commit('ADD_TO_FAVORITES', data)
        
        console.log('addToFavorites', state.favorites)
        
        const favorites = state.favorites.map(el => ({
          address: el.address,
          locationId: el.locationId,
          position: el.position
        }))
        
        console.log(favorites)
        localStorage.setItem('favorites', JSON.stringify(favorites))
      }
    },

    removeFromFavorites({ commit, state, getters }, data) {
      if (getters.isInFavorites(data.locationId)) {
        commit('REMOVE_FROM_FAVORITES', data)

        const favorites = state.favorites.map(el => ({
          address: el.address,
          locationId: el.locationId,
          position: data.position
        }))
        console.log(favorites)
        localStorage.setItem('favorites', JSON.stringify(favorites))
      }
    }
  }
});
