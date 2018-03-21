const state = {
  isLoading: false,
  isLogin: false,
  envs: null,
  canLoadView: false
}

const mutations = {
  /**
  * 设置加载loading
  * @param state
  * @param flag
  */
  setFullLoading: (state, flag) => {
    state.isLoading = flag
  },
  setCanLoadView: (state, b = false) => {
    state.canLoadView = b
  },
  /**
 * 设置登录状态
 * @param state
 * @param state
 * @returns {*}
 */
  setLogin: (state, b = false) => {
    state.isLogin = b
  },
  /**
     * 初始化系统常量
     * @param state
     * @param obj
     */
  initEnvs: (state, obj = null) => {
    state.envs = obj
  },
  /**
     * 销毁数据
     * @param state
     */
  destroy: state => {
    state.isLoading = false
    state.isLogin = false
  }
}
const getters = {
  /**
     * 系统登录状态
     * @param state
     * @returns {boolean|*}
     */
  isLogin: state => state.isLogin,
  /**
     * 根据年级获取科目信息
     * @param index 年级索引:1-12,参数不对或者数据不存在则返回[]
     */
  gradeMap: (state, getters) => index => {
    return (((index && state.envs instanceof Object) && state.envs['gradeMap']) && state.envs['gradeMap'][index]) || []
  },
  /**
     * 获取系统变量中的指定配置,如果未指定key则返回整个系统变量
     * @param key 配置名称
     */
  envs: (state, getters) => key => {
    return key ? ((state.envs instanceof Object && state.envs[key]) || null) : state.envs
  },
  canLoadView: state => state.canLoadView
}

const actions = {
  onLoading: ({commit}, flag) => {
    commit('setFullLoading', flag)
  }
}

export {
  state, mutations, getters, actions
}
