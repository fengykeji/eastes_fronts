
<template>
  <div id="aiopc">
    <el-row type="flex" justify="space-between" class="dynamicList-title">
      <el-col :span="8">
        <aiologo></aiologo>
      </el-col>
      <el-col :span="8">
        <el-button-group>
          <el-button type="primary" size="small" @click="addPC">新增</el-button>
          <el-button type="primary" size="small" @click="modifyPC">修改</el-button>
          <el-button type="primary" size="small" @click="del">删除</el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <el-table :data="Data" @selection-change="selsChange" border ref="multipleTable" tooltip-effect="dark" class="apart-table" @select="handleSelected">
      <el-table-column type="selection" reserve-selection='' label="ALL" width="50">
      </el-table-column>
      <el-table-column prop="index" label="排序" width="50" :formatter="formatter">
      </el-table-column>
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="sort" label="序号" width="50">
      </el-table-column>
    </el-table>

    <el-pagination background layout="prev, pager, next" :total="tableData.length" :pageSize="pageSize" @current-change="handleCurrentChange" class="Img-page">
    </el-pagination>
    <!-- 查看弹窗 -->
    <!-- <el-dialog title="查看" :visible.sync="previewVisible">
      <el-form ref="form" :model="ruleFormSee" label-width="100px" size="small" class="dynamicForm">
        <el-form-item label="标题:">
          <el-input placeholder="请输入内容" v-model="ruleFormSee.title">
          </el-input>
        </el-form-item>
        <el-form-item label="内容:">
          <el-input type="textarea" autosize placeholder="请输入内容" v-model="ruleFormSee.contain">
          </el-input>
        </el-form-item>
        <el-form-item label="图片:">
          <el-row class="dialogImg">
            <img :src="imgUrl" alt="">
            <img :src="imgUrl" alt="">
          </el-row>
        </el-form-item>
        <el-form-item label="发布人:">
          <el-input placeholder="请输入内容" v-model="ruleFormSee.releasePeople">
          </el-input>
        </el-form-item>
        <el-form-item label="发布时间:">
          <el-input placeholder="请输入内容" v-model="ruleFormSee.releaseDate">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="previewVisible = false">预 览</el-button>
        <el-button @click="previewVisible = false">关 闭</el-button>
      </span>
    </el-dialog> -->
    <!-- 新增弹窗 -->

  </div>
