import Vue from 'vue'
import Http from './http'
import NP from 'number-precision'
import { getBaseUrl as uploadUrl } from '../config/env'
// 保留两位有效数字
Vue.filter('formatMoney', function (value, status) {
  if (value == 'undefined' || value === '' || value == null) return 0
  value = parseFloat(value)
  if (status == 0) {
    return NP.round(value, 0)
  }
  if (status == 1) {
    return NP.round(value, 1)
  }
  return NP.round(value, 2)
})

// 保留两位有效数字且大于0的数字返回+
Vue.filter('formatMoneyAdd', function (value) {
  value = parseFloat(value)
  if (value > 0) {
    return '+' + NP.round(value, 2)
  }
  return NP.round(value, 2)
})

// 大于等于100 显示99+
Vue.filter('numHandle', function (num) {
  if (parseInt(num) >= 100) {
    num = '99+'
  }
  return num
})
// 输出年月日
Vue.filter('toDate', function (number, is_hfs) {
  var n = number * 1000
  var date = ''
  if (number === '') {
    date = new Date()
  } else {
    date = new Date(n)
  }
  var Y = date.getFullYear()
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
  var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
  var H = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours())
  var F = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes())
  var S = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds())

  if (is_hfs === 1) {
    return (Y + '-' + M + '-' + D)
  } else if (is_hfs === 2) {
    return (Y + '.' + M + '.' + D)
  } else if (is_hfs === 3) {
    return (Y + '-' + M + '-' + D + ' ' + H + ':' + F)
  } else if (is_hfs === 4) {
    return (Y + '.' + M + '.' + D + ' ' + D + ':' + F)
  }

  return (Y + '-' + M + '-' + D + ' ' + H + ':' + F + ':' + S)
})

// 年月日时分秒 转化为 年月日
Vue.filter('dataTime', function (time) {
  if (typeof time !== 'undefined') {
    time = time.substring(0, 10)
  }
  return time
})

// 输出图片路径编码
Vue.filter('picPath', function (path) {
  if (typeof path !== 'undefined' && path != '') {
    path = unescape(path)
  }
  return path
})

// 去除反斜杠
Vue.filter('addressformat', function (item) {
  if (typeof item === 'string') {
    item = item.replace(/[\\ \/=]/g, '')
  }
  return item
})

// 设置默认值
Vue.filter('setdefault', function (item, val) {
  if (typeof item === 'undefined' || item == '' || item == null) {
    return val
  }
  return item
})

// 把手机号处理加星
Vue.filter('mobileformat', function (item) {
  if (typeof item === 'string') {
    return item.substring(0, 3) + '****' + item.substring(8, 11)
  }
  return item
})

// 图片路径
Vue.filter('upload', function (item) {
  if (/^http(.*)$/.test(item)) {
    return item
  } else {
    return uploadUrl + item
  }
})

// 字符串超出n个字显示...
Vue.filter('longStrFormat', function (item, n) {
  if (item.length > n && n > 3) {
    item = item.substr(0, n - 1) + '...'
  }
  return item
})

// 分钟转化为 "xx小时xx分钟"
Vue.filter('minuteFormat', function (value) {
  var min = isNaN(parseInt(value)) ? 0 : parseInt(value)

  var hour = Math.floor(NP.divide(min, 60))
  var sec = NP.minus(min, NP.times(hour, 60))

  return hour + '小时' + sec + '分钟'
})

// 优惠券过期提示
Vue.filter('expiredNotice', function (value) {
  var days = isNaN(parseInt(value)) ? 0 : parseInt(value)
  var notice = ''
  switch (days) {
    case 0:
      notice = '今天即将过期'
      break
    case 1:
      notice = '明天即将过期'
      break
    case 2:
      notice = '将于两天后过期'
      break
    case 3:
      notice = '将于3天后过期'
      break
    default:
      break
  }
  return notice
})
