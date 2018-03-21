import axios from 'axios'
import config from '../config/config'
import {formatDate, parseDate} from './date'
import _ from 'lodash'
// 自定义组件
import uploadFile from '../components/common/uploadFile.vue'
import modalHeader from '../components/common/modalHeader.vue'
import loadBtn from '../components/common/loadBtn.vue'
import todoComfirm from '../components/common/todoComfirm.vue'

let ajaxconfig = config.ajaxconfig
let ajaxBaseURL = config.ajaxBaseURL
let util = {}

// // 添加一个请求拦截器
// const myInterceptor = axios.interceptors.request.use(function(config) {
//   // 在请求发送之前做一些事
//   return config
// }, function (error) {
//   // 当出现请求错误是做一些事
//   return Promise.reject(error)
// })

var instance = axios.create(ajaxconfig)

// 设置默认分页参数
util.pageInitPrams = config.pageInitPrams
// 试题配置
util.questionConfig = config.question

// 路径前缀
util.pathPrefix = config.pathPrefix
util.urlPrefix = config.urlPrefix

util.cookieConfig = config.cookie
// 请求列表数据
/* axios 请求方式
 axios.request(config)

 axios.get(url[, config])

 axios.delete(url[, config])

 axios.head(url[, config])

 axios.post(url[, data[, config]])

 axios.put(url[, data[, config]])

 axios.patch(url[, data[, config]])
 */
let queCount = 0
util.queryData = function (options, fun) {
  // 必须基本设置请求参数
  let url = options.url || ''
  let baseURL = options.baseURL ? ajaxBaseURL[options.baseURL] : ajaxconfig.baseURL
  let method = options.method || ajaxconfig.method
  // 'get' 'post'  'put' ，默认请求get

  let isParseStringJSON = options['jsonString']
  // 扩展基本配置项
  let myConfig = options.baseConfing || {} // {}

  let config = _.defaultsDeep({}, myConfig)
  config.method = method
  config.baseURL = baseURL
  // 获取服务端数据
  if (method === 'post' || method === 'put' || method === 'patch') {
    // POST提交数据时必选参数
    let potsData = options.data || {} // {firstName: 'Fred',lastName: 'FlintStone'}
    if (_.isObject(potsData)) {
      if (typeof isParseStringJSON !== 'undefined') {
        if (isParseStringJSON === 'textPlain') {
          util.setAjaxQuestHeader('Content-Type', 'text/plain')
          potsData = JSON.stringify(potsData)
        } else {
          util.setAjaxQuestHeader('Content-Type', 'application/json')
          potsData = JSON.stringify(potsData)
        }
      } else {
        util.setAjaxQuestHeader('Content-Type', 'application/x-www-form-urlencoded')
        potsData = util.serializeParams(potsData)
      }
    } return instance[method].bind(instance, url, potsData, config)
  } else {
    // GET提交数据时必选参数
    let myParams = options.params || {} // {params: {ID: 12345}} || '/user?ID=12345'
    myParams = Object.assign({}, myParams, {mathRand: Math.random() * 100000000000000000})
    config.params = myParams
    // if(method=='delete'){
    //   instance.defaults.headers.post['Content-Type'] = 'multipart/form-data'
    // }
    return instance[method].bind(instance, url, config)
  }
}

util.axios = axios

// 转换数据格式   应用场景:当后台数据格式发生变化时可
util.foramteData = function (options) {
  let type = options.type || 'list'
  let data = options.data
  switch (type) {
    case 'list':
      break
    case 'user':
      break
    case 'leftmenus':
      break
    default:
  }
  return data
}

