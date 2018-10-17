<template>
  <section id="classroom">
    <div class="search-tools">
      <div class="tool-item">
        <el-input size="small" placeholder="请输入内容" prefix-icon="el-icon-search" v-model="search.con"></el-input>
      </div>
      <div class="tool-item fr">
        <el-button title="添加课堂" @click="addClassroom.dialogFormVisible=true" size="small" type="success" icon="el-icon-plus" circle></el-button>
      </div>
    </div>
    <div class="classroom-wrap">
      <div class="list-item" v-loading="loading">
        <div class="item" v-for="(item, index) in classroomList" :key="index" >
          <a href="javascript:void(0);">
            <img :src="item.picture" :alt="item.name" :title="item.name">
            <div class="cover"></div>
          </a>
          <p class="name">{{ item.name }}</p>
          <p class="opa">
            <span class="number"><i class="el-icon-bell"></i> {{ item | computedNumber }}</span>
            <span class="period"><i class="el-icon-time"></i> {{ item.period }}</span>
          </p>
          <div class="actions">
            <div class="setting-item">
              <p><i class="el-icon-setting"></i></p>
              <ul>
                <li @click="editClassroom(item.id)" title="编辑课堂"><i class="el-icon-edit"></i></li>
                <li @click="addStudentToClassroom(item)" title="添加学生"><i class="el-icon-plus"></i></li>
                <li @click="addHandleAttendance(item)" title="新建考勤"><i class="el-icon-time"></i></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--添加课堂的弹窗-->
    <el-dialog id="addClassroom-form" :title="addClassroom.addclassroomCompTitle" :visible.sync="addClassroom.dialogFormVisible" width="75%">
      <el-form :model="addClassroom.classroom" :rules="addClassroom.rules" ref="addClassroomForm" status-icon>
        <el-form-item label="课堂名称" :label-width="addClassroom.formLabelWidth" prop="name">
          <el-input placeholder="请输入课堂名称" v-model="addClassroom.classroom.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课堂总课时" :label-width="addClassroom.formLabelWidth" prop="period">
          <el-input type="number" placeholder="请输入课堂总课时" v-model.number="addClassroom.classroom.period" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课堂编号" :label-width="addClassroom.formLabelWidth" prop="code">
          <el-input placeholder="请输入课堂编号" v-model="addClassroom.classroom.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课堂班级" :label-width="addClassroom.formLabelWidth">
          <el-select multiple v-model="addClassroom.classroom.classid" placeholder="请添加班级">
            <el-option v-for="item in addClassroom.classList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课堂老师" :label-width="addClassroom.formLabelWidth">
          <el-select multiple v-model="addClassroom.classroom.teacherid" placeholder="请添加课堂老师">
            <el-option v-for="item in addClassroom.teacherList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课堂开课时间段" :label-width="addClassroom.formLabelWidth" prop="daterange">
          <el-date-picker format="yyyy-MM-dd" value-format="timestamp" v-model="addClassroom.classroom.daterange" type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="课堂简述" :label-width="addClassroom.formLabelWidth" prop="description">
          <el-input placeholder="请输入课堂简述" v-model="addClassroom.classroom.description" autocomplete="off" type="textarea"></el-input>
        </el-form-item><br>
        <el-form-item class="avatar-item" label="封面" :label-width="addClassroom.formLabelWidth">
          <el-upload
            class="avatar-uploader"
            :action="addClassroom.avatar.action"
            :headers="addClassroom.avatar.headers"
            :name="addClassroom.avatar.field"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="addClassroom.avatar.imgUrl" :src="addClassroom.avatar.imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addClassroom.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddClassroom('addClassroomForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!--往课堂里添加学生的弹窗-->
    <el-dialog id="addStuToC-dialog" :title="addStuToClassroom.title" :visible.sync="addStuToClassroom.dialogFormVisible" width="80%">
      <div class="sel-class-btn">
        <el-select size="small" @change="handleGetStuByClassid" v-model="addStuToClassroom.addTags.classid" placeholder="请选择班级">
          <el-option v-for="item in addStuToClassroom.classList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-tag v-if="addStuToClassroom.addTags.classid" type="success"> {{transformToName}} - ( {{addStuToClassroom.addTags.selectValues.length}} )</el-tag>
      </div>
      <div style="text-align: center">
        <el-transfer
          v-loading="addStuToClassroom.loading"
          style="text-align: left; display: inline-block"
          v-model="addStuToClassroom.addTags.selectValues"
          filterable
          :left-default-checked="[2, 3]"
          :right-default-checked="[1]"
          :titles="['Source', 'Target']"
          :format="{
            noChecked: '${total}',
            hasChecked: '${checked}/${total}'
          }"
          @change="handleTransferChange"
          :data="addStuToClassroom.dataList">
          <span slot-scope="{ option }">{{ option.label }}</span>
          <!--<el-button class="transfer-footer" slot="left-footer" size="small">全选</el-button>-->
          <!--<el-button class="transfer-footer" slot="right-footer" size="small">清空</el-button>-->
        </el-transfer>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addStuToClassroom.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddStuToClassroom">确 定</el-button>
      </div>
    </el-dialog>
    <!--添加考勤任务-->
    <el-dialog title="新增考勤任务" :visible.sync="addAttendance.dialogFormVisible" width="50%">
      <el-form ref="addAttendanceForm" :rules="addAttendance.rules" status-icon :model="addAttendance.attendanceForm">
        <el-form-item label="考勤任务名称" :label-width="addAttendance.formLabelWidth" prop="name">
          <el-input placeholder="请输入此次考勤任务名称" v-model="addAttendance.attendanceForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="考勤老师" :label-width="addAttendance.formLabelWidth" prop="teacherid">
          <el-select v-model="addAttendance.attendanceForm.teacherid" placeholder="请选择考勤老师">
            <el-option v-for="(item, index) in addAttendance.teacherList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考勤时间" :label-width="addAttendance.formLabelWidth" required>
          <el-col :span="11">
            <el-form-item prop="starttime">
              <el-time-select
                placeholder="起始时间"
                v-model="addAttendance.attendanceForm.starttime"
                :picker-options="{ start: '06:30', step: '00:15', end: '22:30' }">
              </el-time-select>
            </el-form-item>
          </el-col>
          <!--<el-col class="line" :span="2">-</el-col>-->
          <el-col :span="11">
            <el-form-item prop="endtime">
              <el-time-select
                placeholder="结束时间"
                v-model="addAttendance.attendanceForm.endtime"
                :picker-options="{ start: '06:30', step: '00:15', end: '22:30', minTime: addAttendance.attendanceForm.starttime }">
              </el-time-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="考勤任务简述" :label-width="addAttendance.formLabelWidth">
          <el-input placeholder="请对此次考勤任务进行描述，方便以后查询搜索" type="textarea" v-model="addAttendance.attendanceForm.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="考勤任务备注" :label-width="addAttendance.formLabelWidth">
          <el-input placeholder="此次考勤任务的备注" v-model="addAttendance.attendanceForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAttendance.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddAttendance('addAttendanceForm')">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import { requestUrl } from '../../config/config';
  export default {
    data () {
      let checkPeriod = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('课堂课时不能为空'));
        }
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 0) {
            callback(new Error('课堂课时必须大于1'));
          } else {
            callback();
          }
        }
      };
      return {
        search: {
          con: ''
        },
        loading: false,
        classroomList: [],
        addClassroom: {
          dialogFormVisible: false,
          addclassroomCompTitle: '新增课堂',
          classroom: {
            classid: [],
            teacherid: [],
            name: '',
            code: '',
            description: '',
            period: 1,
            daterange: []
          },
          avatar: {
            action: `${requestUrl}/api/gravatar`,
            headers: { Authorization: window.localStorage.getItem('token') },
            field: this.Const.onlyOneFileField,
            imgUrl: '',
            path: null
          },
          rules: {
            name: [
              { required: true, message: '请输入课堂名称', trigger: 'blur' }
            ],
            code: [
              { required: true, message: '请输入课堂编号', trigger: 'blur' }
            ],
            period: [
              { required: true, validator: checkPeriod, trigger: 'blur' }
            ],
            daterange: [
              { required: true, message: '请选择课堂开课日期段', trigger: 'change' }
            ],
            description: [
              { required: true, message: '请输入课堂简述', trigger: 'blur' }
            ]
          },
          formLabelWidth: '120px',
          classList: [],
          teacherList: []
        },
        // 往课堂里添加学生的弹窗数据信息
        addStuToClassroom: {
          dialogFormVisible: false,
          title: '添加学生',
          originDataList: [],
          dataList: [],
          loading: false,
          classroomid: '',
          classList: [],
          addTags: {
            classid: '',
            selectValues: []
          }
        },
        // 添加考勤任务
        addAttendance: {
          dialogFormVisible: false,
          formLabelWidth: '120px',
          attendanceForm: {
            name: '',
            classroomid: '',
            starttime: '',
            endtime: '',
            teacherid: '',
            description: '',
            remark: ''
          },
          teacherList: [],
          rules: {
            name: [
              { required: true, message: '请输入此次考勤任务名称', trigger: 'blur' }
            ],
            teacherid: [
              { required: true, message: '请选择考勤老师', trigger: 'change' }
            ],
            starttime: [
              { required: true, message: '请选择起始时间', trigger: 'change' }
            ],
            endtime: [
              { required: true, message: '请选择结束时间', trigger: 'change' }
            ]
          }
        }
      }
    },
    mounted () {
      this.requestAllTeachers();
      this.requestAllClasses();
      this.requestAllClassroom();
    },
    computed: {
      ...mapState({
        vxTeacherList: state => state.classroom.allTeacherList,
        vxClassesList: state => state.classroom.allClassesList
      }),
      // 班级 id 转换班级名称
      transformToName () {
        let filterResult = this.addClassroom.classList.filter(item => item.id === this.addStuToClassroom.addTags.classid);
        return filterResult[0]['name'];
      }
    },
    methods: {
      ...mapMutations('classroom', [
        'setTeacherList',
        'setClassesList'
      ]),
      // 封面图片上传处理
      handleAvatarSuccess (response, file, fileList) {
        if (response.status == 0) {
          this.addClassroom.avatar.imgUrl = URL.createObjectURL(file.raw);
          this.addClassroom.avatar.path = response.data;
        } else {
          this.$message({type: 'error', message: '照片上传失败！请重试'});
        }
      },
      beforeAvatarUpload () { },
      // 获取老师列表
      requestAllTeachers () {
        // 先看 store 里面有没有老师列表数据，没有才去请求
        if (this.vxTeacherList.length) {
          this.addClassroom.teacherList = this.vxTeacherList;
        } else {
          this.$http.get('/api/teacher/getAllTeacher').then(response => {
            let resData = response.data;
            if (resData.status == 0) {
              this.addClassroom.teacherList = resData.data;
              this.setTeacherList(resData.data);
            } else {
              this.$message({type: 'warning', message: resData.message});
            }
          }).catch(error => {
            this.$message({type: 'error', message: error.message});
          });
        }
      },
      // 获取所有班级列表
      requestAllClasses () {
        if (this.vxClassesList.length) {
          this.addClassroom.classList = this.vxClassesList;
        } else {
          this.$http.get('/api/classes/getAllClasses').then(response => {
            let resData = response.data;
            if (resData.status == 0) {
              this.addClassroom.classList = resData.data;
              this.setClassesList(resData.data);
            } else {
              this.$message({type: 'warning', message: resData.message});
            }
          }).catch(error => {
            this.$message({type: 'error', message: error.message});
          });
        }
      },
      // 提交添加课程的表单
      submitAddClassroom (formName) {
        let This = this;
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$http.post('/api/classroom/addClassroom', Object.assign(this.addClassroom.classroom, {
              path: this.addClassroom.avatar.path.path
            })).then(response => {
              let resData = response.data;
              if (resData.status == 0) {
                this.$message({type: 'success', message: resData.message || '添加成功！', onClose () {This.$refs[formName].resetFields();}});
                this.requestAllClassroom();
              } else {
                this.$message({type: 'warning', message: resData.message || '添加失败！'});
              }
            }).catch(error => {
              this.$message({type: 'error', message: error.message});
            });
          } else { return false; }
        });
      },
      // 获取课堂列表
      requestAllClassroom () {
        this.loading = true;
        this.$http.get('/api/classroom/getAllClassroom').then(response => {
          this.loading = false;
          console.log('获取课堂列表', response);
          let resData = response.data;
          if (resData.status == 0) {
            this.classroomList = resData.data.list;
          } else {
            this.$message({type: 'warning', message: resData.message || '获取失败！'});
          }
        }).catch(error => {
          this.loading = false;
          this.$message({type: 'error', message: error.message});
        });
      },
      // 编辑课堂
      editClassroom (classroomid) {

      },
      // 往课堂里面添加学生
      addStudentToClassroom (classroom) {
        this.addStuToClassroom.classroomid = classroom.id;
        this.addStuToClassroom.classList = this.vxClassesList.filter(item => {
          for (let i = 0, id; id = classroom.classid[i]; i++) {
            if (id === item.id) {
              return item;
            }
          }
        });
        this.addStuToClassroom.dialogFormVisible = true;
      },
      // 添加学生的穿梭框 change 事件
      handleTransferChange (value, direction, movedKeys) {
        console.log(value, direction, movedKeys);
      },
      // 添加学生的穿梭框 选择班级 change
      handleGetStuByClassid () {
        this.addStuToClassroom.loading = true;
        this.$http.get('/api/student/getAllStudentByClassid', {
          params: {
            classid: this.addStuToClassroom.addTags.classid,
            search: '',
            currentPage: 1,
            pageSize: 500
          }
        }).then(response => {
          this.addStuToClassroom.loading = false;
          console.log('student list', response);
          let resData = response.data;
          if (resData.status == 0) {
            this.addStuToClassroom.originDataList = resData.data.list;
            const transfData = [];
            for (let i = 0, item; item = this.addStuToClassroom.originDataList[i]; i++) {
              transfData.push({
                key: item.id,
                label: `${ item.code } - ${ item.name }`,
                disabled: false
              });
            }
            this.addStuToClassroom.dataList = transfData;
            // this.$message({type: 'success', message: resData.message || '获取学生列表成功！'});
          } else {
            this.$message({type: 'warning', message: resData.message || '获取学生列表失败！'});
          }
        }).catch(error => {
          this.addStuToClassroom.loading= false;
          this.$message({type: 'error', message: error.message});
        });
      },
      // 提交往课堂里添加的学生
      submitAddStuToClassroom () {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$http.post('/api/classroom/addStudents', {
          classroomid: this.addStuToClassroom.classroomid,
          classid: this.addStuToClassroom.addTags.classid,
          studentids: this.addStuToClassroom.addTags.selectValues
        }).then(response => {
          loading.close();
          console.log(response);
          let resData = response.data;
          if (resData.status == 0) {
            if (resData.data.faillist.length == 0) {
              this.$message({type: 'success', message: resData.message || '添加成功！'});
            } else {
              this.$message({type: 'success', message: '部分添加成功！'});
            }
            // TODO 重新请求当前班级可添加的成员
            this.addStuToClassroom.addTags.classid = '';
            this.addStuToClassroom.addTags.selectValues = [];
          } else {
            this.$message({type: 'warning', message: resData.message || '添加失败！'});
          }
        }).catch(error => {
          loading.close();
          this.$message({type: 'error', message: error.message});
        });
      },
      // 新建考勤任务
      addHandleAttendance (obj) {
        console.log('addAttendance', obj);
        this.addAttendance.teacherList = obj.teacherList;
        this.addAttendance.attendanceForm.classroomid = obj.id;
        this.addAttendance.dialogFormVisible = true;
      },
      submitAddAttendance (formName) {
        let This = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('/api/attendance/addAttendance', this.addAttendance.attendanceForm).then(response => {
              let resData = response.data;
              if (resData.status === 0) {
                let msg = `请在 ${resData.data.starttime} ~ ${resData.data.endtime} 时间段完成 '${resData.data.name}' 的考勤任务`;
                this.$alert(msg, ' 考勤任务新建成功', {
                  confirmButtonText: '知道了',
                  type: 'success',
                  center: true,
                  callback: action => {
                    This.addAttendance.dialogFormVisible = false;
                  }
                });
              } else {
                this.$message({type: 'info', message: resData.message || '新建失败！'});
              }
            }).catch(error => {
              this.$message({type: 'error', message: '新建失败！'+error.message});
            });
          } else { return false; }
        });
      }
    },
    filters: {
      // 计算课堂总人数
      computedNumber (classroom) {
        let total = 0;
        for (let i = 0, item; item = classroom.classList[i]; i++) {
          total += item.number;
        }
        return total;
      }
    }
  }
