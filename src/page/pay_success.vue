<template>
  <div class="pay-success-page" ref="paySuccessPage">
    <div class="page-content">
      <div class="success-icon"><img src="../assets/img/pay_success/icon_jiaoyi_success@2x.png"/></div>
      <div class="notice">支付成功</div>
      <div class="payed">￥{{order.total_amount + order.discount | formatMoney(2)}}</div>
      <div class="line"></div>
      <div class="tab merchant"><span class="label">收款方</span><span class="txt">{{order.merchant}}</span></div>
      <div class="tab total-amount"><span class="label">订单金额</span><span class="txt">￥{{order.total_amount | formatMoney(2)}}</span></div>
      <div class="tab discount"><span class="label">已使用优惠劵</span><span class="txt">-￥{{order.discount | formatMoney(2)}}</span></div>
      <div class="line"></div>
      <div class="tab order"><span class="label">订单编号</span><span class="txt">{{order.order_id}}</span></div>
      <div class="tab trans-time"><span class="label">交易时间</span><span class="txt">{{order.trans_time | toDate}}</span></div>
      <div class="close" @click.stop.prevent="rePay">关闭</div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { getStore } from '../utils/storge'
import { getRect } from '../../src/assets/js/dom'
export default {
  name: 'pay_success',
  components: {},
  inject: ['reload'], // 引入方法
  data () {
    return {
      orderId: '',
      order: {
        order_id: '99904081600012180925184009510',
        total_amount: '28.000',
        payed: '8.00',
        discount: '20.000',
        trans_time: '2018-05-02 11:24:27',
        merchant: '星巴克(合川路店)'
      },
      scroll: ''
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    if (this.$route.params.orderId) {
      this.orderId = this.$route.params.orderId
    }
  },
  mounted () {
    this.queryOrder()
  },
  destroyed () {
  },
  methods: {
    // 初始化滚动
    initScroll () {
      if (!this.$refs.paySuccessPage) {
        return
      }
      this.$refs.paySuccessPage.style.minHeight = `${getRect(this.$refs.paySuccessPage).height + 1}px`
      let options = {
        probeType: 1,
        click: true,
        pullUpLoad: false
      }
      this.scroll = new BScroll(this.$refs.paySuccessPage, options)
    },
    refresh () {
      // 代理better-scroll的refresh方法
      this.scroll && this.scroll.refresh()
    },
    queryOrder () {
      this.$http.post(this.API.orderQuery, {orderId: this.orderId}).then(result => {
        if (result.return_code === '0000' && result.data.pay_status === '1') {
          this.order.order_id = this.orderId
          this.order.total_amount = result.data.total_amount
          this.order.discount = result.data.pmt_order
          this.order.trans_time = result.data.last_modified
          this.order.merchant = result.data.store_name
        }
        this.$nextTick(() => {
          this.initScroll()
        })
      })
    },
    rePay () {
      let storeBn = getStore('storeBn')
      this.$router.push({'path': '/pay/' + storeBn})
    }
  }
}
</script>

<style lang="less">
  @import "../assets/css/common";
  @keyframes myopacity
  {
    from {opacity:1;}
    to {opacity:0;}
  }

  /*Safari 和 Chrome:*/
  @-webkit-keyframes myopacity
  {
    from {opacity:1;}
    to {opacity:0;}
  }
  .pay-success-page {
    height: 100%;
    background:rgba(255,255,255,1);
    .page-content {
      height: 100%;
      .success-icon {
        padding-top: 35px;
        height: 86px;
        img {
          width: 51px;
          height: 51px;
        }
      }
      .notice {
        margin-top: 20px;
        font-size:16px;
        font-weight:bold;
        color:rgba(51,51,51,1);
      }
      .payed {
        margin: 10.5px 0 20px;
        height: 42px;
        line-height: 42px;
        font-size:30px;
        font-weight:500;
        color:rgba(0,0,0,1);
      }
      .line {
        width:345px;
        height:0px;
        background:rgba(229,229,229,1);
        border:.5px solid rgba(229,229,229,.5);
        margin-left: 14px;
      }
      .tab {
        padding: 0 15px;
        height: 37px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size:13px;
        font-weight:500;
        line-height:37px;
        color:rgba(51,51,51,1);
        .label {
          color:rgba(153,153,153,1);
        }
      }
      .discount {
        color:rgba(224,66,55,1);
        .label {
          color:rgba(224,66,55,1);
        }
      }
      .close {
        position: fixed;
        left: 50%;
        bottom: 64px;
        transform: translate(-120px);
        width:240px;
        height:44px;
        border:.5px solid rgba(89,175,52,1);
        border-radius:22px;
        font-size:15px;
        font-weight:500;
        line-height:44px;
        color:rgba(89,175,52,1);
      }
    }
  }
</style>