// ajax请求的错误信息处理
util.handleAjaxError = function ($vue, status, mess) {
  let flag = false
  switch (status) {
    case '1':
      flag = false
      $vue.errorMess(mess + '!')
      break
    case '2':
      flag = false
      $vue.errorMess(mess + '!')
      break
    case '8':
      flag = true
      $vue.errorMess(mess + '!')
      break
    case '9':
      flag = true
      $vue.errorMess(mess + '!')
      break
    case '10':
      flag = true
      $vue.errorMess(mess + '!')
      break
    case '17':
      flag = true
      $vue.errorMess(mess + '!')
      break
    case '19':
      flag = true
      $vue.errorMess(mess + '!')
      break
    case '21':
      flag = true
      $vue.errorMess(mess + '!')
      break
    case '22':
      flag = true
      $vue.errorMess(mess + '!')
      break
    case '23':
      flag = true
      $vue.errorMess(mess + '!')
      break
    case '24':
      flag = false
      $vue.errorMess(mess + '!')
      break
    case '30':
      flag = true
      $vue.errorMess(mess + '!')
      break
    case '31':
      flag = true
      $vue.errorMess(mess + '!')
      break
    case '32':
      flag = true
      $vue.errorMess(mess + '!')
      break
    case '33':
      flag = true
      $vue.errorMess(mess + '!')
      break
    case '34':
      flag = true
      $vue.errorMess(mess + '!')
      break
    case '36':
      flag = true
      $vue.errorMess(mess + '!')
      break
    case '37':
      flag = true
      $vue.errorMess(mess + '!')
      break
    case '38':
      flag = true
      $vue.errorMess(mess + '!')
      break
    case '39':
      flag = true
      $vue.errorMess(mess + '!')
      break
    case '55':
      flag = false
      $vue.errorMess(mess + '!')
      // $vue.$router.push('/selfCenter/selfShopcar')
      break
    case '56':
      flag = false
      $vue.errorMess(mess + '!')
      break
    case '4':
      // token验证失败
      flag = true
      if (util.isLogin()) {
        $vue.errorMess('登录超时!')
      } else {
        $vue.errorMess('您使用的功能需要登录，请先进行登录!')
      }
      $vue.$cookie.delete(config.cookie.loginAuthKey)
      $vue.$store.commit('user/destroy')
      $vue.$store.commit('app/destroy')
      // $vue.$store.commit('setIndexUrl', '')
      $vue.$router.push('/login')
      break
    case '404':
      flag = true
      $vue.errorMess('未找到页面')
      break
    case '500':
      flag = true
      $vue.errorMess('服务器异常')
      break
    case '504':
      flag = true
      $vue.errorMess('服务器网络异常(网关超时）!')
      break
    default:
      if (mess !== '') {
        flag = false
        $vue.errorMess(mess + '!')
      }
  }
  return flag
}

// 反格式化日期
util.deformatterDate = function (d) {
  return new Date(d).getTime() - 1000 * 60 * 60 * 24
}

// 添加监听事件
util.events = {
  addHandler: function (oElement, sEvent, fnHandler) {
    oElement.addEventListener ? oElement.addEventListener(sEvent, fnHandler, false) : oElement.attachEvent('on' + sEvent, fnHandler)
  },
  removeHandler: function (oElement, sEvent, fnHandler) {
    oElement.removeEventListener ? oElement.removeEventListener(sEvent, fnHandler, false) : oElement.detachEvent('on' + sEvent, fnHandler)
  }
}

// 检测元素是否存在该事件
util.detectEventSupport = function (eventName) {
  let isSupported
  eventName = 'on' + eventName
  let tempElement = document.createElement('div')
  isSupported = (eventName in tempElement) // 使用第一种方式
  // 如果第一种方式行不通，那就来看看它是不是已知事件类型
  if (!isSupported) {
    tempElement.setAttribute(eventName, 'xxx')
    isSupported = typeof tempElement[eventName] === 'function'
  }
  // 清除掉动态创建的元素，以便内存回收
  tempElement = null
  // 返回检测结果
  return isSupported
}

util._ = _

// JSON序列化传入参数形式
util.serializeParams = function (params, type) {
  if (!params) return
  let obj = {}
  if (type === 'JSON') {
    if (!_.isString(params)) return
    if (params.indexOf('&') > -1) {
      let splits = params.split('&')
      splits.forEach(function (v, k) {
        let key = v.split('=')[0] || k
        let val = v.split('=')[1] || undefined
        obj[key] = val
      })
      return obj
    }
  } else {
    if (!_.isObject(params)) {
      if (!_.isObject(JSON.parse(params))) {
        return
      } else {
        params = JSON.parse(params)
      }
    }
    obj = []
    _.forEach(params, function (v, k) {
      v = !v ? '' : v
      let val = k + '=' + v
      obj.push(val)
    })
    return obj.join('&')
  }
}

// 判断object 是否为空
util.isEmptyObject = function (e) {
  var t
  for (t in e) return !1
  return !0
}

// 消息提示
let success = util.success = function (mes) {
  this.$message({
    message: mes,
    type: 'success'
  })
}
let error = util.error = function (mes) {
  this.$message.error(mes)
}
let info = util.info = function (mes) {
  this.$message(mes)
}

/**
 * 存储localStorage
 */
util.setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
util.getStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
util.removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}

