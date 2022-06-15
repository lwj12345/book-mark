<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">二手图书交易平台</span>
            </div>
            <el-form :model="loginUser" :rules="rules" ref="loginForm" class="loginForm" label-width="60px">
                <el-form-item label="账号" prop="account">
                    <el-input v-model="loginUser.account" placeholder="请输入您的账号"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginUser.password" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  @click="submitForm('loginForm')" class="submit_btn">登  录</el-button>
                </el-form-item>
                <div class="tiparea">
                    <p>还没有账号？现在<router-link to='/register'>注册</router-link></p>
                </div>
            </el-form>
        </section>
    </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import md5 from 'js-md5';
export default {
  name: "login",
  data() {
    return {
      loginUser: {
        account: "",
        password: ""
      },
      rules: {
        account: [
          { required: true, message: "账号不能为空", trigger: "change" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
         let account = this.loginUser.account;
          let password =md5(this.loginUser.password)
        if (valid) {
          this.$axios.post("/api/login",{account,password}).then(res => {
            if(res.data.status==-1){
              this.$message({
                message: "该用户还没注册！",
                type: "error"
              });
            }else if(res.data.status==-2){this.$message({
                message: "密码错误",
                type: "error"
              });}
            else{
              // console.log(res.data)
              const decode = jwt_decode(res.data.token);
              console.log([decode])
               window.localStorage.token=res.data.token;
                this.$axios.get(`/api/getUser?account=${decode.account}`).then((res,req)=>{
                console.log(res.data) 
               this.$store.dispatch("setUser", res.data) 
            }),
                // 存储数据，dispatch异步请求
              // this.$store.dispatch("setUser", [decode]);
              this.$router.replace('/home');
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>

<style scoped>
.login {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 20%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>


