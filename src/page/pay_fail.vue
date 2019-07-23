<template>
  <div class="pay-fail-page">
    <div class="fail-icon"><img src="../assets/img/pay_fail/icon_jiaoyi_fail@2x.png"/></div>
    <div class="notice">支付失败</div>
    <div class="intro">{{reason}}</div>
    <div class="repay" @click.stop.prevent="rePay">重新付款</div>
    <div class="close">关闭</div>
  </div>
</template>

<script>
export default {
  name: 'pay_fail',
  components: {},
  inject: ['reload'], // 引入方法
  data () {
    return {
      orderId: '',
      reason: '失败原因'
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
  .pay-fail-page {
    height: 100%;
    background:rgba(246,246,246,1);
    .fail-icon {
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
