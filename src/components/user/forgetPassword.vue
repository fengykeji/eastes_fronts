<template>
  <div id="forgetPassword">
    <el-form :model="ruleForm2"  :rules="rules2" ref="ruleForm2" class="demo-ruleForm forgetPassword-container" label-width="80px">
      <el-form-item label="电话号码" prop="phone">
        <el-input v-model.number="ruleForm2.phone"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-col :span=15>
          <el-input type="text"></el-input>
        </el-col>
        <el-col :span=9>
          <el-button style="width:96%;" type="primary" class="forgetPassword-send" :disabled="disabled" @click="sendCode()">{{sendMsg}}</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkpass">
        <el-input type="password" v-model="ruleForm2.checkpass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "forgetPassword",
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
      sendMsg: "点击发送",
      disabled: false
    };
  },
  methods: {
    sendCode() {
      this.disabled = true;
      let a = 5;
      let timer = setInterval(() => {
        a--;
        this.sendMsg = a + "秒后重新获取";
        console.log(this.sendMsg);
        if (a === 0) {
          this.disabled = false;
          this.sendMsg = "点击发送";
          // this.num = 5;
          clearInterval(timer);
        }
      }, 1000);
    }
  }
};
</script>

<style  scoped>
.forgetPassword-container {
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