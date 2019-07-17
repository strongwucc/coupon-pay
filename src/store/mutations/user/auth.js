/**
 * 会员登录状态
 */
export default {
  set_user_login_status: (state, status) => {
    state.user_auth.is_login = status
    localStorage.setItem('user_is_login', status)
  },
  set_user_bind_status: (state, status) => {
    state.user_auth.is_bind = status
    localStorage.setItem('user_is_bind', status)
  }
}
