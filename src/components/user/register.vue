<template>
    <div id="register">
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" class="demo-ruleForm register-container" label-width="80px" >
            <el-form-item label="账号" prop="account">
                <el-input v-model.number="ruleForm2.phone"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkpass">
                <el-input type="password" v-model="ruleForm2.checkpass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
                <el-input placeholder="请输入验证码" >
                    <template slot="append"><img src="./../../assets/img/valicode0.jpg"></template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-checkbox><span>我同意并遵守上述的</span>
                <span>《易家平台服务协议》</span></el-checkbox>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;"  @click="next()">下一步</el-button>
                <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  name: "register",
  data() {
    let validatePhone = (rule, value, callback) => {
      let reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      if (value === "") {
        callback(new Error("请填写联系电话"));
      } else if (!reg.test(value)) {
        callback(new Error("手机格式不正确"));
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        pass: "",
        checkpass: "",
        phone: ""
      },
      rules2: {
        phone: [{ validator: validatePhone, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkpass: [{ validator: validatePass2, trigger: "blur" }]
      },
      num: 0,
      disabled: false,
    };
  },
  methods: {
   next(){
      this.$router.push({ path: "/secRegister" });
   }
  }
};
</script>

<style  scoped>
.register-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 500px;
  padding: 35px 35px 15px 35px;
  background: #fff;
}
.forgetPassword-send {
  margin-left: 7px;
}
</style>