/*
****--@file     user
****--@date     2018/1/3 上午10:22
****--@author   jhd
****--@describe   当前登录人信息
*/

let state = {
  info: null // 用户基本信息
}
let mutations = {
  updateInfo: (state, info = null) => {
    state.info = info
    if (info instanceof Object) {
      state.userIntegral = info.integral
    } else {
      state.userIntegral = 0
    }
  },
  destroy: state => {
    state.info = null
  }
}
let actions = {}
let getters = {
  info: (state, getters) => key => {
    // 如果传key，不存在则返回null，不传key则返回info对象
    return key ? (state.info instanceof Object && state.info[key]) : state.info
  }
}

export {state, mutations, getters, actions}
