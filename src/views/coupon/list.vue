<template>
    <coupon-temp ref="coupon_temp"></coupon-temp>
</template>

<script>
import CouponTemp from '../../components/commen/coupon_temp'
export default {
  name: 'couponList',
  components: {CouponTemp},
  data () {
    return {
      business: 'ss'
    }
  },
  methods: {
    getBusiness: function () {
      this.$refs.coupon_temp.getAllCoupon('all')
    }
  },
  mounted () {
    // var business = sessionStorage.getItem('business');
    this.getBusiness()
  }
}
</script>

<style scoped>

</style>
