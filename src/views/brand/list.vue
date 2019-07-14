<template>
    <div>list</div>
</template>

<script>
export default {
  name: 'brand_list',
  data () {
    return {
      brand_list: []
    }
  },
  methods: {
    get_brand_list () {
      let api = this.$Request
      api.setResource('brand')
      let para = {}
      api.getList(para).then(res => {
        if (res.data.code === 200) {
          this.brand_list = res.data.data
        }
      }).catch()
    }
  },
  mounted () {
    this.get_brand_list()
  }
}
</script>

<style scoped>

</style>
