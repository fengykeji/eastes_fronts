<template>
    <div id="alogo">
        <el-row class="txt">
            <el-col :span="4" class="foo"><div class="alogo"></div></el-col>
            <!-- <el-col :span="2"><i class="el-icon">|</i></el-col> -->
            <el-col :span="12"><span class="text">当前位置：一体机设置</span></el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  name: "AIOLogo",
  data() {
    return {};
  },
  created() {},
  computed: {}
};
</script>

<style>
.foo{
    margin-left: 25px
}
.alogo {
  width: 30px;
  height: 30px;
  background-color: blueviolet;
}
.text{
    font-size: 14px;
}
.txt{
    line-height: 30px;
}
</style>
