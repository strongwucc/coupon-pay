import Vue from 'vue'
import Router from 'vue-router'

const Pay = r => require.ensure([], () => r(require('@/page/pay')), 'pay') // 付款
const Waiting = r => require.ensure([], () => r(require('@/page/waiting')), 'waiting') // 付款结果查询
const PaySuccess = r => require.ensure([], () => r(require('@/page/pay_success')), 'pay_success') // 付款成功
const PayInvalid = r => require.ensure([], () => r(require('@/page/pay_invalid')), 'pay_invalid') // 付款无效
const PayFail = r => require.ensure([], () => r(require('@/page/pay_fail')), 'pay_fail') // 付款失败
const WeChat = r => require.ensure([], () => r(require('@/page/wechat')), 'wechat') // 微信授权
const Demo = r => require.ensure([], () => r(require('@/page/demo')), 'demo') // 示例

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    // {
    //   path: '/',
    //   redirect: '/pay'
    // },

    {
      path: '/pay/:storeBn',
      name: 'pay',
      component: Pay,
      meta: {
        auth: 0,
        title: '付款'
      }
    },

    {
      path: '/waiting/:orderBn',
      name: 'waiting',
      component: Waiting,
      meta: {
        auth: 0,
        title: '查询中'
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
    },

    {
      path: '/wechat',
      name: 'wechat',
      component: WeChat,
      meta: {
        auth: 0,
        title: '微信授权'
      }
    }

    // {
    //   path: '/demo',
    //   name: 'demo',
    //   component: Demo,
    //   meta: {
    //     auth: 0,
    //     title: '示例'
    //   }
    // }
  ]
})
