<template>
    <div class="login-wrap">
        <!-- <div class="ms-title">文法分析模拟器</div> -->
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <div v-if="errorInfo">
                    <span>{{errInfo}}</span>
                </div>
                <el-form-item prop="studentID">
                    <el-input v-model="ruleForm.studentID" placeholder="学号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item prop="validate">
                    <el-input v-model="ruleForm.validate" class="validate-code" placeholder="验证码"></el-input>
                    <div class="code" @click="refreshCode">
                        <s-identify :identifyCode="identifyCode"></s-identify>
                    </div>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <el-row>
                    <el-col span="12"><p class="find-back" @click="gotoFindback()">忘记密码？</p></el-col>
                    <el-col span="12"><p class="register" @click="gotoRegister()">没有账号？ 注册</p></el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
import {Message} from 'element-ui'
export default {
  name: 'login',
  data () {
    var validate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else if (value !== this.identifyCode) {
        callback(new Error('验证码错误!'))
      } else {
        callback()
      }
    }
    return {
      identifyCodes: '1234567890',
      identifyCode: '',
      errorInfo: false,
      errInfo: '',
      ruleForm: {
        studentID: '',
        password: '',
        validate: ''
      },
      rules: {
        studentID: [
          { required: true, message: '请输入学号', trigger: 'blur' }
        ],
        passWord: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        validate: [
          { validator: validate, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  methods: {
    submitForm (formName) {
      // 登录   /api/user_function/login
      // 输入studentID password
      // 验证 studentID password
      // 判断studentID是否存在
      // 存在   密码如果正确则返回state = 1   message :"验证成功"  data=[studentName,studentID,email]
      //               错误     state = -1  message :"密码错误"
      // 不存在            则返回state = 0   message :"学号不存在"
      const self = this
      self.$refs[formName].validate((valid) => {
        if (valid) {
          let Params = {studentID: self.ruleForm.studentID, password: self.ruleForm.password}
          self.$axios.post('/api/user_function/login', Params)
            .then((response) => {
              if (response.data.state === -1) {
                self.errorInfo = true
                self.errInfo = response.data.message
              } else if (response.data.state === 0) {
                self.errorInfo = true
                self.errInfo = response.data.message
              } else if (response.data.state === 1) {
                sessionStorage.setItem('studentID', response.data.data.studentID)
                sessionStorage.setItem('studentName', response.data.data.studentName)
                sessionStorage.setItem('email', response.data.data.email)
                console.log(11111111111111111111)
                this.$emit('loginsuccess')
              }
            }).catch((error) => {
              console.log(error)
              Message({
                message: '请检查网络并重试',
                type: 'error',
                center: true
              })
            })
        } else {
          Message({
            message: '格式错误，请检查输入',
            type: 'error',
            center: true
          })
          return false
        }
      })
    },
    gotoFindback () {
      this.$emit('gotoFindback')
    },
    gotoRegister () {
      this.$emit('gotoRegister')
    },
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
      console.log(this.identifyCode)
    }
  }
}
</script>

<style scoped>
.login-wrap {
  width: 300px;
  height: 250px;
  /* background-image: url('/static/img/login.jpg'); */
}
.ms-title {
  width: 100%;
  text-align: center;
  font-size: 30px;
  color:black;
}
.ms-login {
  width: 300px;
  height: 210px;
  padding: 0px 40px 40px 40px;
  border-radius: 5px;
  background-color: rgba(125, 125, 125, 0);
}
.ms-login span {
  color: red;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
}
.code {
  width: 112px;
  height: 35px;
  border: 1px solid #ccc;
  float: right;
  border-radius: 2px;
}
.validate-code {
  width: 136px;
  float: left;
}
.find-back {
  font-size: 14px;
  line-height: 30px;
  color: #2e82ff;
  cursor: pointer;
  float: left;
}
.register {
  font-size: 14px;
  line-height: 30px;
  color:#2e82ff;
  cursor: pointer;
  float: right;
}
</style>