</script>

<style lang="scss">
#classroom {
  .list-item {
    display: flex;
    flex-wrap: wrap;
    &::after {
      content: '';
      flex-grow: 99999999;
    }
    .item {
      flex-grow: 1;
      position: relative;
      width: 240px;
      vertical-align: bottom;
      object-fit: cover;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      overflow: hidden;
      margin: 5px;
      box-shadow: 0 1px 3px rgba(0,0,0,.02), 0 4px 8px rgba(0,0,0,.02);
      transition: transform .15s ease-in-out,box-shadow .15s ease-in-out;
      &:hover {
        box-shadow: 0 1px 3px rgba(0,0,0,.02), 0 16px 32px -4px rgba(0,0,0,.17);
        transform: translateY(-1px);
        .actions {
          display: block;
        }
      }
      .actions {
        display: none;
        position: absolute;
        top: 10px;
        left: 10px;
        .setting-item {
          width: 30px;
          line-height: 30px;
          text-align: center;
          color: #fff;
          -webkit-border-radius: 2px;
          -moz-border-radius: 2px;
          border-radius: 2px;
          cursor: pointer;
          overflow: hidden;
          p{
            height: 30px;
            background-color: #EC414D;
            border: 1px solid #EC414D;
            &:hover + ul {
              transform: scaleY(1);
            }
          }
          ul {
            width: 30px;
            background-color: #EC414D;
            border: 1px solid #EC414D;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            transform-origin: center top;
            transform: scaleY(0);
            transition: transform .15s ease-in;
            &:hover {
              transform: scaleY(1);
            }
            li {
              height: 30px;
              &:hover {
                background: #E31725;
                border-color: #E31725;
              }
            }
          }
        }
      }
    }
    a {
      position: relative;
      display: block;
      img {
        display: block;
        width: 100%;
        height: 170px;
      }
      .cover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: all .2s ease;
        &:hover {
          background-color: rgba(255,255,255,.1);
        }
      }
    }
    .name {
      display: block;
      padding: 0 16px;
      margin: 10px 0;
      line-height: 1.35em;
      overflow: hidden;
      word-wrap: break-word;
    }
    .opa {
      padding-bottom: 10px;
      span {
        margin: 0 10px;
        font-size: 14px;
      }
    }
  }
  #page {
    margin-top: 20px;
  }
  #addClassroom-form {
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
  #addStuToC-dialog {
    .sel-class-btn {
      margin: 0 auto 20px;
      text-align: center;
    }
    .el-transfer__buttons {
      padding: 0 70px;
    }
    .el-transfer-panel {
      width: 300px;
      .el-transfer-panel__list {
        overflow-y: auto;
        &::-webkit-scrollbar {
          width: 2px;
          height: 100%;
          border-radius: 1px;
          background: #424448;
        }
        &::-webkit-scrollbar-thumb {
          background: #a2a2a2;
          border-radius: 2px;
        }
      }
    }
  }
}
</style>
