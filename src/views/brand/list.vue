<template>
    <div>
        <div>
            <el-container>
                <el-header style="">
                    <div style="margin-top: 15px;">
                        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
                            <el-select v-model="select" slot="prepend" placeholder="请选择">
                                <el-option label="品牌名" value="1"></el-option>
                                <el-option label="业态" value="2"></el-option>
                                <el-option label="品牌联系人" value="3"></el-option>
                            </el-select>
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </div>
                </el-header>
                <el-main>
                    <el-table
                        ref="multipleTable"
                        :data="brand_list.results"
                        tooltip-effect="dark"
                        :stripe="true"
                        style="width: 100%"
                        :default-sort="{prop: 'name', order: 'classfy'}"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            label="商家名称"
                            width="120"
                            prop="name"
                            sortable
                        >
                            <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
                        </el-table-column>
                        <el-table-column
                            prop="classfy"
                            label="业态"
                            sortable
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="principal"
                            label="联系人"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="phone"
                            label="联系电话"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="status" label="状态" min-width="130" :formatter="formatStatus" sortable>
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="操作"
                            width="100">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                                <el-button type="text" size="small">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-main>
            </el-container>

        </div>
    </div>
</template>

<script>
export default {
  name: 'brand_list',
  data () {
    return {
      brand_list: [],
      input3: '',
      select: ''
    }
  },
  methods: {
    formatStatus: function (row, column) {
      return row.status === 'onSale' ? '在线' : '待上线'
    },
    get_brand_list () {
      let api = this.$Request
      api.setResource('brand')
      let para = {}
      api.getList(para).then(res => {
        if (res.data.code === 200) {
          this.brand_list = res.data.data
        }
      }).catch()
    },
    handleSelectionChange () {

    },
    handleClick (row) {
      alert(JSON.stringify(row))
    }
  },
  mounted () {
    this.get_brand_list()
  }
}
</script>

<style scoped>
    .el-select .el-input {
        width: 130px;
    }

    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
</style>