// 存取cookie方法
// util.setCookie = function (name, value, days, ckObj){
//   this.$cookie.set(name, value, days)
// },

// /*util.getCookie= function (name,ckObj) {
//     if(typeof ckObj!='undefined'){
//     ckObj.get(name)
//     }else{
//     this.$cookie.get(name)
//     }
// },*/

//   util.deleteCookie = function(name, ckObj) {
//     this.$cookie.delete(name)
//  }
// 请求前改变请求头源参数
util.setAjaxQuestHeader = function (key, v) {
  ajaxconfig['headers'][key] = v
  instance = axios.create(ajaxconfig)
}
// 登录后存储cookie: token
util.setAjaxPostToken = function () {
  let token = ''
  if (util.getCookie('Token')) {
    token = util.getCookie('Token')
  }
  util.setAjaxQuestHeader('Token', token)
}

// 获取浏览器中原始的cookie
util.getCookie = function (name) {
  let arr
  let reg = new RegExp('(^| )' + name + '=([^]*)(|$)')
  if (arr === document.cookie.match(reg)) {
    return arr[2]
  } else {
    return null
  }
}

// 验证token是否合法
util.isLegalToken = function (resonse) {
  let flag = false
  if (ajaxconfig['headers']['Token'] !== '') {
    flag = true
  }
  return flag
}

// 验证是否登录
util.isLogin = function () {
  return util.getCookie(config.cookie.loginAuthKey)
}

// 是否有用户信息
util.hasUserInfo = function (vue) {
  return vue.$store.getters['user/info']() instanceof Object
}

util.loginOut = function ($vue) {
  let opt = {
    ajaxSuccess: res => {
      $vue.$cookie.delete(config.cookie.loginAuthKey)
      $vue.$store.commit('user/destroy')
      $vue.$store.commit('app/destroy')
      $vue.$router.push('/login')
      $vue.successMess('退出成功!')
    },
    ajaxParams: {
      url: '/logout',
      method: 'delete'
    }
  }
  $vue.ajax(opt)
}

/**
 * [getFormData 处理提交数据 对象合并]
 * @param  {...Object} objs [需合并的对象，（单个或多个对象）]
 * @return {Object}         [去重合并之后的对象]
 */
util.getFormData = function (...objs) {
  return _.defaultsDeep({}, ...objs)
}
/**
 * @param arr//需要去重的数组
 * @return  //返回去重之后的新数组
 * */
util.unique = function (arr) {
  let res = []
  let json = {}
  for (var i = 0; i < arr.length; i++) {
    if (!json[arr[i]]) {
      res.push(arr[i])
      json[arr[i]] = 1
    }
  }

  return res
}
util._myVue = null
/**
 * 从数组中取key并以joinStr分割的字符串
 * @param arr 数组
 * @param key 提取的键
 * @param joinSt 分割字符
 */
