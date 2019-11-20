import jwtDecode from 'jwt-decode'

const state = {
  // 초기의 상태 token null
  token: null,
}

const mutations = {
  // 최신화된 token을 state안의 token에 넣는다
  setToken: function(state, token){
    state.token = token

  }
}

const actions = {
  // 위의 mutations의 메소드를 하나의 메소드로 묶는다.
  login(options, token){
    options.commit('setToken', token)
  },
  logout(options){
    options.commit('setToken', null)
  }
}
// status안의 정보를 수정하지 않는 범위내에서 가져온다.
const getters = {
  isAuthenticated(){
    return state.token ? true: false
    // if (state.token) {
    //   return true
    // }
    // return false
  },
  requestHeader(state){
    return {
      headers:{
        Authorization: "JWT " + state.token
      }
    }
  },
  userId(state){
    return state.token? jwtDecode(state.token).user_id : null
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}