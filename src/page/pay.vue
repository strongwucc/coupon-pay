<template>
  <div class="pay-page">
    <div class="store">
      <img src="../assets/img/pay/icon_dianpu@2x.png"/>
      <span>{{store_name}}</span>
    </div>
    <div class="money-title">付款金额</div>
    <div class="money">
      <div class="currency-icon">￥</div>
      <div class="money-value">{{total_amount}}</div>
    </div>
    <div class="coupon-tab" @click.stop.prevent="showCoupons">
      <div class="label">优惠券</div>
      <div class="content">
        <span v-if="coupons.length > 0 && discount_amount === ''" class="number">{{coupons.length}}张</span>
        <span v-if="coupons.length > 0 && discount_amount !== ''" class="discount">-￥{{discount_amount}}</span>
        <span v-if="coupons.length === 0" class="no-coupon">暂无可用优惠券</span>
        <img src="../assets/img/pay/icon_arrow_right@2x.png"/>
      </div>
    </div>
    <div class="pay-money">
      <span class="txt">需付金额 ￥</span><span class="amount">{{final_amount}}</span>
    </div>
    <div class="keyboard">
      <div class="key" @click.stop.prevent="num('1')">1</div>
      <div class="key" @click.stop.prevent="num('2')">2</div>
      <div class="key" @click.stop.prevent="num('3')">3</div>
      <div class="key revoke" @click.stop.prevent="revoke"><img src="../assets/img/pay/icon_revoke@2x.png"/></div>
      <div class="key" @click.stop.prevent="num('4')">4</div>
      <div class="key" @click.stop.prevent="num('5')">5</div>
      <div class="key" @click.stop.prevent="num('6')">6</div>
      <div class="key pay confirm-empty" :class="{'active': total_amount !== ''}" @click.stop.prevent="goPay"></div>
      <div class="key" @click.stop.prevent="num('7')">7</div>
      <div class="key" @click.stop.prevent="num('8')">8</div>
      <div class="key" @click.stop.prevent="num('9')">9</div>
      <div class="key pay confirm-pay" :class="{'active': total_amount !== ''}" @click.stop.prevent="goPay"><span>确认</span><span>付款</span></div>
      <div class="key" @click.stop.prevent="decimal">.</div>
      <div class="key" @click.stop.prevent="zero">0</div>
      <div class="key" @click.stop.prevent="doubleZero">00</div>
      <div class="key pay confirm-empty" :class="{'active': total_amount !== ''}" @click.stop.prevent="goPay"></div>
    </div>
    <div class="mask" v-show="visible" @click.stop.prevent="visible = false"></div>
    <transition name="slide">
      <div class="coupons" v-show="visible">
        <div class="title"><span class="padding"></span><span class="txt">可用优惠券</span><img src="../assets/img/pay/icon_off@2x.png" @click.stop.prevent="visible = false"/></div>
        <div ref="couponsWrapper" class="coupons-wrapper" v-if="coupons.length > 0">
          <ul class="wrapper-content">
            <li class="item" v-for="(coupon, couponIndex) in coupons" :key="couponIndex">
              <div class="li_left">
                <div class="coupon_icon">
                  <div class="title">
                    <span class="currency" v-if="coupon.card_type !== 'DISCOUNT'">￥</span>
                    <span class="number">
                    <template v-if="coupon.card_type === 'DISCOUNT'">{{((100 - coupon.discount) / 10)|formatMoney(0)}}</template>
                    <template v-else>{{coupon.reduce_cost|formatMoney(0)}}</template>
                  </span>
                    <span class="zhe" v-if="coupon.card_type === 'DISCOUNT'">折</span>
                  </div>
                  <div class="label">
                    <template v-if="coupon.card_type === 'CASH'">代金券</template>
                    <template v-else-if="coupon.card_type === 'DISCOUNT'">折扣券</template>
                    <template v-else-if="coupon.card_type === 'GIFT'">礼品券</template>
                    <template v-else-if="coupon.card_type === 'FULL_REDUCTION'">满减券</template>
                  </div>
                </div>
                <div class="coupon_text">
                  <p class="coupon-name">{{coupon.title|longStrFormat(7)}}</p>
                  <p class="use_merchant">
                    <template v-if="coupon.merchants.length > 0">
                      {{coupon.merchants[0].mer_name|longStrFormat(9)}}
                    </template>
                    <template v-else>适用所有商户</template>
                  </p>
                  <p class="expired-time">{{coupon.begin_date_time}}-{{coupon.end_date_time}}</p>
                </div>
              </div>
              <div class="l_right">
                <div v-if="couponIndex === checkedIndex" class="action used" @click.stop.prevent="cancelCoupon(couponIndex)">取消使用</div>
                <div v-else class="action unused" @click.stop.prevent="useCoupon(couponIndex)">立即使用</div>
                <div class="notice" v-if="coupon.left_days <=3 && coupon.left_days >= 0">{{coupon.left_days|expiredNotice}}</div>
              </div>
              <div class="border-up"></div>
              <div class="border-down"></div>
            </li>
            <li class="padding"></li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { getRect } from '../../src/assets/js/dom'
