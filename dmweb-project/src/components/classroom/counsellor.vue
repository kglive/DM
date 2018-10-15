<template>
  <section id="counsellor">
    <div class="search-tools">
      <div class="tool-item">
        <el-input size="small" placeholder="请输入内容" prefix-icon="el-icon-search" v-model="search.con"></el-input>
      </div>
      <!--<div class="tool-item">-->
        <!--<el-select v-model="selectvalue" size="small" placeholder="请选择">-->
          <!--<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
        <!--</el-select>-->
      <!--</div>-->
      <div class="tool-item fr">
        <el-button title="添加辅导员" @click="addCounsellor.dialogFormVisible=true" size="small" type="success" icon="el-icon-plus" circle></el-button>
      </div>
    </div>
    <div class="counsellor-wrap">
      <el-table :data="counsellorList" stripe style="width: 100%">
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="sex" label="性别" width="50"></el-table-column>
        <el-table-column prop="code" label="代码"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="page.pageSize"
        :page-sizes="[10,15,20,30,50]"
        :total="page.total"></el-pagination>
    </div>
    <!--添加辅导员的弹窗-->
    <el-dialog :title="addCounsellor.addcounsellorCompTitle" :visible.sync="addCounsellor.dialogFormVisible" width="50%">
      <el-form :model="addCounsellor.counsellor" :rules="addCounsellor.rules" ref="addCounsellorForm" status-icon>
        <el-form-item label="辅导员姓名" :label-width="addCounsellor.formLabelWidth" prop="name">
          <el-input placeholder="请输入辅导员姓名" v-model="addCounsellor.counsellor.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="辅导员登录密码" :label-width="addCounsellor.formLabelWidth">
          <el-input type="password" placeholder="请输入辅导员登录密码" v-model="addCounsellor.counsellor.password" autocomplete="off"><template slot="append">{{ addCounsellor.counsellor.password }}</template></el-input>
        </el-form-item>
        <el-form-item label="辅导员编号" :label-width="addCounsellor.formLabelWidth" prop="code">
          <el-input placeholder="请输入辅导员编号" v-model="addCounsellor.counsellor.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="addCounsellor.formLabelWidth">
          <el-radio v-model="addCounsellor.counsellor.sex" label="0">female</el-radio>
          <el-radio v-model="addCounsellor.counsellor.sex" label="1">male</el-radio>
        </el-form-item>
        <el-form-item label="辅导员简述" :label-width="addCounsellor.formLabelWidth">
          <el-input placeholder="请输入辅导员简述" v-model="addCounsellor.counsellor.description" autocomplete="off" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCounsellor.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddCounsellor('addCounsellorForm')">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        page: {
          pageSize: 10,
          currenPage: 1,
          total: 0
        },
        search: {
          con: ''
        },
        addCounsellor: {
          dialogFormVisible: false,
          addcounsellorCompTitle: '添加辅导员',
          counsellor: {
            name: '',
            password: '654321',
            sex: '0',
            code: '',
            description: ''
          },
          rules: {
            name: [
              { required: true, message: '请输入辅导员姓名', trigger: 'blur' }
            ],
            code: [
              { required: true, message: '请输入辅导员编号', trigger: 'blur' }
            ]
          },
          formLabelWidth: '120px'
        },
        counsellorList: []
      }
    },
    mounted () {
      this.requestAllCounsellor();
    },
    methods: {
      // 提交添加辅导员的表单
      submitAddCounsellor (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$http.post('/api/counsellor/addsellor', this.addCounsellor.counsellor).then(response => {
              loading.close();
              let resData = response.data;
              if (resData.status == 0) {
                this.$message({type: 'success', message: resData.message});
                this.addCounsellor.dialogFormVisible = false;
                this.requestAllCounsellor();
              } else {
                this.$message({type: 'warning', message: resData.message});
              }
            }).catch(error => {
              loading.close();
              this.$message({type: 'error', message: error.message});
            });
          } else { return false; }
        });
      },
      // 获取辅导员列表
      requestAllCounsellor () {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$http.get('/api/counsellor/getAllCounsellor', {
          params: {
            currenPage: this.page.currenPage,
            pageSize: this.page.pageSize,
            search: this.search.con
          }
        }).then(response => {
          loading.close();
          let resData = response.data;
          if (resData.status == 0) {
            this.page.total = resData.data.total;
            this.counsellorList = resData.data.list;
          } else {
            this.$message({type: 'warning', message: resData.message || '列表获取失败！'});
          }
        }).catch(error => {
          loading.close();
          this.$message({type: 'error', message: error.message});
        });
      },
      // 列表翻页
      handleCurrentChange (val) {
        this.page.currenPage = val;
        this.requestAllCounsellor()
      },
      // 列表条数变化
      handleSizeChange (val) {
        this.page.pageSize = val;
        this.requestAllCounsellor();
      }
    }
  }
</script>

<style lang="scss">

</style>
