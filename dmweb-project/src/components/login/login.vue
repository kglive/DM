<template>
  <section id="login">
    <div class="wrap clearfix">
      <div id="side-msg">1231</div>
      <div id="regist" v-bind:style="{paddingTop: paddingTop + 'px'}">
        <el-form label-position="top" :model="reguserForm" status-icon :rules="reguserFormRules" ref="reguserForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="reguserForm.username" autocomplete="off" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item v-if="islogin" label="登录密码" prop="password">
            <el-input type="password" v-model="reguserForm.password" autocomplete="off" placeholder="请输入登录密码"></el-input>
          </el-form-item>
          <el-form-item v-else label="注册密码" prop="pass">
            <el-input type="password" v-model="reguserForm.pass" autocomplete="off" placeholder="请输入登录密码"></el-input>
          </el-form-item>
          <el-form-item v-if="!islogin" label="确认密码" prop="checkPass">
            <el-input type="password" v-model="reguserForm.checkPass" autocomplete="off" placeholder="请确认登录密码"></el-input>
          </el-form-item>
          <el-form-item v-if="!islogin" label="性别" prop="sex">
            <el-radio v-model="reguserForm.sex" label="1">男</el-radio>
            <el-radio v-model="reguserForm.sex" label="0">女</el-radio>
          </el-form-item>
          <el-form-item v-if="!islogin" label="老师编号" prop="code">
            <el-input v-model.number="reguserForm.code" autocomplete="off" placeholder="请输入老师编号，纯数字，最多四位"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button v-if="!islogin" type="primary" @click="submitFormReg('reguserForm')">注册</el-button>
            <el-button v-else type="primary" @click="submitFormLog('reguserForm')">登录</el-button>
            <el-button v-if="!islogin" type="text" @click="islogin=true;paddingTop=150;">去登录</el-button>
            <el-button v-else type="text" @click="islogin=false;paddingTop=45">去注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data () {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.reguserForm.checkPass !== '') {
            this.$refs.reguserForm.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.reguserForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        paddingTop: 150,
        islogin: true,
        reguserForm: {
          username: 'admin',
          // 登录密码
          password: '123',
          // 注册密码
          pass: '123',
          // 注册重复密码
          checkPass: '123',
          sex: '1',
          code: '0001'
        },
        reguserFormRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入登录密码', trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          code: [
            { required: true, message: '请输入老师编号，纯数字，最多四位', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // 注册提交
      submitFormReg(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: '正在注册，请稍后...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$http.post('/user/reg', {
              username: this.reguserForm.username,
              password: this.reguserForm.pass,
              sex: this.reguserForm.sex,
              code: this.reguserForm.code
            }).then(response => {
              loading.close();
              let resData = response.data;
              if (resData.status == 0) {
                let appellation = (resData.data.sex == 0) ? '女士' : '先生';
                this.$message({type: 'success', message: `恭喜 ${resData.data.username} ${appellation} 注册成功！`});
              } else {
                this.$message({type: 'info', message: resData.data ? resData.data : '注册失败，请尝试重新注册！'});
              }
            }).catch(error => {
              loading.close();
              this.$message({type: 'error', message: error.message});
            });
          } else { return false; }
        });
      },
      // 登录
      submitFormLog (formName) {
        let This = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.get(`/user/login?username=${this.reguserForm.username}&password=${this.reguserForm.password}`)
            .then(response => {
              console.log('response', response);
              let resData = response.data;
              if (resData.status == 0) {
                window.localStorage.setItem("token", resData.token);
                let welcome = (hour => {
                  let welcome = '';
                  if (hour < 6) {
                    welcome = '凌晨好！';
                  } else if (hour < 9) {
                    welcome = '早上好！';
                  } else if (hour < 12) {
                    welcome = '上午好！';
                  } else if (hour < 14) {
                    welcome = '中午好！';
                  } else if (hour < 17) {
                    welcome = '下午好！';
                  } else if (hour < 19) {
                    welcome = '傍晚好！';
                  } else {
                    welcome = '晚上好！';
                  }
                  return welcome;
                })((new Date()).getHours());
                let appellation = (resData.data.sex == 0) ? '女士' : '先生';
                this.$message({
                  type: 'success',
                  message: `${resData.data.username} ${appellation} ${welcome}`,
                  onClose () {
                    This.$router.push('/index');
                  }
                });
              } else {
                this.$message({type: 'info', message: resData.data ? resData.data : '登录失败，请尝试重新登录！'});
              }
            })
            .catch(error => {
              this.$message({type: 'error', message: error.message});
            });
          } else { return false; }
        });
      }
    }
  }
</script>

<style lang="scss">
  #login {
    background-color: #242422;
    width: 100%;
    height: calc(100%);
    min-width: 1000px;
    min-height: 600px;
    box-sizing: border-box;
    overflow: hidden;
    .wrap {
      width: 60%;
      margin: 50px auto;
    }
    .el-form-item {
      width: 400px;
      min-width: 400px;
      margin: 0 auto 20px;
      .el-form-item__label {
        color: rgba(254,201,1,.3);
        font-size: 10px;
        line-height: 30px;
        padding: 0;
      }
      .el-input {
        .el-input__inner {
          background-color: transparent;
          border: none;
          outline: none;
          border-bottom: 1px solid #686b71;
          -webkit-border-radius: 0;
          -moz-border-radius: 0;
          border-radius: 0;
          color: #FEC901;
          font-size: 16px;
          &:focus {
            border-color: #FEC901;
          }
        }
      }
      .el-radio__input.is-checked+.el-radio__label {
        color: #FEC901;
      }
      .el-radio__input.is-checked .el-radio__inner {
        border-color: #FEC901;
        background: #FEC901;
      }
      &.is-success .el-input__validateIcon{ color: #FEC901; }
      .el-form-item__content {
        text-align: center;
        .el-button {
          -webkit-border-radius: 0;
          -moz-border-radius: 0;
          border-radius: 0;
          padding-left: 40px;
          padding-right: 40px;
          border: none;
          color: #867f7f;
          &.el-button--primary {
            background-color: #FEC901;
            color: #30322F;
            &:hover {
              background: rgba(254,201,1,.3);
            }
          }
        }
      }
    }
  }
  #regist {
    background-color: #30322F;
    width: 61.8%;
    height: 600px;
    float: left;
    padding: 150px 50px 0 50px;
    box-sizing: border-box;
    transition: all .3s ease;
  }

  #side-msg {
    width: 38.2%;
    height: 600px;
    float: left;
    background-color: rgba(225,230,223,.5);
  }
</style>
