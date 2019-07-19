/**
 * 获取会员信息
 */

import Http from '../../utils/http'
import API from '../../utils/api'

let http = new Http()

export default {
  get_user_data ({commit, state}, router) {
    // let http = new Http();
    let userData = localStorage.getItem('user_data')
    let isLogin = localStorage.getItem('user_is_login')

    // 从本地缓存中先获取
    if (typeof userData !== 'undefined') {
      commit('set_user_info', JSON.parse(userData))
      commit('set_user_login_status', isLogin)
    }

    console.log(router)

    // 从接口获取
    http.post(API.getStoreInfo).then(result => {
      if (result.status_code === 401) {
        commit('set_user_login_status', 0)
        commit('set_user_info', {})
        isLogin = 0
      }
      if (result.member_id) {
        commit('set_user_login_status', 1)
        commit('set_user_info', result)
        isLogin = 1
      }
      // console.log(isLogin)
    })

    // 路由守卫
    router.beforeEach((to, from, next) => {
      if (to.meta.title) {
        document.title = to.meta.title
      }
      next()
    })
  }
}
