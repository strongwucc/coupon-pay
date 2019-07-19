<template>
  <div class="waiting-page">
    <div class="waiting-icon"><img src="../assets/img/waiting/icon_chaxun@2x.png"/></div>
    <div class="notice">付款结果 查询中，请稍等...</div>
  </div>
</template>

<script>
export default {
  name: 'waiting',
  components: {},
  inject: ['reload'], // 引入方法
  data () {
    return {
      order_id: '',
      query_timer: {}
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    if (this.$route.params.orderBn) {
      this.order_id = this.$route.params.orderBn
    }
  },
  mounted () {
    this.query_timer = setInterval(() => {
      this.queryOrder()
    }, 1000)
  },
  destroyed () {
    clearInterval(this.query_timer)
  },
  methods: {
    queryOrder () {
      this.$http.post(this.API.orderQuery, {orderId: this.order_id}).then(result => {
        console.log(result)
        if (result.return_code === '0000' && result.data.pay_status === '1') {
          clearInterval(this.query_timer)
          // this.$router.push({'path': '/pay_success/' + this.order_id})
          if (result.data.pmt_status === '1') {
            this.$router.push({'path': '/pay_success/' + this.order_id})
          } else {
            this.$router.push({'path': '/pay_invalid/' + this.order_id})
          }
          return true
        }
      })
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
  .waiting-page {
    height: 100%;
    background:rgba(246,246,246,1);
    .waiting-icon {
      padding-top: 103.5px;
      height: 273.5px;
      img {
        width: 170px;
        height: 170px;
      }
    }
    .notice {
      width: 125px;
      font-size:16px;
      font-weight:400;
      color:rgba(102,102,102,1);
      margin-left: 50%;
      transform: translate(-62.5px);
    }
  }
</style>