</template>
<script>
import aiologo from "../AllInOneManagement/AIOLogo";
import rooturl from "../../../static/Rooturl.js";
import imgServer from "../../../static/imgServer.js";
import indexImg from "../../../static/indexImg.js";
import showImgServer from "../../../static/showImgServer.js";
import { mapMutations } from "vuex";
export default {
  name: "dynamicList",
  components: { aiologo },
  data() {
    return {
      pageNum: 1,
      project: {
        project_id: 1
      },
      selectedRow: {},
      hasItemSelected: false,
      rooturl: rooturl.rooturl,
      imgServer: imgServer.imgServer,
      indexImg: indexImg.indexImg,
      logoUrl: "",
      indexUrl: "",
      Data: [],
      tableData: [],
      pageSize: 10,
      alltablesize: [],
      previewVisible: false,
      addDynamicVisible: false,
      ruleFormSee: {
        contain: "",
        title: "",
        releasePeople: "",
        releaseDate: ""
      },
      ruleFormAdd: {
        contain: "",
        title: ""
      },
      upImgVisible: false,
      upImgVisibleUrl: "",
      imgUrl: "/static/img/generalpic.jpg",
      sels: []
    };
  },
  created() {
    this.getSnav();
  },
  methods: {
    formatter(row,column){
      return row.index + 1
      // return this.pageSize * (this.pageNum - 1) + 1 + row.index
    },
    del() {
      if (!this.hasItemSelected) {
        this.$message.error("您还没有选择");
        return;
      }

      let id = this.selectedRow.id;
      this.$http
        .get(this.rooturl + "user/project/delDynatown?id=" + id)
        .then(res => {
          console.log(res);
          this.tableData = this.tableData.filter(ele => {
            return ele.id !== id;
          });
          this.tableData.map((ele,index)=>{
            ele.index = index
          })
          this.page();
        });
      // console.log('aaa')
      // console.log(this.tableData)
      // console.log('cccccccccccccc')
      // console.log(this.Data)
      // console.log('ddddddd')
      // console.log(this.alltablesize)
    },
    modifyPC() {
      if (!this.hasItemSelected) {
        this.$message.error("您还没有选择");
        return;
      }
      let id = this.selectedRow.id;
      // let nav_id = this.selectedRow.nav_id
      let name = this.selectedRow.name;
      let sort = this.selectedRow.sort;
      let img_url = this.selectedRow.img_url;
      this.$router.push({
        name: "modifypc",
        query: { id, name, sort, img_url}
      });
    },
    // customUploadLogo(file) {
    //   let fd = new FormData();
    //   fd.append("img_url", file.file);
    //   fd.append("project_id", 1);
    //   this.$http({
    //     method: "post",
    //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //     url: this.rooturl + "user/project/uploadLogo",
    //     // url:
    //     //   "http://192.168.0.154/hs_agent/public/index.php/user/project/uploadLogo",
    //     data: fd
    //   }).then(res => {
    //     console.log(res);
    //     this.logoUrl = this.rooturl + res.data.data.img_url;
    //   });
    // },
    // customUploadHome(file) {
    //   let fd = new FormData();
    //   fd.append("img_url", file.file);
    //   fd.append("project_id", 1);
    //   this.$http({
    //     method: "post",
    //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //     url: this.rooturl + "user/project/uploadIndexImg",
    //     data: fd
    //   }).then(res => {
    //     this.indexUrl = this.rooturl + res.data.data.img_url;
    //   });
    // },
    getSnav() {
      this.$http
        .get(this.rooturl + "user/project/getAioDynatown?nav_id=" + this.$route.params.id)
        .then(res => {
          console.log(res)
          let result = res.data.data;
          for (let i = 0; i < result.length; i++) {
            result[i].index = i
            this.tableData.push(result[i]);
          }
          this.page();
        });
    },
    page() {
      this.alltablesize = [];
      for (
        let i = 0;
        i < Math.ceil(this.tableData.length / this.pageSize);
        i++
      ) {
        let arr = new Array();
        for (let j = 0; j < this.tableData.length; j++) {
          if (
            j >= (i == 0 ? 0 : i * this.pageSize) &&
            j < (i + 1) * this.pageSize
          ) {
            arr.push(this.tableData[j]);
          }
        }
        this.alltablesize.push(arr);
      }
      // this.Data = this.alltablesize[0];
      if (this.pageNum > Math.ceil(this.tableData.length / this.pageSize)) {
        this.pageNum = this.pageNum - 1;
      }
      this.Data = this.alltablesize[this.pageNum - 1];
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      // console.log(val)
      this.Data = this.alltablesize[val - 1];
    },
    handleSelected(selection, row) {
      // if(selection.length > 1){
      //   this.$message.error('仅支持单选')
      //   return
      // }
      if (row === this.selectedRow) {
        this.$refs.multipleTable.clearSelection();
        this.selectedRow = {};
        this.hasItemSelected = false;
        return;
      }
      this.selectedRow = row;
      this.hasItemSelected = true;
      this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(this.selectedRow);
        console.log('aaaaaaaaaaaaaa')
        console.log(this.selectedRow)

    },
    // 验证图片格式大小
    // beforeImgUpload(file) {
    //   const isJPG = file.type === "image/jpeg";
    //   const isLt2M = file.size / 1024 / 1024 < 2;

    //   if (!isJPG) {
    //     this.$message.error("上传头像图片只能是 JPG 格式!");
    //   }
    //   if (!isLt2M) {
    //     this.$message.error("上传头像图片大小不能超过 2MB!");
    //   }
    //   return isJPG && isLt2M;
    // },
    addPC() {
      this.$router.push({ name: "addpc" ,params:{id:this.$route.params.id}});
    },
    change() {
      let sels = this.sels;
      if (sels.length > 1) {
        this.$message.error("查看只能单选");
      } else if (sels.length == 1) {
        this.addDynamicList(sels[0].key);
        this.$router.push({ path: "/index/ChangeDynamicList" });
      } else {
        this.$message.error("请选择查看内容");
      }
    },
    ...mapMutations(["addDynamicList"]),
    selsChange(sels) {
      if (sels) {
        this.sels = sels;
      }
    }
  }
};
</script>
<style>
#aiopc .el-breadcrumb__inner {
  font-size: 18px !important;
}
#aiopc .dynamicList-title {
  border-bottom: dashed 1px #b3c0d1;
  margin-bottom: 10px;
  padding-bottom: 10px;
}
#aiopc .el-table {
  margin: 50px auto;
  width: 80%;
}
#aiopc .Img-page {
  margin-left: 114px;
}
#aiopc .textImgType {
  width: 80%;
  height: 25px;
}
#aiopc .dialogImg img {
  width: 80px;
}
#aiopc .dynamicForm {
  width: 80%;
  margin: 50px auto;
}
#aiopc .el-dialog__body {
  padding: 0;
}
#aiopc .dynamicTitle {
  margin-bottom: 30px;
  font-size: 18px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #b3c0d1;
}
#aiopc .addTitle {
  margin-left: 20px;
}
#aiopc .aupload {
  width: 80%;
  margin: 0 auto;
}
#aiopc .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
#aiopc .avatar {
  width: 100px;
  height: 100px;
  display: inline-block;
}
#aiopc .upload-demo {
  display: flex;
  align-items: flex-end;
}
/* .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
} */
#aiopc .el-table-column--selection.is-leaf:first-child div.cell {
  display: none;
  /* border: 1px solid red */
}
</style>