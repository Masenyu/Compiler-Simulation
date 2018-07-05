<template>
  <div class="login-wrap">
    <div class="ms-title">编译器文法分析模拟器</div>
    <div class="ms-register">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="studentName">
          <el-row>
            <el-col span="5">
              <p class="label">昵称</p>
            </el-col>
            <el-col span="19">
              <el-input v-model="form.studentName" placeholder="请输入昵称"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
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
        <el-form-item prop="email">
          <el-col span="5">
            <p class="label">邮箱</p>
          </el-col>
          <el-col span="19">
            <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
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

        <!--<el-form-item prop="phone" label="手机">-->
        <!--<el-input v-model="form.phone" placeholder="请输入手机号"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item prop="card" label="身份证">-->
        <!--<el-input v-model="form.card" placeholder="请输入身份证号"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item prop="birth" label="出生日期">-->
        <!--<el-col :span="24">-->
        <!--<el-date-picker type="date" placeholder="选择日期" v-model="form.birth" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>-->
        <!--</el-col>-->
        <!--</el-form-item>-->
        <!--<el-form-item prop="sex" label="性别">-->
        <!--<el-select class="select-sex" v-model="form.sex" placeholder="请选择性别">-->
        <!--<el-option label="男" value="man"></el-option>-->
        <!--<el-option label="女" value="woman"></el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <div class="login-btn">
          <el-button type="primary" @click="onSubmit('form')">注册</el-button>
        </div>
        <p class="register" @click="gotoLogin()">已有账号？ 登录</p>
      </el-form>
    </div>
  </div>
</template>

<script>
	import Util from '../../api/utils';
	export default {
		data() {
      var validateStudentName = (rule, value, callback) => {
        if(value.toString().length === 0) {
            callback(new Error('请输入正确的昵称'));
        }else{
            this.$refs.form.validateField('studentID');
        }
        callback();
      };
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


			var validateEmail = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入邮箱'));
				} else if (!Util.emailReg.test(this.form.email)){
					callback(new Error('请输入正确的邮箱'));
				} else {
					callback();
				}
			};
			// var validatePhone = (rule, value, callback) => {
			// 	if (value === '') {
			// 		callback(new Error('请输入手机号'));
			// 	} else if (!Util.phoneReg.test(this.form.phone)){
			// 		callback(new Error('请输入正确的手机号'));
			// 	} else {
			// 		callback();
			// 	}
			// };
			// var validateCard = (rule, value, callback) => {
			// 	if (value === '') {
			// 		callback(new Error('请输入身份证号'));
			// 	} else if (!Util.idCardReg.test(this.form.card)){
			// 		callback(new Error('请输入正确的身份证号'));
			// 	} else {
			// 		callback();
			// 	}
			// };
      return {
        form: {
          studentName: '',
          studentID: '',
          passWord: '',
          checkPassWord: '',
          email: '',
          // phone: '',
          // card: '',
          // birth: '',
          // sex: ''
        },
        rules: {
          studentName: [
            { validator: validateStudentName, trigger: 'blur' }
          ],
          studentID: [
            { validator: validateStudentID, trigger: 'blur' }
          ],
          passWord: [
            { validator: validatePassWord, trigger: 'blur' }
          ],
          checkPassWord: [
            { validator: validatePassWord2, trigger: 'blur' }
          ],
          email: [
              { validator: validateEmail, trigger: 'blur' }
          ],
          // phone: [
          //     { validator: validatePhone, trigger: 'blur' }
          // ],
          // card: [
          //     { validator: validateCard, trigger: 'blur' }
          // ],
          // birth: [
          //     { required: true, message: '请输入出生日期',type: 'date', trigger: 'blur' }
          // ],
          // sex: [
          //     { required: true, message: '请输入性别', trigger: 'blur' }
          // ]
        }
      }
    },
    methods:{
      onSubmit(formName) {
        const self = this;
        self.$refs[formName].validate((valid) => {
          if (valid) {
            self.$http.post('/api/user/addUser',self.form).then(function(response) {
            console.log(response);
            self.$router.push('/register-success');
          }).then(function(error) {
            console.log(error);
          })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      gotoLogin() {
        console.log(this);
        this.$router.push('/login');
      },
      getDateTimes(str) {
      var str = new Date(str);
          return str;
      }
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
  height: 350px;
  margin: -150px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  background-color: rgba(125, 125, 125, 0.4);
}
.label {
  color: #fff;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
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
