import axios from 'axios'
import router from '../router'
import qs from 'qs'
import { baseUrl, baseRedirectUrl, appId } from '../config/env'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers['Accept'] = 'application/prs.district.v1+json'
axios.defaults.withCredentials = false
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token = localStorage.getItem('access_token')
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config
}, function (error) {
  // Do something with request error
  // console.log(error)
  return Promise.reject(error)
})

function getRefreshToken () {
  // print('TRYING TO GET TOKEN...')
  return axios({
    url: baseUrl + 'authorizations/update',
    method: 'post'
  })
}

axios.interceptors.response.use(function (response) {
  // Do something with response data
  // console.log(response)
  return response
}, function (error) {
  if (error.response.status === 401 && error.config && !error.config.__isRetryRequest) {
    let accessToken = localStorage.getItem('access_token')

    console.log(router.currentRoute)
    if (!accessToken && router.currentRoute.meta.auth === 1) {
      let redirect = router.currentRoute.fullPath
      let redirectUri = baseRedirectUrl + '/wechat.html'
      let oauthUrl = 'http://wxgw.yklsh.etonepay.com/authorize?etone_id=' + appId + '&redirect_uri=' + encodeURIComponent(redirectUri) + '&scope=snsapi_userinfo&state=' + encodeURIComponent(redirect)
      window.location.href = oauthUrl
      return Promise.reject(error)
    }

    error.config.__isRetryRequest = true
    return getRefreshToken()
      .then(function (success) {
        localStorage.setItem('access_token', success.data.access_token)
        error.config.__isRetryRequest = true
        error.config.headers.Authorization = 'Bearer ' + success.data.access_token
        return axios(error.config)
      })
      .catch(function (err) {
        console.log('Refresh login error: ', err)
        if (router.currentRoute.meta.auth === 1) {
          let redirect = router.currentRoute.fullPath
          let redirectUri = baseRedirectUrl + '/wechat.html'
          let oauthUrl = 'http://wxgw.yklsh.etonepay.com/authorize?etone_id=' + appId + '&redirect_uri=' + encodeURIComponent(redirectUri) + '&scope=snsapi_userinfo&state=' + encodeURIComponent(redirect)
          window.location.href = oauthUrl
        }
        return Promise.reject(error)
      })
  } else {
    return Promise.reject(error)
  }
  // Do something with response error
  // console.log(error.response)
  // console.log(router.currentRoute)
  // console.log(error.config)
  // if (error.response && error.response.status === 401 && router.currentRoute.meta.auth === 1) {
  //   let redirect = router.currentRoute.fullPath
  //   let redirectUri = baseRedirectUrl + '/wechat.html'
  //   let oauthUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId + '&redirect_uri=' + encodeURIComponent(redirectUri) + '&response_type=code&scope=snsapi_userinfo&state=' + encodeURIComponent(redirect) + '#wechat_redirect'
  //   window.location.href = oauthUrl
  // }
})

export default class http {
  constructor (store, api) {
    var baseApi = baseUrl
    this.baseApi = baseApi
    this.api = api // 全部接口
    // if (store) {
    //   this.store = store
    //   this.userAuth()
    // }
  }
  get (url, data, isNeedBaseUrl) {
    var options = {
      url: !isNeedBaseUrl ? this.baseApi + url : url,
      data: data || {},
      method: 'get'
    }
    return this.request(options)
  }
  post (url, data) {
    var postUrl = this.baseApi
    if (url) {
      postUrl += url
    }
    var options = {
      url: postUrl,
      data: qs.stringify(data),
      method: 'post'
    }
    return this.request(options)
  }
  all (array) {
    var promiseAll = Promise.all(array)
    return promiseAll
  }
  request (options) {
    var promise = new Promise((resolve) => {
      axios(options)
        .then((result) => {
          resolve(result.data)
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            resolve(error.response.data)
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            resolve({status: '6000', msg: '网络出错啦:' + error.request})
          } else {
            // Something happened in setting up the request that triggered an Error
            resolve({status: '6001', msg: '网络出错啦:' + error.message})
          }
          resolve({status: '6002', msg: '服务器崩溃啦:' + error.message})
        })
    })
    return promise
  }
  userAuth () { // 会员登录认证
    axios.interceptors.response.use(response => {
      // console.log(response)
      // if (response.status == 200 && response.data.return_code == '1001' && router.currentRoute.meta.auth == 1 && !router.currentRoute.query.auth) {
      //   // 清除登录信息
      //   this.store.commit('set_user_bind_status', 0)
      //   this.store.commit('set_user_login_status', 0)
      //   this.store.commit('set_user_info', {});
      //   router.replace({
      //     path: '/login',
      //     query: {redirect: router.currentRoute.fullPath}
      //   })
      //   return response
      // }
      return response
    })
  }
}
