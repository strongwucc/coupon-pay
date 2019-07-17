/**
 * 会员信息
 */
export default {
  set_user_info: (state, info) => {
    state.user_info = info
    localStorage.setItem('user_data', JSON.stringify(info))
  },
  get_user_info (state) {
    var userInfo = localStorage.getItem('user_data')

    // 从本地缓存中先获取
    if (typeof userInfo === 'string') {
      state.user_info = JSON.parse(userInfo)
    }
  }
}
