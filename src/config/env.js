/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */
let rootUrl = ''
let baseUrl = ''
let getBaseUrl = 'http://ceshi6.sdykt.com.cn:1280'
let appId = 'yt6eb45ebc33750e02'
let baseRedirectUrl = 'http://' + window.location.host

if (process.env.NODE_ENV === 'development') {
  // rootUrl = 'http://district.test'
  rootUrl = 'http://ceshi6.sdykt.com.cn:1280'
  baseUrl = rootUrl + '/sellerpok/index.php/openapi/promotion_offapi/'
  baseRedirectUrl = 'http://ceshi6.sdykt.com.cn:1280/coupon-pay'
  appId = 'yt6eb45ebc33750e02'
  getBaseUrl = 'http://ceshi6.sdykt.com.cn:1280/sellerpok/'
} else if (process.env.NODE_ENV === 'production') {
  rootUrl = 'http://' + window.location.host
  baseUrl = rootUrl + '/sellerpok/index.php/openapi/promotion_offapi/'
  baseRedirectUrl = 'http://' + window.location.host + '/coupon-pay/'
  // rootUrl = 'http://ceshi7.sdykt.com.cn:1280'
  // baseUrl = rootUrl + '/api/'
  // baseRedirectUrl = 'http://ceshi6.sdykt.com.cn:1280/business-district'
  appId = 'yt6eb45ebc33750e02'
  getBaseUrl = 'http://' + window.location.host
}

export {
  rootUrl,
  baseUrl,
  getBaseUrl,
  appId,
  baseRedirectUrl
}
