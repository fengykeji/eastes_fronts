<template>
  <div id="examineCheck">
    <el-form ref="form" label-width="100px" size="small" class="examinecheck-form">
      <el-col :span="10">
        <el-form-item label="公司名称:">
          <el-input></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" :offset="2">
        <el-form-item label="账号:">
          <el-input></el-input>
        </el-form-item>
      </el-col>
      <el-form-item label="公司类型:">
        <i class="el-icon-success"></i>
        <span>房地产</span>
      </el-form-item>
      <el-form-item label="地址:">
        <el-input></el-input>
      </el-form-item>
      <el-col :span="10">
        <el-form-item label="工商执照号:">
          <el-input></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="6">
        <el-form-item label="工商执照:">
          <el-button type="info" @click="dialogVisible = true">点击查看</el-button>

          <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <span>这是一段信息</span>
          </el-dialog>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>
<script>
export default {
  name:"examineCheck",
  data() {
    return {
      dialogVisible: false
    }
  }
};
</script>
<style scoped>
.examinecheck-form {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 20px auto;
  width: 1000px;
  padding: 35px 35px 15px 35px;
}

.el-icon-success {
  color: #015a44;
}
</style>


