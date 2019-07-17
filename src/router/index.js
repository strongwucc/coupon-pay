import Vue from 'vue'
import Router from 'vue-router'

const Pay = r => require.ensure([], () => r(require('@/page/pay')), 'pay') // 付款
const PaySuccess = r => require.ensure([], () => r(require('@/page/pay_success')), 'pay_success') // 付款成功
const PayInvalid = r => require.ensure([], () => r(require('@/page/pay_invalid')), 'pay_invalid') // 付款无效
const PayFail = r => require.ensure([], () => r(require('@/page/pay_fail')), 'pay_fail') // 付款失败

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/pay'
    },

    {
      path: '/pay',
      name: 'pay',
      component: Pay,
      meta: {
        auth: 0,
        title: '付款'
      }
    },

    {
      path: '/pay_success/:orderId',
      name: 'pay_success',
      component: PaySuccess,
      meta: {
        auth: 0,
        title: '付款结果'
      }
    },

    {
      path: '/pay_invalid/:orderId',
      name: 'pay_invalid',
      component: PayInvalid,
      meta: {
        auth: 0,
        title: '付款结果'
      }
    },

    {
      path: '/pay_fail/:orderId',
      name: 'pay_fail',
      component: PayFail,
      meta: {
        auth: 0,
        title: '付款结果'
      }
    }
  ]
})
