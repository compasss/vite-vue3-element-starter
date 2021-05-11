/**
 * 界面配置
*/

const state = {
  sideBarArr: []
}

const mutations = {
  SET_SIDEBAR_ARR(state, payload) {
    state.sideBarArr = payload
  }
}

export default {
  namespaced: true,
  state,
  mutations
}

