import {formatDate, parseDate} from './date'
import {utils as util} from './util'

const getVueObj = function (vue) {
  const typeNames = {
    // 声明全局类型描述文本
  }

  const filters = [ // 声明全局过滤器及回调函数
    { // 货币格式化
      name: 'money',
      call (value, n, str) { // n 保留小数点位数 | str 货币前缀 | 使用： 10 | money(3,'$') ===> $ 10.000
      // 如果是非Number类型的直接返回源字符串，否则按照过滤器格式处理
        return !isNaN(value) ? (str || '￥') + ' ' + (+value / 100).toFixed(typeof n === 'number' ? n : 2) : value / 100
      }
    },
    {// 默认图片
      name: 'isDefImg',
      call (value) {
        if (value) {
          return value
        }
        return '/static/image/physician.png'
      }
    },
    {
      name: 'formatSize',
      call (value) {
        let temp
        let init
        // let float
        if (!value) return '0KB'
        if (value < 1024) {
          return value + 'B'
        } else if (value < (1024 * 1024)) {
          temp = value / 1024
          temp = temp.toFixed(2)
          return temp + 'KB'
        } else if (value < (1024 * 1024 * 1024)) {
          init = (value / (1024 * 1024))
          // float = (value % (1024*1024))/1024;
          return init.toFixed(2) + 'MB'
          // +float.toFixed(2)+'KB';
        } else {
          init = (value / (1024 * 1024 * 1024))
          // float = (value % (1024*1024*1024))/(1024*1024);
          return init.toFixed(2) + 'GB'
          // + float.toFixed(2) + 'MB';
        }
      }
    },
    {
      name: 'formatUploadSize',
      call (value) {
        let temp
        let init
        if (!value) return '0KB'
        if (value < 1024) {
          return value + 'kB'
        } else if (value < (1024 * 1024)) {
          temp = value / 1024
          temp = temp.toFixed(2)
          return temp + 'MB'
        } else if (value < (1024 * 1024 * 1024)) {
          init = (value / (1024 * 1024))
          // float = (value % (1024*1024))/1024;
          return init.toFixed(2) + 'GB '
          // +float.toFixed(2)+'KB';
        }
      }
    },
    {
      name: 'formatLength',
      // 格式化时长
      call (value) {
        let temp
        let init
        if (!value) return '0秒'
        if (value < 60) {
          return value + '秒'
        } else if (value < (60 * 60)) {
          init = parseInt(value / 60)
          temp = (value % 60)
          return init + '分' + temp + '秒'
        } else {
          init = parseInt(value / (60 * 60))
          temp = parseInt((value % (60 * 60)) / 60)
          // float = (value % (1024*1024))/1024;
          return init + '时' + temp + '分'
        }
      }
    },
    {
      name: 'formatTimes',
      // 格式化时长
      call (value) {
        let h = '00'
        let m = '00'
        let s = '00'
        h = parseInt(value / 3600)
        m = parseInt((value - h * 3600) / 60)
        s = (value - h * 3600 - m * 60).toFixed(0)
        return `${h}:${m}:${s}`
      }
    },
    {
      name: 'formatFen',
      // 格式化时长为分钟
      call (value) {
        let s = '0'
        s = (value / 60).toFixed(2)
        return `${s}`
      }
    },
    {
      name: 'formatHours',
      // 传入毫秒数，得到时间字符串
      call (value) {
        let temp
        let init
        let mm
        if (!value || value < 0) return '00:00:00'
        if (value < 1000 * 60) {
          return '00:00:' + value
        } else if (value < (1000 * 60 * 60)) {
          init = parseInt(value / 60 / 1000)
          temp = (value % 60)
          return '00:' + init + ':' + temp
        } else {
          init = parseInt(value / (1000 * 60 * 60))
          temp = parseInt((value / (1000 * 60)) % 60)
          mm = parseInt((value / 1000) % 60)
          return init + ':' + temp + ':' + mm
        }
      }
    },
    {
      name: 'getStr',
      // 传入字符串分割为数组
      call (value, fileterName) {
        let list = []
        if (!value) {
          return '-'
        } else {
          value.split(',').map(item => list.push(typeNames[fileterName][item.toLocaleUpperCase()]))
        }
        return list.join('、')
      }
    },
    {
      name: 'getArrText', // 获取数组中的指定属性的值
      call (arr, key) {
        let list = []
        if (arr && arr instanceof Array) {
          arr.map(item => list.push(item[key]))
        }
        return list.join('、') || '-'
      }
    },
    {
      name: 'answerCode', // 文本转数组(1|2==>A、B)
      call (str, splitStr = '|', joinStr = '、') {
        let s = str.toString()
        let list = ((s && s.split(splitStr)) || [])
        let code = []
        list.map(index => code.push(String.fromCharCode(+index + 65)))
        return code.join(joinStr) || '-'
      }
    },
    {
      name: 'getCharCode', // 获取选项的索引字母
      call (index) {
      // A、B、C...
        return String.fromCharCode(+index + 65)
      }
    },
    { // 移除html标签
      name: 'delHtmlTag',
      call (html) {
        let resultStr = ''
        if (html) {
          resultStr = html.replace(/<[^>]+>/g, '') // 去掉html
          resultStr = resultStr.replace(/\\ +/g, ' ') // 多个空格转为一个空格
          // resultStr = resultStr.replace(/[ ]/g, '');    //去掉空格
          resultStr = resultStr.replace(/[\r\n]/g, '') // 去掉回车换行
        }
        return resultStr
      }
    },
    {
      // 字符串截取
      name: 'sliceText',
      call (val, len = 10, str = '') {
        let temp = ((val && val.slice(0, len)) || val)
        return val.length > len ? temp + str : val
      }
    },
    {
      name: 'formatTime',
      call (value, str) {
        return getDateDiff(value, str)
      }
    },
    { // 时间格式化
      name: 'formatDate',
      /**
         * @param {any} value 需要处理的时间数据
         * @param {any} format 字符模版 yyyy-MM-dd HH:mm:ss.SSS
         * @returns
         */
      call (value, format) {
        return typeof date === 'string' ? parseDate(value, format) : formatDate(value, format)
      }
    },
    {
      name: 'diffLevelCode',
      // 这里的第二个参数必须传vue实例
      call (val, $vue) {
        if (!typeNames.projectDiffLevelObj) {
          let temp = {}
          let obj = $vue.$store.getters['app/envs']('questionDiffMap')
          for (let key in obj) {
            temp[key.toLocaleUpperCase()] = obj[key]
          }
          typeNames.projectDiffLevelObj = temp
        }
        return (((val && typeNames.projectDiffLevelObj instanceof Object) && typeNames.projectDiffLevelObj[val.toLocaleUpperCase()]) || val)
      }
    },
    {
      name: 'grade',
      // 这里的第二个参数必须传vue实例
      call (val, $vue) {
        if (util._myVue) {
          $vue = util._myVue
        }
        if (!typeNames.gradeObj) {
          let temp = {}
          let list = $vue.$store.getters['app/envs']('gradeList')
          list.map(item => {
            temp[item.code] = item.name
          })
          typeNames.gradeObj = temp
        }
        return (typeNames.gradeObj instanceof Object && typeNames.gradeObj[val]) || val
      }
    }]

  function getDateDiff (dateTimeStamp, str) {
    let minute = 1000 * 60
    let hour = minute * 60
    let day = hour * 24
    // let halfamonth = day * 15
    let month = day * 30

    let now = new Date().getTime()
    let diffValue = now - dateTimeStamp

    let result = ''
    if (diffValue < 0) {
      // 若日期不符则弹出窗口告之
      // alert('结束日期不能小于开始日期！');
    }
    let monthC = diffValue / month
    let weekC = diffValue / (7 * day)
    let dayC = diffValue / day
    let hourC = diffValue / hour
    let minC = diffValue / minute
    if (monthC >= 1) {
      result = str + parseInt(monthC) + '个月前'
    } else if (weekC >= 1) {
      result = str + parseInt(weekC) + '周前'
    } else if (dayC >= 1) {
      result = str + parseInt(dayC) + '天前'
    } else if (hourC >= 1) {
      result = str + parseInt(hourC) + '个小时前'
    } else if (minC >= 1) {
      result = str + parseInt(minC) + '分钟前'
    } else {
      result = '刚刚'
    }
    return result
  }

  // 全局注册自定义过滤器
  filters.map(item => vue.filter(item.name, item.call)) // 在应用中直接通过name使用
  Object.keys(typeNames).map(item => vue.filter(item, function (value) { // 在应用中直接通过typeNames中的对象名使用
    if (typeof value === 'number' || typeof value === 'string') {
      // 如果描述文本中没有匹配的则返回原字符
      return typeNames[item][value.toString().toUpperCase()] || value
    }
    return value
  }))
}

export default getVueObj
