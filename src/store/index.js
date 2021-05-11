import { createStore } from 'vuex'

import axios from '@/request/index.js'

// namespaced module
import layout from './modules/layout';

export default createStore({
  state: {
    authInfo: {},
    watermarkBase64: ''
  },
  getters: {
    GET_AUTH_INFO: state => {
      if (state.authInfo.uuid) {
        return state.authInfo
      } else {
        let tokenInfo = {}
        try {
          tokenInfo = JSON.parse(localStorage.getItem(process.env.VUE_APP_AUTH_KEY)) || {}
        } catch (error) {
          console.error('get token error', error)
        }
        return tokenInfo
      }
    }
  },
  mutations: {
    SET_AUTH_INFO(state, payload) {
      state.authInfo = payload || {}
    },
    SET_AUTH_INFO_FROM_LOCALSTORAGE(state) {
      let tokenInfo = {}
      try {
        tokenInfo = JSON.parse(localStorage.getItem(process.env.VUE_APP_AUTH_KEY)) || {}
      } catch (error) {
        console.error('get token error', error)
      }
      state.authInfo = tokenInfo;
    },
    SET_WATERMARK_BASE64(state, payload) {
      state.watermarkBase64 = 'data:image/png;base64,' + payload
    }
  },
  actions: {
    getAccountBase64({ state, commit }) {
      return new Promise((resolve, reject) => {
        if (state.watermarkBase64) {
          resolve(state.watermarkBase64);
        } else {
          axios({
            api: 'watermarkBase64'
          }).then(res => {
            commit('SET_WATERMARK_BASE64', res.base64)
            resolve(state.watermarkBase64)
          }).catch(e => {
            reject(e)
          })
        }
      })
    }
  },
  modules: {
    layout
  }
})