util.getStrByArr = function (arr = [], key = '', joinSt = ',') {
  let res = []
  arr.map(item => res.push(item[key]))
  return res.join(joinSt)
}
export default {
  install (Vue) {
    Vue.prototype.$util = util
    Vue.mixin({
      data () {
        return {
          // 时间
          starTimes: '',
          PayResult: false,
          endTimes: '',
          pickerOptions0: {
          // 选择开始时间后设置结束日期的限制
            disabledDate: (time) => {
              if (this.endTimes !== '') {
                return time.getTime() >= this.endTimes
              }
            }
          },
          pickerOptions1: {
            // 选择结束时间后设置开始日期的限制
            disabledDate: (time) => {
              if (this.starTimes !== '') {
                return time.getTime() <= this.starTimes
              }
            }
          },
          value1: '',
          value2: '',
          myPages: '',
          // 弹窗
          addModal: false, // 添加模态窗体
          editModal: false, // 修改模态窗体
          showModal: false, // 显示模态窗体
          removeModal: false, // 删除模态窗体
          auditModal: false, // 审核模态窗体
          // tree
          filterText: '',
          // 总页数
          listTotal: 0

        }
      },
      methods: {
      // 时间
        deformatterDate (d) {
          return new Date(d).getTime() - 1000 * 60 * 60 * 24
        },
        handleStartTime (d) {
          this.starTimes = this.deformatterDate(d)
        },
        handleEndTime (d) {
          this.endTimes = this.deformatterDate(d)
        },
        // 改变页码
        changePageSize (n) {
          // let pageSize = this.queryQptions.params && (this.queryQptions.params.pageSize = n) || (this.queryQptions.pageSize = n)
          // pageSize = n
          this.setTableData()
        },
        changePage (n) {
          // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
          // let curPage = (this.queryQptions.params && (this.queryQptions.params.curPage = n) || (this.queryQptions.curPage = n))
          this.setTableData()
        },
        successMess: success,
        errorMess: error,
        showMess: info,
        // 列表页添加序号 arr=>arr  依赖:页数,页条数
        addIndex (data) {
          let arr = []
          for (let i = 0, length = data.length; i < length; i++) {
            data[i].index = ((this.queryQptions.curPage || this.queryQptions.params.curPage) - 1) * (this.queryQptions.pageSize || this.queryQptions.params.pageSize) + i + 1
            arr.push(data[i])
          }
          return arr
        },

        /*
         ajax(Promise)函数
         */
        // 通过传递发送的url信息和data，调用封装的axios （需要接受什么参数，请查看util.queryData方法）返回promise
        Promise (options) {
          // let that = this
          let myPromise = this.$util.queryData(options)()
          return myPromise
        },
        /*
        ajax成功的消息,默认成功事件（ajaxSuccess）（可自定义成功事件） (obj,obj,fun)=>false
            *@param responseData obj|array  当前行索引
            *@param messTitle     obj       传到ajax函数的数据（自定义数据）
            *@param [isLoadingFun]  function  如果是 自定义按钮组件 点击提交事件 则会传回操作按钮是否显示loading函数,已在conductSuccess函数处理，可做扩展用
            */
        ajaxSuccess (responseData, messTitle, isLoadingFun) {
          // this.$emit(messTitle.callback || 'close', messTitle)
          this.successMess(messTitle.successTitle)
          this.$emit(messTitle.callback, messTitle.callback, messTitle.successTitle)
        },
        /*
        判断返回数据是否成功  obj=>boolean
        * @param response     obj      成功返回的信息，包含data，status
        * */

        verifyAjaxResponse (response) {
          let flag = false
          let responseData = response.data
          if (this.$util._.isObject(responseData['status']) && responseData['status']['code'] === 0) {
            flag = true
          }
          return flag
        },

        /*
        对传入ajax成功函数进行处理 (obj,fun)=>fun
        * @param messTitle     obj       传到ajax函数的数据（自定义数据）
        * @param isLoadingFun  function  如果是 自定义按钮组件 点击提交事件 则会传回操作按钮是否显示loading函数（true取消loading）
        * */
        conductSuccess (messTitle, isLoadingFun) {
          if (!isLoadingFun) {
            isLoadingFun = function () {
            }
          }
          let ajaxSuccess = messTitle['ajaxSuccess'] || 'ajaxSuccess'
          let error = messTitle['error']
          let errorTitle = messTitle.errorTitle || '数据请求异常!'
          let done = messTitle['done']
          return (res) => {
            let isSuccess = this.verifyAjaxResponse(res)
            let responseData = res.data
            if (done) {
              if (typeof done === 'function') {
                done(res.data)
              } else {
                this[done].apply(this, responseData, messTitle, isLoadingFun)
              }
            }
            if (isSuccess) {
              if (typeof ajaxSuccess === 'function') {
                ajaxSuccess(res.data)
              } else {
                this[ajaxSuccess].apply(this, responseData, messTitle, isLoadingFun)
              }
            } else {
              let flag = util.handleAjaxError(this, responseData['status']['code'], responseData['status']['msg'])
              if (!flag) {
                if (error) {
                  if (typeof error === 'function') {
                    error(res.data)
                  } else {
                    this[error].apply(this, responseData, messTitle, isLoadingFun)
                  }
                  // this.error.call(this, responseData, messTitle, isLoadingFun)
                } else {
                  this.errorMess(errorTitle)
                }
              }
            }

            queCount--
            isLoadingFun(false)
            if (!queCount) {
              this.ajaxCreateLoading(false)
            }
          }
        },
        /*
        ajax失败的消息（发送的信息有误）,默认失败事件（ajaxError）fun=>fun
        *
        * */
        ajaxError (isLoadingFun) {
          if (!isLoadingFun) {
            isLoadingFun = function () {}
          }
          return (error) => {
            if (error.response) {
              isLoadingFun(false)
              queCount--
              if (!queCount) {
                this.ajaxCreateLoading(false)
              }
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              util.handleAjaxError(this, error.response.status + '')

              // console.log(error.response.status)
              // console.log(error.response.headers)
            } else if (error.request) {
              isLoadingFun(false)
              queCount--
              if (!queCount) {
                this.ajaxCreateLoading(false)
              }
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              this.errorMess(error.request)
            } else {
              isLoadingFun(false)
              queCount--
              if (!queCount) {
                this.ajaxCreateLoading(false)
              }
              // Something happened in setting up the request that triggered an Error
              this.errorMess(error.message)
            }
            // this.errorMess(error.config)
          }
        },
        /*
        核心ajax处理事件 (fun,fun)=>obj
        * @params params obj    自定义数据包含一些自定义信息 如{paramsData:'listUrl',ajaxSuccess:'updateListData',ajaxParams:{url:'/role/list?name=&identify=&type=',}}
        *  @param isLoadingFun  function  如果是 自定义按钮组件 点击提交事件 则会传回操作按钮是否显示loading函数（true取消loading）
        * */
        ajax (params, isLoadingFun) {
          if (queCount === 0) {
            this.ajaxCreateLoading(true)
          }
          queCount++
          params = this.getParams(params)
          let {ajaxParams, messTitle, ajaxError} = params
          let that = this
          let myPromise = that.Promise(ajaxParams).then(that.conductSuccess(messTitle, isLoadingFun)).catch(ajaxError(isLoadingFun))
          return myPromise
        },
        // 处理将要发送的ajax数据和可变数据
        getParams (messTitle) {
          return {
            ajaxParams: messTitle.ajaxParams,
            messTitle: messTitle,
            ajaxError: ((messTitle.ajaxError && this[messTitle.ajaxError]) || this.ajaxError) || (() => {
            })
          }
        },
        // 为ajax异步请求加载添加loading
        ajaxCreateLoading (flag) {
          // this.$store.dispatch('onLoading',flag)
          if (flag) {
            this.$Loading.start()
          } else {
            this.$Loading.finish()
          }
        },
        /*
        * 对表单数据的时间进行转换
        * @params  data    obj|array  需要转换的数据源
        * @parans fn        fun||string  操作的方法或字符串模板，yyyy-mm
        * @parans targer   array  需要操作的对象的名
        * */
        formDate (data, targer, fn) {
          let length = targer.length
          let that = this
          let isObject = this.valDataType(data, 'Object')
          if (isObject) {
            for (let i = 0; i < length; i++) {
              if (typeof fn === 'string') {
                data[targer[i]] = this.conductDate(data[targer[i]], fn)
              } else {
                fn = fn || this.yearMonthData || function () {
                }
                data[targer[i]] = fn(data[targer[i]])
              }
            }
            return data
          }
          this.$util._.forEach(data, function (value) {
            for (let i = 0; i < length; i++) {
              if (typeof fn === 'string') {
                value[targer[i]] = that.conductDate(value[targer[i]], fn)
              } else {
                fn = fn || that.yearMonthData || function () {
                }
                value[targer[i]] = fn(value[targer[i]])
              }
            }
          })
          return data
        },
        /*
        * 将字符串时间转换为时间戳
        * @param date  {String}  例如:201-08-01
        * */
        parseTimestamp (date) {
          let timestamp
          if (navigator.userAgent.indexOf('Firefox') > 0) {
            // 解决火狐兼容性问题
            date && (date = date + 'T09:00:00')
            timestamp = date ? Date.parse(date) : new Date().getTime()
          } else {
            timestamp = date ? new Date(date).getTime() : new Date().getTime()
          }
          return timestamp
        },
        /*
        //如果传过来的为字符串模板，则使用此函数处理
        * @params    date    obj||string
        * @params    format    string        yyyy-MM-dd HH:mm:ss.SSS
        *
        *
        * */
        parseDate (date, format) {
          return parseDate(date, format)
        },
        conductDate (date, format) {
          date = formatDate(date, format)
          return date
        },
        /*
        * 对表单数据的时间进行转换
        * @parans date   string|obj  操作的方法
        * @return 199-02-12格式的时间
        * */
        yearMonthData (date) {
          if (typeof date !== 'object') return date
          let datetime = new Date(date)
          let year = datetime.getFullYear()
          let month = datetime.getMonth() + 1
          let D = date.getDate() + ''
          if (month < 10) {
            month = '0' + month
          }
          if (D < 10) {
            D = '0' + D
          }
          return year + '-' + month + '-' + D
        },
        /*
        * 对表单数据的时间进行转换
        * @parans date   string|obj  操作的方法
        * @return 19902格式的时间
        * */
        yearMonth (date) {
          if (!date) return ''
          if (typeof date !== 'object') {
            if (typeof date === 'number') {
              date = date + ''
              let year = date.substring(0, 4)
              let month = date.substring(date.length - 2, date.length)
              date = year + '-' + month
            } else {
              date = date.split('-')
              date = date[0] + date[1]
            }
            return date
          } else {
            let datetime = new Date(date)
            let year = datetime.getFullYear()
            let month = datetime.getMonth() + 1
            if (month < 10) {
              month = '0' + month
            }
            return +(year + '' + month)
          }
        },
        /*
        * 判断数据类型
        * @param obj  {}||[]  各种数据类型
        * @param type string  例如: Object String Array等数据类型
        * @return flag boolean 是否为要验证的数据类型
        * */
        valDataType (obj, type) {
          let flag = false
          switch (type) {
            case 'String':
              obj.constructor === String ? flag = true : flag = false
              break
            case 'Array':
              obj.constructor === Array ? flag = true : flag = false
              break
            case 'Boolean':
              obj.constructor === Boolean ? flag = true : flag = false
              break
            case 'Date':
              obj.constructor === Date ? flag = true : flag = false
              break
            case 'Object':
              obj.constructor === Object ? flag = true : flag = false
              break
            default:
              alert(type + ':不支持的数据类型验证')
              break
          }
          return flag
        },
        // 从获取的Res中挑选出需要的名值对
        getFormValidate (data, res) {
          let length = arguments.length
          var arr = Array.prototype.slice.call(arguments, 2)

          if (length < 2) return data
          var obj = {}
          this.$util._.forEach(data, function (val, key) {
            obj[key] = res[key]
          })

          if (length >= 3) obj = this.getFormValidate.apply(this, [].concat(obj, arr))
          return obj
        },
        /*
        * 验证对象所有的值是否为空
        * @param obj {}  需要验证的对象
        * @param arr []  需要过滤的值
        * @return boolean
        * */
        objValIsEmpty (obj, arr) {
          let flag = false
          let count = 0
          let isObject = this.valDataType(obj, 'Object')
          let len = arr.length
          if (isObject) {
            for (let i = 0; i < len; i++) {
              if (obj[arr[i]] === '' || typeof obj[arr[i]] === 'undefined') {
                count++
              }
            }
          }
          if (arr.length === count) {
            flag = true
          }
          return flag
        },
        /*
            * 将对象的所有值或指定key设置为空
            * @param obj {}  需要设置的对象
            * @param arr []  需要清空的对象中的key值
            * @return obj
            * */
        setObjValEmpty (obj, arr) {
          let isObject = this.valDataType(obj, 'Object')
          if (isObject) {
            if (arr) {
              if (!this.valDataType(obj, 'Array')) return
              for (var i = 0; i < arr.length; i++) {
                obj[arr[i]] = ''
              }
            } else {
              _.forEach(obj, function (v, key) {
                obj[key] = ''
              })
            }
          }
          return obj
        },
        /**
             * 获取静态资源访问路径
             * @param path
             * @returns {*|string}
             */
        getStaticPath (path) {
          return (path && (this.$store.getters['app/envs']('resourceHttp') + path)) || ''
        },
        /**
         * 获取支付结果
         *
         * **/
        getPayResult (orderNo) {
          this.PayResult = false
          let opt = {
            ajaxSuccess: res => {
              this.PayResult = res.data
              return this.PayResult
            },
            ajaxParams: {
              url: '/pay/getPayResult',
              method: 'get',
              params: {
                orderNo: orderNo
              }
            }
          }
          this.ajax(opt)
        },
        /**
         * 获取当前用户姓名
         * @param type 优先获取类型
         * ***/
        getUserName (type) {
          let nameStr = ''
          if (this.$store.getters['app/isLogin']) {
            type === 'nickname' ? this.$store.getters['user/info']('nickname') ? nameStr = this.$store.getters['user/info']('nickname') : nameStr = this.$store.getters['user/info']('name') : nameStr = this.$store.getters['user/info']('name')
          }
          return nameStr
        }
      },

      beforeDestroy () {
        this.$util.events.removeHandler(window, 'resize', this.getContentHeight || this.setTableDynHeight)
      },

      components: {
        // 子组件
        uploadFile,
        modalHeader,
        loadBtn,
        todoComfirm
      }
    })
  }

}
export let utils = util
