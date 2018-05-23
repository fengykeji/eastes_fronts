<template>
  <div id="login">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm login-container">
      <h3 class="title">欢迎使用</h3>
      <el-form-item prop="account">
        <el-input v-model="ruleForm.account" type="text" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" type="password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="ruleForm.captcha" type="text" placeholder="请输入验证码">
          <template slot="append">
            <div @click="code">
              <s-identify :identifyCode="valicodeurl"></s-identify>
            </div>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button :disabled="ruleForm.account==='' || ruleForm.password==='' " type="primary" style="width:100%;" @click="login()">登录</el-button>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
      <!-- <el-form-item class="list">
        <el-col class="login-line" :span=24>
          <span @click="Forget()">忘记密码</span>
        </el-col>
         <el-col class="login-register" :span=12>
          <span @click="Register()">注册</span>
        </el-col> 
      </el-form-item>-->
    </el-form>
  </div>
</template>

<script>
import md5 from "js-md5"; //导入md5加密
import SIdentify from "@/components/shared/identify";

export default {
  name: "login",
  components: { SIdentify },
  data() {
    return {
      ruleForm: {
        account: "",
        password: "",
        captcha: ""
      },
      rules: {
        account: [{ required: true, message: "账号不能为空" }],
        password: [{ required: true, message: "密码不能为空" }]
      },
      valicodeurl: ""
    };
  },
  created() {
    this.code();
    // this.$http.get("/api/project/user/init").then(res => {
    //   if (res.data.code == 200) {
    //     sessionStorage.setItem("userinfo", JSON.stringify(res.data.data));
    //       this.$router.push({ path: "/index" });
    //   }else {
    //     this.valicodeurl = res.data.data;
    //   }
    // }) .catch(res => {
    //       this.$message.error("服务异常，请稍后再试");
    //       console.log(res);
    //     });;
  },
  methods: {
    Forget() {
      this.$router.push({ path: "/forgetPassword" });
    },
    // Register() {
    //   this.$router.push({ path: "/register" });
    // },
    login() {
      var qs = require("qs");
      let data = {
        account: this.ruleForm.account,
        password: this.ruleForm.password,
        captcha: this.ruleForm.captcha
      };

      //let user=sessionStorage.getItem('userinfo');
      this.$http
        .post(
          "api/project/user/login",
          qs.stringify(data)
          //this.HEAD("user.token", "user.role")
        )
        .then(res => {
          if (res.data.code == 200) {
            console.log(res.data.data);
            // 登录成功过后储存用户信息
            sessionStorage.setItem("userinfo", JSON.stringify(res.data.data));
            this.$router.push({ path: "/index" });
          } else {
            this.valicodeurl = res.data.data;
          }
        })
        .catch(res => {
          this.$message.error("服务异常，请稍后再试");
          console.log(res);
        });
      console.log(JSON.stringify(data));
    },
    code() {
      this.$http.get("api/project/user/captcha").then(res => {
        this.valicodeurl = res.data;
      });
    }
  }
};
</script>

<style  scoped>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #692c2c;
  box-shadow: 0 0 25px #cac6c6;
}
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.list {
  color: #12b7f5;
  text-align: center;
}
span {
  cursor: pointer;
}
.login-register {
  line-height: 20px;
}
</style>
