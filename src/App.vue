<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0px;
  padding: 0px;
}
/* 时间选择器 */

#categoryImg .el-dialog__wrapper .el-dialog .el-dialog__header {
  padding: 10px 20px 10px;
  background-color: #e9eef3 !important;
}
#dynamicList .el-dialog__header {
  background-color: #e9eef3 !important;
}
#generalLayout .el-dialog__header {
  background-color: #e9eef3 !important;
}

#categoryImg .el-dialog__headerbtn {
  margin-top: -5px;
}
.el-table {
  text-align: center;
}
.el-table th,
.el-table tr {
  text-align: center;
}
.el-pagination {
  margin-top: 20px !important;
}
#dynamicList .el-dialog__body {
  padding:  0;
}
#ckBeConfirmed .el-input-group__append {
  cursor: pointer;
}
</style>
