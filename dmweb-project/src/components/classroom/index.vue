<template>
  <section id="dianming">
    <div class="search-tools">
      <div class="tool-item">
        <el-select @change="handleSelClassroomChange" size="small" v-model="search.classroomid" placeholder="请选择课堂">
          <el-option v-for="item in classroomList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="tool-item">
        <el-select :disabled="!teacherList.length" size="small" v-model="search.teacherid" placeholder="请选择点名老师">
          <el-option v-for="item in teacherList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="tool-item">
        <el-select :disabled="!classesList.length" v-model="search.classesid" size="small" placeholder="请选择班级">
          <el-option v-for="item in classesList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="tool-item">
        <el-button type="success" size="small" icon="el-icon-search"></el-button>
      </div>
      <div class="tool-item fr">
        <el-button title="添加课堂" size="small" type="success" icon="el-icon-plus" circle></el-button>
      </div>
    </div>
    <div class="btn-list-arr">
      <el-button :disabled="search.classroomid === '' || search.classesid === '' || search.teacherid === ''" type="primary" plain @click="startAttendance">点 名</el-button>
      <el-button :disabled="search.classroomid === '' || search.classesid === '' || search.teacherid === ''" type="primary" plain>课堂记录</el-button>
      <div class="fr dm-class-msg">{{search.classroomid | transformClassroomName(classroomList)}} - {{search.classesid | transformClassName(classesList)}}</div>
    </div>
    <div id="dianming-wrap">
      <div class="tables">
        <div class="left-table">{{ vxNopasslist }}</div>
        <div class="right-detail">
          <div class="stu-msg"></div>
          <div class="analyze-map"></div>
        </div>
      </div>
    </div>
    <!--点名的弹窗-->
    <el-dialog
      id="attendance-dialog"
      :title="attendanceTitle"
      :before-close="handleCloseAttendance"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :visible.sync="attendance.dialogFormVisible" width="75%">
      <div v-if="attendance.attendanceBefore.length && attendance.attendanceing" class="attendance-picture">
        <div class="wrap-item">
          <div class="img">
            <img :src="attendance.attendanceing.gravatar" :alt="attendance.attendanceing.name" :title="attendance.attendanceing.name">
          </div>
          <div class="operation">
            <el-button type="danger" title="上一位" @click="prevChange" icon="el-icon-arrow-left"></el-button>
            <el-button type="danger" title="移出课堂" @click="removeClassroom" icon="el-icon-delete"></el-button>
            <el-button type="warning" title="稍后点名" @click="delayAttendance" icon="el-icon-time"></el-button>
            <el-select @change="handleReasonChange" v-model="attendance.attendanceing.attendanceValue" placeholder="选择未通过原因">
              <el-option v-for="item in vxReasonList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <el-button v-if="attendance.attendanceing.attendanceValue === 0 || attendance.attendanceing.attendanceValue === 5" @click="attendancePass" type="success" title="通过" icon="el-icon-check"></el-button>
            <el-button v-else type="danger" @click="attendanceNopass" title="不通过" icon="el-icon-close"></el-button>
            <el-button type="danger" title="下一位" @click="nextChange" icon="el-icon-arrow-right"></el-button>
          </div>
        </div>
      </div>
      <p v-else>暂无可点名的学生</p>
      <!--<div class="bar-tools" style="text-align: center">
        <el-button type="primary" title="点名" icon="el-icon-edit-outline"></el-button>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="attendance.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="attendance.dialogFormVisible = false">确 定</el-button>
      </div>-->
    </el-dialog>
  </section>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import { shuffle } from '../../lib/tools';
  export default {
    data () {
      return {
        teacherName: '',
        search: {
          teacherid: '',
          con: '',
          classroomid: '',
          classesid: ''
        },
        // 课堂列表
        classroomList: [],
        // 当前课堂中的班级列表
        classesList: [],
        // 当前课堂中的老师列表
        teacherList: [],
        // 课堂学生列表
        studentList: [],
        attendance: {
          title: '点名',
          dialogFormVisible: false,
          value: 0,
          // 正在点名的学生
          attendanceing: null,
          // 未点名的名单
          attendanceBefore: [],
          // 已点名的名单
          attendanceAfter: []
        }
      }
    },
    mounted () {
      this.requestAllClassroom();
    },
    computed: {
      ...mapState({
        vxNopasslist: state => state.rollcall.nopasslist,
        vxReasonList: state => state.rollcall.reasonList
      }),
      attendanceTitle () {
        let arrClassroom = this.classroomList.filter(item => this.search.classroomid === item.id);
        let arrClass = this.classesList.filter(item => this.search.classesid === item.id);
        let classroomName = arrClassroom.length ? arrClassroom[0].name : '未选择课堂';
        let className = arrClass.length ? arrClass[0].name : '未选择课堂';
        return `${classroomName} 课堂中 ${className} 正在点名`
      }
    },
    methods: {
      ...mapMutations('rollcall', [
        'setClassroom'
      ]),
      // 选择课堂改变 change 事件
      handleSelClassroomChange (val) {
        this.$http.get('/api/classroom/getTCByClassroom', {
          params: { classroomid: val }
        }).then(response => {
          let resData = response.data;
          if (resData.status == 0) {
            this.classesList = resData.data.classList;
            this.teacherList = resData.data.teacherList;
            this.studentList = resData.data.studentList.map(item => {
              // 点名状态 0：未点名|1：已点名
              item.attendanceStatus = 0;
              // 点名结果的状态值，正常、迟到、早退......
              item.attendanceValue = 0;
              // 点名结果的备注
              item.attendanceMark = '';
              return item;
            });
          }
        }).catch(error => {
          this.$message({type: 'error', message: error.message});
        });
      },
      requestAllClassroom () {
        this.$http.get('/api/classroom/getAllClassroom').then(response => {
          let resData = response.data;
          if (resData.status == 0) {
            this.classroomList = resData.data.list;
          } else {
            this.$message({type: 'warning', message: resData.message || '获取失败！'});
          }
        }).catch(error => {
          this.$message({type: 'error', message: error.message});
        });
      },
      // 开始点名
      startAttendance () {
        this.attendance.attendanceBefore = shuffle(this.studentList.filter(item => {
          let isInClass = item.classid === this.search.classesid;
          // 是否已点过名
          let isAttendanced = (_ => {
            let arr = this.attendance.attendanceAfter.filter(jtem => jtem.id === item.id);
            return !arr.length;
          })();
          return isInClass && isAttendanced;
        }));
        this.attendance.attendanceing = this.attendance.attendanceBefore.length ? this.attendance.attendanceBefore[0] : null;
        this.attendance.dialogFormVisible = true;
      },
      // 点名弹窗关闭之前的回调
      handleCloseAttendance (done) {
        this.$confirm('此操作将终止当前的点名, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // TODO 提交已点名的学生的点名数据
          done();
        }).catch(() => {
          this.$message({ type: 'info', message: '继续当前的点名' });
        });
      },
      // 学生移出课堂
      removeClassroom () {
        console.log('学生移出课堂', this.attendance.attendanceing);
        // TODO 移出课堂的接口
      },
      // 延迟点名
      delayAttendance () {
        console.log('延迟点名', this.attendance.attendanceing);
        this.nextChange();
      },
      // 点名通过
      attendancePass () {
        console.log('点名通过', this.attendance.attendanceing);
        if (this.attendance.attendanceing.attendanceStatus === 0) {
          this.attendance.attendanceing.attendanceStatus = 1;
          this.attendance.attendanceAfter.push(this.attendance.attendanceing);
        } else {
          for (let i = 0, item; item = this.attendance.attendanceAfter[i]; i++) {
            if (item.id === this.attendance.attendanceing.id) {
              this.attendance.attendanceAfter[i] = this.attendance.attendanceing;
              break;
            }
          }
        }
        this.nextChange();
      },
      // 点名未通过
      attendanceNopass () {
        console.log('点名未通过', this.attendance.attendanceing);
        if (this.attendance.attendanceing.attendanceStatus === 0) {
          this.attendance.attendanceing.attendanceStatus = 1;
          this.attendance.attendanceAfter.push(this.attendance.attendanceing);
        } else {
          for (let i = 0, item; item = this.attendance.attendanceAfter[i]; i++) {
            if (item.id === this.attendance.attendanceing.id) {
              this.attendance.attendanceAfter[i] = this.attendance.attendanceing;
              break;
            }
          }
        }
        this.nextChange();
      },
      // 未通过原因选择
      handleReasonChange (val) {
        console.log('未通过原因选择', val);
        if (val === 5 || val === 6 || val === 7) {
          this.$prompt('请输入具体原因', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /\S/,
            inputErrorMessage: '原因不能为空'
          }).then(({ value }) => {
            this.attendance.attendanceing.attendanceMark = value;
          }).catch(() => {
            this.attendance.attendanceing.attendanceValue = 0;
          });
        }
      },
      // 下一位切换
      nextChange () {
        let index = this.attendance.attendanceBefore.indexOf(this.attendance.attendanceing);
        if (index + 1 < this.attendance.attendanceBefore.length) {
          this.attendance.attendanceing = this.attendance.attendanceBefore[index+1];
        } else {
          this.$message({type: 'info', message: '点名结束了'});
        }
      },
      // 上一位切换
      prevChange () {
        let index = this.attendance.attendanceBefore.indexOf(this.attendance.attendanceing);
        if (index - 1 >= 0) {
          this.attendance.attendanceing = this.attendance.attendanceBefore[index-1];
        } else {
          this.$message({type: 'info', message: '已经是第一位了'});
        }
      }
    },
    filters: {
      // 转换课堂 id => name
      transformClassroomName (value, classroomList) {
        let arr = classroomList.filter(item => item.id === value);
        return arr.length ? arr[0].name : '未选择课堂';
      },
      // 转换班级 id => name
      transformClassName (value, classList) {
        let arr = classList.filter(item => item.id === value);
        return arr.length ? arr[0].name : '未选择班级';
      }
    }
  }
</script>

<style lang="scss">
#dianming {
  #dianming-wrap {
    .tables {
      display: flex;
      height: 600px;
      .left-table {
        width: 61%;
        background-color: #fff;
      }
      .right-detail {
        margin-left: 5px;
        flex-grow: 1;
        height: 600px;
        > * { background-color: #fff; }
        .stu-msg {
          height: 300px;
          margin-bottom: 5px;
        }
        .analyze-map {
          height: 295px;
        }
      }
    }
  }
  .btn-list-arr {
    margin-bottom: 5px;
    background: #fff;
    padding: 10px 20px;
    line-height: 40px;
  }
  #attendance-dialog {
    .attendance-picture {
      .img {
        height: 300px;
        max-width: 500px;
        margin: 0 auto;
        img {
          height: 300px;
          min-width: 100%;
          max-width: 100%;
          vertical-align: bottom;
          object-fit: cover;
        }
      }
    }
    .operation {
      text-align: center;
      margin: 50px 0 10px;
    }
  }
}
</style>
