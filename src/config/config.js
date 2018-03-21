import Env from './env'

let config = {
  env: Env
}
const urlPrefix = '/stu'

// API 前缀
config.urlPrefix = urlPrefix

// Url前缀
config.pathPrefix = ''

// cookie配置
config.cookie = {
  // 登录安全认证字段
  loginAuthKey: 'studentLogin'
}

// 试题配置
config.question = {
  contentSplitStr: '####' // 试题选项分隔符
}

// 不同的环境ajax请求前缀设置
config.ajaxUrl = config.env === 'development' ? urlPrefix : config.env === 'production' ? 'https://www.url.com' : 'https://debug.url.com'

// axios 基础属性配置
config.ajaxBaseURL = {
  PUBLIC: '' // 公共接口
}

config.ajaxconfig = {
  // 基础url前缀
  baseURL: config.ajaxBaseURL.PUBLIC,
  // 设置超时时间
  timeout: 300000,
  // 返回数据类型
  responseType: 'json', // default
  // 请求的接口，在请求的时候，如axios.get(url,config);这里的url会覆盖掉config中的url
  url: '/',

  // 请求方法同上
  method: 'get', // default
  transformRequest: [function (data) {
    // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
    // data = axios.stringify(data);
    // console.log('data',typeof data,data)
    // console.log(data.method)
    return data
  }],

  transformResponse: [function (data) {
    // 这里提前处理返回的数据
    if (typeof data === 'string') {
      data = JSON.parse(data)
    }
    return data
  }],

  // 请求头信息
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded', // application/json application/x-www-form-urlencoded
    'Token': ''
  },

  // parameter参数
  params: {},

  // post参数，使用axios.post(url,{},config);如果没有额外的也必须要用一个空对象，否则会报错
  data: {},

  withCredentials: true
  // 当我们把此配置项设置成默认配置项并且设置成true的时候，axios就可以设置cookies了。
}

let pageSize = 10
config.pageInitPrams = {
  currentPage: 1,
  pageSizes: [pageSize, 50, 100, 200],
  pageSize: pageSize,
  listLayout: 'total, sizes, prev, pager, next, jumper',
  listTotal: 10
}
export default config
