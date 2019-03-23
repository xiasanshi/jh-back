<template>
    <div class="custom-tree-container">
        <div class="block">
            <p>使用 render-content</p>
            <el-tree
                :data="data"
                show-checkbox
                node-key="id"
                default-expand-all
                :expand-on-click-node="false"
                :render-content="renderContent">
            </el-tree>
        </div>
    </div>
</template>
<script>
import {User} from '../../api/api'
let user = new User()
export default {
  name: '',
  data () {
    return {
      data: [],
      listLoading: false
    }
  },
  methods: {
    getAllPerms () {
      this.listLoading = true
      let param = {}
      debugger
      user.getAllPerm(param).then((res) => {
        if (res.data.code === '2000') {
          this.listLoading = false
          let data1 = res.data.data
          for (let val of data1.values) {
            let tmp = new Map()
            tmp['label'] = val['description']
            tmp['id'] = val['id']
            this.data.push(tmp)
          }
          console.log(this.data)
        } else {
          this.listLoading = false
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        }
      })
    }
  },
  mounted () {
    this.getAllPerms()
  }
}
</script>

<style>
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>
