<template>
  <div class="login-wrap">
    <div class="ms-title">编译器文法分析模拟器</div>
    <div class="ms-register">
        <p class="tip">请输入您的学号</p>
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="studentID">
            <el-col span="5">
              <p class="label">学号</p>
            </el-col>
            <el-col span="19">
              <el-input v-model="form.studentID" placeholder="请输入学号"></el-input>
              </el-input>
            </el-col>
            </el-row>
          </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        </div>
        
        </el-form>
      
        <p class="tip">请输入验证码和新密码</p>
        <p class="tip1">验证码已经发送到账号绑定的邮箱</p>
        <el-form ref="form" :model="form">
          <el-form-item prop="validWord">
            <el-col span="5">
              <p class="label">验证码</p>
            </el-col>
            <el-col span="19">
              <el-input v-model="form.validWord" placeholder="验证码"></el-input>
              </el-input>
            </el-col>
            </el-row>
          </el-form-item>
          
          <el-form-item prop="passWord">
            <el-col span="5">
              <p class="label">密码</p>
            </el-col>
            <el-col span="19">
              <el-input v-model="form.passWord" type="password" placeholder="请输入密码"></el-input>
            </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="checkPassWord">
            <el-col span="5">
              <p class="label">确认密码</p>
            </el-col>
            <el-col span="19">
              <el-input v-model="form.checkPassWord" type="password" placeholder="请再次输入密码"></el-input>
            </el-col>
            </el-row>
          </el-form-item>

          <div class="login-btn1">
            <el-button type="primary" @click="onSubmit('form')">确认更改</el-button>
          </div>
      </el-form>

     
       <p class="register" @click="gotoLogin()">已有账号？ 登录</p>
    </div>
  </div>
</template>

<script>
	export default {
		data() {
      var validateStudentID = (rule, value, callback) => {
        if(value.toString().length !== 12) {
          callback(new Error('请输入正确的学号'));
        } else {
          for(var i=0;i<value.toString().length;i=i+1){
            if(value.toString()[i]!=='0'&& value.toString()[i]!=='1'&&
              value.toString()[i]!=='2'&&value.toString()[i]!=='3'&&
              value.toString()[i]!=='4'&&value.toString()[i]!=='9'&&
              value.toString()[i]!=='8'&&value.toString()[i]!=='7'&&
              value.toString()[i]!=='6'&&value.toString()[i]!=='5')
            {callback(new Error('请输入正确的学号'));}else{
              // console.lo`g(value.toString()[i])
              continue;
            }
          }
          this.$refs.form.validateField('passWord');
        }
        callback();
      };
			var validatePassWord = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else {
					if(this.form.checkPass !== '') {
						this.$refs.form.validateField('checkPassWord');
					}
					callback();
				}
			};
			var validatePassWord2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.form.passWord) {
					callback(new Error('两次输入的密码不一致'));
				} else {
					callback();
				}
			};


      return {
        visible: true,
        form: {
          studentID: '',
          passWord: '',
          checkPassWord: '',
        },
        rules: {
          studentID: [
            { validator: validateStudentID, trigger: 'blur' }
          ],
          validWord: [
            { required: true, trigger: 'blur' }
          ],
          passWord: [
            { validator: validatePassWord, trigger: 'blur' }
          ],
          checkPassWord: [
            { validator: validatePassWord2, trigger: 'blur' }
          ],
        }
      }
    },
    methods:{
      onSubmit(formName) {
        // const self = this;
        // self.$refs[formName].validate((valid) => {
        //   if (valid) {
        //     self.$http.post('/api/user/addUser',self.form).then(function(response) {
        //     console.log(response);
        //     self.$router.push('/register-success');
        //   }).then(function(error) {
        //     console.log(error);
        //   })
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
        this.visible = false
      },
      gotoLogin() {
        console.log(this);
        this.$router.push('/login');
      },
    }
	}
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url('/static/img/login.jpg');
}
.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}
.ms-register {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 300px;
  margin: -150px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  background-color: rgba(125, 125, 125, 0.4);
}
.label {
  color: #fff;
}
.tip {
  color: #fff;
  font-size: 2rem;
  margin-bottom: 2rem
}
.tip1 {
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: 1rem
}
.login-btn {
  margin-top: 80px;
  text-align: right;
}
.login-btn1 {
  margin-top: 10px;
  text-align: right;
}
.login-btn button {
  width: 50%;
  height: 36px;
}
.login-btn1 button {
  width: 50%;
  height: 36px;
}
.ms-login span {
  color: red;
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
.register {
  font-size: 14px;
  line-height: 30px;
  color: #bbbbbb;
  cursor: pointer;
  float: right;
}
</style>
