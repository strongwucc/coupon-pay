<template>
  <div class="center-page">
  </div>
</template>

<script>
export default {
  name: 'center',
  components: {},
  inject: ['reload'], // 引入方法
  data () {
    return {
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
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
  .center-page {
    height: 100%;
    background:rgba(255,255,255,1);
  }
</style>
