<template>
  <div class="pay-invalid-page">
    <div class="invalid-icon"><img src="../assets/img/pay_invalid/icon_jiaoyi_wuxiao@2x.png"/></div>
    <div class="notice">无效订单</div>
    <div class="intro">未使用邮政储蓄银行信用卡支付，不能参与优惠活动，已使用的优惠券及支付金额将原路径退回，请注意查收。</div>
    <div class="order">
      <span class="label">订单编号</span>
      <span class="txt">{{orderId}}</span>
    </div>
    <div class="repay" @click.stop.prevent="rePay">重新付款</div>
    <div class="close" @click.stop.prevent="rePay">关闭</div>
  </div>
</template>

<script>
import { getStore } from '../utils/storge'
export default {
  name: 'pay_invalid',
  components: {},
  inject: ['reload'], // 引入方法
  data () {
    return {
      orderId: ''
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
  },
  destroyed () {
  },
  methods: {
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
  .pay-invalid-page {
    height: 100%;
    background:rgba(246,246,246,1);
    .invalid-icon {
      padding-top: 93.5px;
      height: 143.5px;
      img {
        width: 51px;
        height: 51px;
      }
    }
    .notice {
      margin-top: 20px;
      height:22.5px;
      font-size:16px;
      font-weight:bold;
      line-height:22.5px;
      color:rgba(51,51,51,1);
    }
    .intro {
      padding: 15px 68.5px 0;
      font-size:13px;
      font-weight:400;
      color:rgba(102,102,102,1);
    }
    .order {
      display: flex;
      justify-content: space-between;
      font-size:13px;
      font-weight:400;
      color:rgba(153,153,153,1);
      .txt {
        color:rgba(51,51,51,1);
      }
      margin: 25px 15px 0;
      border-top: .5px solid rgba(229,229,229,1);
      padding-top: 20px;
    }
    .repay {
      position: fixed;
      left: 50%;
      bottom: 128px;
      transform: translate(-120px);
      width:240px;
      height:44px;
      background:rgba(89,175,52,1);
      border-radius:22px;
      font-size:15px;
      font-weight:500;
      line-height:44px;
      color:rgba(255,255,255,1);
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
</style>
