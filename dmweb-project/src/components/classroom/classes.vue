<template>
  <section id="classes">
    <div class="con-top-bar">
      <el-tooltip v-for="(item, index) in classesList" :key="index" class="item" effect="dark" :content="item.code" placement="top">
        <span @click="handleTabs(item)" :class="{active: item.id == currentClass.id}" class="nav-bar-item">{{ item.name}}</span>
      </el-tooltip>
      <el-button title="添加班级" @click="handleAddClasses" size="small" type="success" icon="el-icon-plus" circle></el-button>
    </div>
    <div class="search-tools">
      <div class="tool-item">
        <el-input size="small" placeholder="请输入内容" prefix-icon="el-icon-search" v-model="search.con"></el-input>
      </div>
      <div class="tool-item">
        <el-select v-model="search.counsellorid" size="small" placeholder="按辅导员筛选">
          <el-option v-for="item in counsellorList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="tool-item fr">
        <el-button title="添加成员" @click="addstudent.dialogFormVisible = true" size="small" type="success" icon="el-icon-plus" circle></el-button>
      </div>
    </div>
    <section id="classes-wrap">
      <div class="left-table">
        <el-table v-loading="loading"
          :highlight-current-row="true"
          :data="studentList" max-height="480" stripe style="width: 100%"
          @selection-change="handleTableSelectChange"
          @current-change="handleTableCurrentChange">
          <el-table-column type="selection" fixed width="45"></el-table-column>
          <el-table-column prop="code" fixed label="学号" width="150"></el-table-column>
          <el-table-column prop="name" label="姓名" width="120"></el-table-column>
          <el-table-column prop="status" label="状态" width="120"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handlePageSizeChange"
          @current-change="handlePageCurrentChange"
          :current-page="page.currenPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total">
        </el-pagination>
      </div>
      <div class="right-detail">
        <div v-if="showCurrentStudent" class="stu-detail">
          <img :src="showCurrentStudent.gravatar" width="200" height="300" :alt="showCurrentStudent.name">
        </div>
        <div v-else class="other-adv">
          nothing
        </div>
      </div>
    </section>
    <!--添加班级的弹窗-->
    <el-dialog :title="addClasses.addclassCompTitle" :visible.sync="addClasses.dialogFormVisible" width="50%">
      <el-form :model="addClasses.classes" :rules="addClasses.rules" ref="addClassesForm" status-icon>
        <el-form-item label="班级名称" :label-width="addClasses.formLabelWidth" prop="name">
          <el-input placeholder="请输入班级名称" v-model="addClasses.classes.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级编号" :label-width="addClasses.formLabelWidth" prop="code">
          <el-input placeholder="请输入班级编号" v-model="addClasses.classes.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级辅导员" :label-width="addClasses.formLabelWidth" prop="counsellorid">
          <el-select v-model="addClasses.classes.counsellorid" placeholder="请选择班级辅导员">
            <el-option v-for="item in counsellorList" :key="item.id" :label="item.name+'/'+item.code" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级简述" :label-width="addClasses.formLabelWidth" prop="description">
          <el-input placeholder="请输入班级简述" v-model="addClasses.classes.description" autocomplete="off" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addClasses.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddClass('addClassesForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!--添加成员的弹窗-->
    <el-dialog id="addstudent-form" :title="`${addstudent.addstudentCompTitle} - ${currentClass.name}`" :visible.sync="addstudent.dialogFormVisible" width="75%">
      <el-tabs v-model="addstudent.activeName" @tab-click="handleClick">
        <el-tab-pane label="单个录入" name="onlyone">
          <el-form :rules="addstudent.rules" status-icon ref="addstudentForm" :model="addstudent.userone">
            <el-form-item label="姓名" :label-width="addstudent.formLabelWidth" prop="name">
              <el-input v-model="addstudent.userone.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="addstudent.formLabelWidth" prop="sex">
              <el-radio v-model="addstudent.userone.sex" label="0">female</el-radio>
              <el-radio v-model="addstudent.userone.sex" label="1">male</el-radio>
            </el-form-item>
            <el-form-item label="学号" :label-width="addstudent.formLabelWidth" prop="code">
              <el-input v-model.number="addstudent.userone.code" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" :label-width="addstudent.formLabelWidth" prop="phone">
              <el-input v-model.number="addstudent.userone.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="QQ" :label-width="addstudent.formLabelWidth" prop="qq">
              <el-input v-model.number="addstudent.userone.qq" autocomplete="off"></el-input>
            </el-form-item><br>
            <el-form-item class="avatar-item" label="照片" :label-width="addstudent.formLabelWidth">
              <el-upload
                class="avatar-uploader"
                :action="addstudent.avatar.action"
                :headers="addstudent.avatar.headers"
                :name="addstudent.avatar.field"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="addstudent.avatar.imgUrl" :src="addstudent.avatar.imgUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="批量导入" name="more">
          <el-form :model="addstudent.userone">
            <el-form-item label="添加文件" :label-width="addstudent.formLabelWidth">
              <el-button>添加文件</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addstudent.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addstudentSubmit('addstudentForm')">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import { requestUrl } from '../../config/config';
  export default {
    data () {
      return {
        search: {
          con: '',
          counsellorid: ''
        },
        classesList: [],
        // tab 当前选中的班级
        currentClass: {id: ''},
        counsellorList: [],
        loading: false,
        studentList: [
          {
            id: '123',
            name: 'xingmig',
            code: '123123',
            status: 0
          }
        ],
        page: {
          total: 0,
          currentPage: 1,
          pageSize: 10
        },
        // 当前查看的学生的信息
        showCurrentStudent: null,
        // 添加成员的弹窗数据
        addstudent: {
          dialogFormVisible: false,
          addstudentCompTitle: '添加班级学生',
          activeName: 'onlyone',
          userone: {
            name: '',
            sex: '0',
            code: '',
            phone: '',
            qq: ''
          },
          formLabelWidth: '100px',
          avatar: {
            action: `${requestUrl}/api/gravatar`,
            headers: { Authorization: window.localStorage.getItem('token') },
            field: this.Const.onlyOneFileField,
            imgUrl: '',
            path: null
          },
          rules: {
            name: [
              { required: true, message: '请输入学生姓名', trigger: 'blur' }
            ],
            sex: [
              { required: true, message: '请选择性别', trigger: 'change' }
            ],
            code: [
              { required: true, message: '请输入学生学号', trigger: 'blur' }
            ],
            phone: [
              { required: true, message: '请输入学生联系电话号码', trigger: 'blur' }
            ],
            qq: [
              { required: true, message: '请输入学生QQ号码', trigger: 'blur' }
            ]
          }
        },
        // 添加班级
        addClasses: {
          addclassCompTitle: '添加班级',
          dialogFormVisible: false,
          classes: {
            name: '',
            code: '',
            description: '',
            counsellorid: ''
          },
          formLabelWidth: '120px',
          rules: {
            name: [
              { required: true, message: '请输入班级名称', trigger: 'blur' }
            ],
            code: [
              { required: true, message: '请输入班级编号', trigger: 'blur' }
            ],
            counsellorid: [
              { required: true, message: '请选择班级辅导员', trigger: 'change' }
            ],
            description: [
              { required: true, message: '请输入班级简述', trigger: 'blur' }
            ]
          }
        }
      }
    },
    mounted () {
      this.requestAllClasses();
      this.requestAllCounsellor();
    },
    methods: {
      init () {
        return new Promise((resolve, reject) => {
          resolve();
        });
      },
      // 当选择项发生变化时会触发该事件
      handleTableSelectChange (selection) {
        console.log('当选择项发生变化时会触发该事件', selection);

      },
      // 表格的当前行发生变化的时候会触发该事件
      handleTableCurrentChange (currentRow, oldCurrentRow) {
        console.log('表格的当前行发生变化的时候会触发该事件', currentRow, oldCurrentRow);
        this.showCurrentStudent = currentRow;
      },
      // 添加成员的弹窗的tab切换
      handleClick (tab, event) {
        console.log(tab, event);
      },
      // 添加班级的弹窗
      handleAddClasses () {
        this.addClasses.dialogFormVisible = true;
      },
      // 提交添加班级的表单
      submitAddClass (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$http.post('/api/classes/addclass', this.addClasses.classes).then(response => {
              loading.close();
              let resData = response.data;
              if (resData.status == 0) {
                this.$message({type: 'success', message: resData.message || '添加成功！'});
                this.addClasses.dialogFormVisible = false;
                this.requestAllClasses();
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
        this.$http.get('/api/counsellor/getAllCounsellor', {
          params: { currenPage: 1, pageSize: 10000 }
        }).then(response => {
          let resData = response.data;
          if (resData.status == 0) {
            this.counsellorList = resData.data.list;
          } else {
            this.$message({type: 'warning', message: resData.message || '辅导员列表获取失败！'});
          }
        }).catch(error => {
          this.$message({type: 'error', message: error.message});
        });
      },
      // 获取所有班级列表
      requestAllClasses () {
        this.loading = true;
        this.$http.get('/api/classes/getAllClasses').then(response => {
          // console.log(response);
          let resData = response.data;
          if (resData.status == 0) {
            this.classesList = resData.data;
            this.currentClass = resData.data[0];
            this.requestAllStudents();
          } else {
            this.$message({type: 'warning', message: resData.message});
          }
        }).catch(error => {
          this.$message({type: 'error', message: error.message});
        });
      },
      // 切换班级 tab
      handleTabs (obj) {
        this.currentClass = obj;
        this.requestAllStudents();
      },
      // 头像上传处理
      handleAvatarSuccess (response, file, fileList) {
        if (response.status == 0) {
          this.addstudent.avatar.imgUrl = URL.createObjectURL(file.raw);
          this.addstudent.avatar.path = response.data;
        } else {
          this.$message({type: 'error', message: '照片上传失败！请重试'});
        }
      },
      beforeAvatarUpload () { },
      // 提交添加单个学生的表单
      addstudentSubmit (formName) {
        let This = this;
        if (this.addstudent.avatar.path) {
          this.$refs[formName].validate(valid => {
            if (valid) {
              this.$http.post('/api/student/addstu', Object.assign({
                classid: this.currentClass.id,
                gravatar: this.addstudent.avatar.path.path
              }, this.addstudent.userone)).then(response => {
                let resData = response.data;
                if (resData.status == 0) {
                  this.$message({type: 'success', message: resData.message || '添加成功！', onClose () {This.$refs[formName].resetFields();}});
                } else {
                  this.$message({type: 'warning', message: resData.message || '添加失败！'});
                }
              }).catch(error => {
                this.$message({type: 'error', message: error.message});
              });
            } else { return false; }
          });
        } else {
         this.$message({type: 'warning', message: '请先上传照片'});
        }
      },
      // 获取学生列表
      requestAllStudents () {
        this.$http.get('/api/student/getAllStudentByClassid', {
          params: {
            classid: this.currentClass.id,
            search: this.search.con,
            currentPage: this.page.currentPage,
            pageSize: this.page.pageSize
          }
        }).then(response => {
          this.loading = false;
          // console.log('student list', response);
          let resData = response.data;
          if (resData.status == 0) {
            this.page.total = resData.data.total;
            this.studentList = resData.data.list;
            // this.$message({type: 'success', message: resData.message || '获取学生列表成功！'});
          } else {
            this.$message({type: 'warning', message: resData.message || '获取学生列表失败！'});
          }
        }).catch(error => {
          this.loading = false;
          this.$message({type: 'error', message: error.message});
        });
      },
      // 每页显示页数发生改变
      handlePageSizeChange (val) {
        this.page.pageSize = val;
        this.requestAllStudents();
      },
      // 当前页码发生改变
      handlePageCurrentChange (val) {
        this.page.currenPage = val;
        this.requestAllStudents();
      }
    },
    computed: {

    }
  }
</script>

<style lang="scss">
#classes-wrap {
  display: flex;
  .left-table {
    width: 61%;
    background-color: #fff;
  }
  .right-detail {
    margin-left: 5px;
    flex-grow: 1;
    background-color: #fff;
    height: 480px;
  }
}
#addstudent-form {
  .el-form-item {
    display: inline-block;
    &.avatar-item {
      .avatar-uploader .el-upload {
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        overflow: hidden;
        transition: all .3s ease;
        &:hover {
          border-color: #409eff;
        }
      }
      .avatar {
        width: 100px;
        height: 100px;
      }
    }
  }
  .el-input {
    width: 220px;

  }
}
</style>