import { LoadMore } from 'vux'
import { getBaseUrl } from '../config/env'
export default {
  name: 'pay',
  components: {LoadMore},
  inject: ['reload'], // 引入方法
  data () {
    return {
      store_bn: '',
      store_name: '',
      open_id: '',
      total_amount: '',
      discount_amount: '',
      visible: false,
      coupons: [
        // {
        //   qrcode: '12121212121212',
        //   card_type: 'DISCOUNT',
        //   discount: 10,
        //   least_cost: 0,
        //   reduce_cost: 0,
        //   title: '9折券',
        //   merchant: '星巴克',
        //   begin_date_time: '2018.05.06',
        //   end_date_time: '2019.05.06',
        //   dated: 0,
        //   use_status: '0',
        //   left_days: 4
        // },
        // {
        //   qrcode: '12121212121212',
        //   card_type: 'CASH',
        //   discount: 0,
        //   least_cost: 0,
        //   reduce_cost: 10,
        //   title: '10元代金券',
        //   merchant: '星巴克',
        //   begin_date_time: '2018.05.06',
        //   end_date_time: '2019.05.06',
        //   dated: 0,
        //   use_status: '0',
        //   left_days: 4
        // },
        // {
        //   qrcode: '12121212121212',
        //   card_type: 'FULL_REDUCTION',
        //   discount: 0,
        //   least_cost: 100,
        //   reduce_cost: 10,
        //   title: '10元满减券',
        //   merchant: '星巴克',
        //   begin_date_time: '2018.05.06',
        //   end_date_time: '2019.05.06',
        //   dated: 0,
        //   use_status: '0',
        //   left_days: 4
        // },
        // {
        //   qrcode: '12121212121212',
        //   card_type: 'DISCOUNT',
        //   discount: 10,
        //   least_cost: 0,
        //   reduce_cost: 0,
        //   title: '9折券',
        //   merchant: '星巴克',
        //   begin_date_time: '2018.05.06',
        //   end_date_time: '2019.05.06',
        //   dated: 0,
        //   use_status: '0',
        //   left_days: 4
        // },
        // {
        //   qrcode: '12121212121212',
        //   card_type: 'CASH',
        //   discount: 0,
        //   least_cost: 0,
        //   reduce_cost: 10,
        //   title: '10元代金券',
        //   merchant: '星巴克',
        //   begin_date_time: '2018.05.06',
        //   end_date_time: '2019.05.06',
        //   dated: 0,
        //   use_status: '0',
        //   left_days: 4
        // },
        // {
        //   qrcode: '12121212121212',
        //   card_type: 'FULL_REDUCTION',
        //   discount: 0,
        //   least_cost: 100,
        //   reduce_cost: 10,
        //   title: '10元满减券',
        //   merchant: '星巴克',
        //   begin_date_time: '2018.05.06',
        //   end_date_time: '2019.05.06',
        //   dated: 0,
        //   use_status: '0',
        //   left_days: 4
        // }
      ],
      pageLimit: 3,
      currentPage: 0,
      totalPage: 1,
      scroll: '',
      pullUp: true,
      showLoading: false,
      scrolling: false,
      checkedIndex: -1
    }
  },
  computed: {
    final_amount: function () {
      let totalAmount = isNaN(parseFloat(this.total_amount)) ? 0.00 : parseFloat(this.total_amount)
      let discountAmount = isNaN(parseFloat(this.discount_amount)) ? 0.00 : parseFloat(this.discount_amount)
      let finalAmount = this.NP.minus(totalAmount, discountAmount)

      return finalAmount >= 0 ? finalAmount : 0
    }
  },
  watch: {
    total_amount: function (newValue, oldValue) {
      if (this.checkedIndex >= 0) {
        this.useCoupon(this.checkedIndex)
      }
    }
  },
  created () {
    if (this.$route.params.storeBn) {
      this.store_bn = this.$route.params.storeBn
    }
  },
  mounted () {
    this.getStoreInfo()
  },
  destroyed () {
  },
  methods: {
    getStoreInfo () {
      // 从接口获取
      this.$http.post(this.API.getStoreInfo, {storeBn: this.store_bn}).then(result => {
        if (result.return_code === '0000') {
          if (result.data.openId === '') {
            window.location.href = getBaseUrl + 'index.php/openapi/promotion_offapi/authorize?storeBn=' + this.store_bn
            return false
          }
          this.store_name = result.data.storeName
          this.open_id = result.data.openId
          this.getCounpon()
          return true
        } else {
          this.$vux.toast.show({
            type: 'text',
            text: '<span style="font-size: 14px;padding: 0 10px">门店信息获取失败</span>',
            position: 'middle'
          })
          return false
        }
      })
    },
    getCounpon () {
      this.$http.post(this.API.getCounpon, {}).then(result => {
        if (result.return_code === '0000') {
          // console.log(result.data.length)
          this.coupons = result.data
        } else {
          this.$vux.toast.show({
            type: 'text',
            text: '<span style="font-size: 14px;padding: 0 10px">优惠券获取失败</span>',
            position: 'middle'
          })
          return false
        }
      })
    },
    num (number) {
      if (this.total_amount.length >= 10) {
        return false
      }
      this.total_amount = this.total_amount + number
    },
    revoke () {
      this.total_amount = this.total_amount.substring(0, this.total_amount.length - 1)
    },
    decimal () {
      if (this.total_amount === '') {
        this.total_amount = '0.'
      }
      let exist = false
      for (var i = 0; i < this.total_amount.length; i++) {
        if (this.total_amount[i] === '.') {
          exist = true
          break
        }
      }
      if (exist) {
        return false
      }
      this.total_amount = this.total_amount + '.'
    },
    zero () {
      if (this.total_amount === '') {
        this.total_amount = '0'
        return true
      }
      let allZero = true
      for (var i = 0; i < this.total_amount.length; i++) {
        if (this.total_amount[i] !== '0') {
          allZero = false
          break
        }
      }
      if (allZero) {
        return false
      }
      this.total_amount = this.total_amount + '0'
    },
    doubleZero () {
      if (this.total_amount === '') {
        return false
      }
      let allZero = true
      for (var i = 0; i < this.total_amount.length; i++) {
        if (this.total_amount[i] !== '0') {
          allZero = false
          break
        }
      }
      if (allZero) {
        return false
      }
      this.total_amount = this.total_amount + '00'
    },
    showCoupons () {
      this.visible = true
      this.$nextTick(() => {
        this.initScroll()
      })
    },
    useCoupon (couponIndex) {
      let totalAmount = isNaN(parseFloat(this.total_amount)) ? 0.00 : parseFloat(this.total_amount)
      if (totalAmount <= 0.00) {
        this.discount_amount = ''
        this.$vux.toast.show({
          type: 'text',
          text: '<span style="font-size: 14px;padding: 0 10px">请您输入付款金额</span>',
          position: 'middle'
        })
        return false
      }
      let coupon = this.coupons[couponIndex]
      if (coupon === undefined) {
        this.discount_amount = ''
        this.$vux.toast.show({
          type: 'text',
          text: '<span style="font-size: 14px;padding: 0 10px">数据出错啦</span>',
          position: 'middle'
        })
        return false
      }
      if (coupon.card_type === 'DISCOUNT') {
        this.discount_amount = this.NP.times(totalAmount, this.NP.divide(coupon.discount, 100))
      } else {
        if (coupon.least_cost > 0 && coupon.least_cost > totalAmount) {
          this.discount_amount = ''
          this.$vux.toast.show({
            type: 'text',
            text: '<span style="font-size: 14px;padding: 0 10px">未达到最低消费金额，不能使用哦</span>',
            position: 'middle'
          })
          return false
        }
        this.discount_amount = coupon.reduce_cost
      }
      this.visible = false
      this.checkedIndex = couponIndex
      return true
    },
    cancelCoupon (couponIndex) {
      this.discount_amount = ''
      this.visible = false
      this.checkedIndex = -1
      return true
    },
    goPay () {
      let totalAmount = isNaN(parseFloat(this.total_amount)) ? 0.00 : parseFloat(this.total_amount)
      let code = this.checkedIndex >= 0 && this.coupons[this.checkedIndex] ? this.coupons[this.checkedIndex].qrcode : ''
      this.$vux.loading.show({})
      this.$http.post(this.API.createOrder, {amount: totalAmount, code: code, storeBn: this.store_bn}).then(res => {
        this.$vux.loading.hide()
        if (res.return_code === '0000') {
          window.location.href = res.data.pay_url
        } else {
          this.$vux.toast.show({
            type: 'text',
            text: '<span style="font-size: 14px;padding: 0 10px">哎呀，付款出错啦！</span>',
            position: 'middle'
          })
          return false
        }
      })
    },
    // 初始化滚动
    initScroll () {
      if (!this.$refs.couponsWrapper) {
        return
      }
      this.$refs.couponsWrapper.style.minHeight = `${getRect(this.$refs.couponsWrapper).height + 1}px`
      let options = {
        probeType: 1,
        click: true,
        pullUpLoad: true
      }
      this.scroll = new BScroll(this.$refs.couponsWrapper, options)
    },
    refresh () {
      // 代理better-scroll的refresh方法
      this.scroll && this.scroll.refresh()
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
  .slide-enter-active, .slide-leave-active {
    transition: transform .3s ease;
    transform: translateY(0);
  }
  .slide-enter, .slide-leave-active {
    transform: translateY(100%);
  }
  .pay-page {
    height: 100%;
    background:rgba(255,255,255,1);
    .store {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 25px;
      img {
        width: 19px;
        height: 19px;
        margin-right: 6px;
      }
      span {
        font-size:16px;
        font-weight:bold;
        color:rgba(51,51,51,1);
      }
    }
    .money-title {
      margin: 25px 26px 0;
      font-size:14px;
      font-weight:500;
      color:rgba(153,153,153,1);
      text-align: left;
    }
    .money {
      margin: 10px 20px 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size:47.5px;
      font-weight:500;
      color:rgba(0,0,0,1);
      .money-value {
        text-align: left;
        position: relative;
        /*height: 35px;*/
        width: 100%;
      }
      /*.money-value:after {*/
        /*position: absolute;*/
        /*content: '';*/
        /*background-color: rgba(89,175,52,1);*/
        /*top: 0px;*/
        /*left: 0;*/
        /*width:1px;*/
        /*height:35px;*/
        /*animation:myopacity .8s infinite;*/
        /*-webkit-animation:myopacity .8s infinite;*/
      /*}*/
    }
    .coupon-tab {
      margin: 6px 20px 0;
      height: 49px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      color:rgba(153,153,153,1);
      border-top:1px solid rgba(204,204,204,.5);
      border-bottom:1px solid rgba(204,204,204,.5);
      .content {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 3px;
        .discount, .number {
          color:rgba(224,66,55,1);
        }
        img {
          margin-left: 3px;
          width: 14px;
          height: 14px;
        }
      }
    }
    .pay-money {
      margin: 16px 17px 0;
      text-align: right;
      font-size:16px;
      font-weight:500;
      color:rgba(89,175,52,1);
    }
    .keyboard {
      padding-left: 0px;
      position: absolute;
      bottom: 0;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      font-size:21.5px;
      font-weight:500;
      color:rgba(51,51,51,1);
      .key {
        width:93.5px;
        height:70px;
        line-height: 70px;
        text-align: center;
        border-top:.5px solid rgba(229,229,229,1);
        border-left:.5px solid rgba(229,229,229,1);
        &:nth-child(4n+1) {
          border-left: 0;
        }
      }
      .revoke {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 40px;
          width: 40px;
        }
      }
      .pay {
        background:rgba(89,175,52,.2);
        font-size:17.5px;
        font-weight:500;
        color:rgba(255,255,255,1);
        border: 0;
      }
      .confirm-pay {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span {
          width: 100%;
          height: 50%;
          line-height: 35px;
        }
      }
      .active {
        background:rgba(89,175,52,1);
      }
    }
    .mask {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      z-index: 9;
      background:rgba(0,0,0,.5);
    }
    .coupons {
      background:rgba(255,255,255,1);
      position: fixed;
      z-index: 99;
      width: 100%;
      bottom: 0;
      .title {
        height: 44px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .padding {
          width: 24px;
          height: 24px;
          margin-left: 10px;
        }
        .txt {
          font-size:16px;
          font-weight:bold;
          color:rgba(51,51,51,1);
        }
        img {
          width: 24px;
          height: 24px;
          margin-right: 10px;
        }
      }
      .coupons-wrapper{
        background:rgba(255,255,255,1);
        padding: 0 10px;
        height: 409px;
        overflow: hidden;
        .wrapper-content {
          padding-top: 5px;
          .item{
            position: relative;
            display: flex;
            width: 100%;
            height:120px;
            background:rgba(255,255,255,1);
            border:1px solid rgba(0,0,0,0);
            border-radius: 6px;
            box-shadow:0px 0px 7.5px rgba(0,0,0,0.1);
            margin-bottom: 10px;
            .li_left{
              display: flex;
              width: 250.5px;
              padding: 20px 0px 22px 0px;
              border-right:1px dashed rgba(221,221,221,1);
              .coupon_icon{
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 88px;
                height: 100%;
                /*margin-right: 5px;*/
                .title{
                  color: #E04237;
                  font-weight: bold;
                  display: flex;
                  justify-content: center;
                  align-items: baseline;
                  .currency {
                    font-size: 14px;
                  }
                  .number {
                    font-size: 30px;
                  }
                  .zhe {
                    font-size: 12px;
                  }
                }
                .label{
                  width: 40px;
                  height: 16px;
                  border:1px solid rgba(204,204,204,1);
                  border-radius:2px;
                  font-size:11px;
                  font-weight:400;
                  line-height:16px;
                  color:rgba(102,102,102,1);
                  opacity:0.99;
                }
              }
              .coupon_text{
                height: 100%;
                .coupon-name {
                  margin-top: 3px;
                  height:21px;
                  font-size:16px;
                  font-weight:bold;
                  line-height:21px;
                  color:rgba(51,51,51,1);
                  text-align: left;
                }
                .use_merchant, .expired-time{
                  height:16.5px;
                  font-size:11px;
                  font-weight:400;
                  line-height:16.5px;
                  color:rgba(153,153,153,1);
                  margin-top: 5.5px;
                  text-align: left;
                }
                .use_merchant {
                  margin-top: 10px;
                }
                .limit {
                  height:16.5px;
                  font-size:11px;
                  font-weight:400;
                  line-height:12px;
                  color:rgba(235,156,87,1);
                  margin-top: 5px;
                  text-align: left;
                }
              }
            }
            .l_right{
              position: relative;
              width: 100px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .money{
                position: relative;
                height:28px;
                font-size:10px;
                font-weight:400;
                line-height:28px;
                color:rgba(51,51,51,1);
                span {
                  font-size: 20px;
                  color: #F95349;
                }
              }
              .action {
                position: relative;
                width:65px;
                height:25px;
                background:rgba(89,175,52,1);
                border-radius:15px;
                text-align: center;
                line-height: 25px;
                font-size:12px;
                font-weight:400;
                color:rgba(255,255,255,1);
              }
              .need-buy {
                background:rgba(89,175,52,1);
              }
              .no-left {
                background:rgba(221,221,221,1);
              }
              .used {
                background:rgba(245,245,245,1);
                border:1px solid rgba(221,221,221,1);
                color:rgba(102,102,102,1);
              }
              .unused {
                background:rgba(247,255,243,1);
                border:1px solid rgba(89,175,52,1);
                color:rgba(89,175,52,1);
              }
              .used-icon, .expired-icon {
                width: 60px;
                height: 60px;
              }
              .notice {
                position: relative;
                height:16.5px;
                margin-top: 12px;
                line-height:16.5px;
                font-size:11px;
                font-weight:400;
                color:rgba(224,66,55,1);
              }
            }
            .border-up {
              position: absolute;
              top: -10px;
              left: 242.5px;
              width: 16px;
              height: 16px;
              border-radius: 8px;
              background:rgba(255,255,255,1);
              box-shadow:0px -2px 0px rgba(0,0,0,0.1) inset;
            }
            .border-down {
              position: absolute;
              bottom: -10px;
              left: 242.5px;
              width: 16px;
              height: 16px;
              border-radius: 8px;
              background:rgba(255,255,255,1);
              box-shadow:0px 2px 0px rgba(0,0,0,0.1) inset;
            }
          }
          .padding {
            height: 10px;
            width: 100%;
          }
        }
      }
    }
  }
</style>
