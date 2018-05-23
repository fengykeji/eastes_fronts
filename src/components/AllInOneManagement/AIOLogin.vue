<template>
    <div id="login">
        <m-title></m-title>
        <div class="center">
            <h3 class="title">欢迎使用!</h3>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item>
                    <el-input v-model="form.account" class="ipt"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.password" class="ipt"></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import MTitle from "./MTitle";
export default {
  name: "AIOLogin",
  components: { MTitle },
  data: function() {
    return {
          form:{
              account:'',
              password:''
          }
    };
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
/* div.el-form-item__content */
div.el-form-item__content{
    margin-left: 0px !important
}
.input.el-input_inner{
    width: 100%
}
.center {
  max-width: 400px;
  min-height: 600px;
  margin: 0 auto;
  margin-top: 150px;
}
.title {
  text-align: center;
  height: 50px;
  line-height: 50px;
}
</style>
