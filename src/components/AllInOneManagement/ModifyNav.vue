<template>
    <div id="madd">
        <div class="mtitle">
            <p class="txt">修改</p>
            <el-button type="primary" class="btn" @click="submit">确定</el-button>
            <el-button class="btn" @click="cancel">取消</el-button>
        </div>
        <div class="content">
            <el-form ref="form" :model="form" label-width="100px" class="left">
                <el-form-item label="一级栏目名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="设置序号">
                    <el-input v-model="form.sort"></el-input>
                </el-form-item>
                <!-- <el-row type="flex" align="middle" v-if="type !== 2"> -->
                <el-row type="flex" align="middle">
                    <el-col :span="4" class="text">
                        <span v-if="type === 2" class="sl">添加楼栋分布图</span>
                        <span v-else class="sl">添加图片</span>
                    </el-col>
                    <el-col :span="8"> 
                    <el-upload class="avatar-uploader"  :action="rooturl + 'user/project/upload'" :show-file-list="false" name="img_url" :http-request="customUpload">
                        <img v-if="showUrl" :src="showUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    </el-col>
                    <el-col :span="12" v-if="type === 1" >
                      <el-radio v-model="radio" :label="1">满屏展示</el-radio>
                      <el-radio v-model="radio" :label="2">区域展示</el-radio>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!-- <form id="formid">
            <label for="resource">上传文档</label>
            <input type="file" id="resource" name="resource" ref="resource">
            <button type="button" @click="upload()">上传</button>
        </form> -->
    </div>
</template>

<script>
import rooturl from "../../../static/Rooturl.js";
import showImgServer from "../../../static/showImgServer.js";
import qs from "qs";

export default {
  name: "addNav",
  data: function() {
    return {
      rooturl: rooturl.rooturl,
      type: null,
      imageUrl: "",
      showUrl: "",
      id: "",
      form: {
        name: "",
        sort: ""
      },
      radio:1
    };
  },
  created() {
    this.form.name = this.$route.query.name;
    this.form.sort = parseInt(this.$route.query.sort);
    this.imageUrl = this.$route.query.img_url ? this.$route.query.img_url : "";
    this.showUrl = this.$route.query.img_url
      ? this.rooturl + this.$route.query.img_url
      : "";
    this.id = parseInt(this.$route.query.id);
    this.type = parseInt(this.$route.query.type);
  },
  methods: {
    submit() {
      if (!( this.form.name && this.form.sort)) {
        this.$message("请填写相应数据");
        return;
      }
      let data = {
        name: this.form.name,
        sort: this.form.sort,
        img_url: this.imageUrl,
        id: this.id,
        show_status:this.radio
      };
      this.$http({
        url: this.rooturl + "user/project/editNav",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: qs.stringify(data)
      }).then(
        res => {
          console.log(res)
          // this.$router.push({name:'AIOSetting'})
          this.$router.go(-1);
        },
        () => {
          this.$message("网络错误");
        }
      );
    },
    cancel() {
      this.$router.go(-1);
    },
    customUpload(file) {
      let fd = new FormData();
      fd.append("img_url", file.file);
      this.$http({
        method: "post",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        url: this.rooturl + "user/project/upload",
        // url:
        //   "http://192.168.0.154/hs_agent/public/index.php/user/project/uploadLogo",
        data: fd
      }).then(res => {
        this.imageUrl = res.data.data.img_url;
        //   console.log(res)
        this.showUrl = this.rooturl + res.data.data.img_url;
      });
    }
    // upload() {
    //   var formData = new FormData(); // FormData 对象
    //   formData.append("img_url", this.$refs.resource.files[0]);
    //   //   formData.append("name", "foo");
    //   //   formData.append("sort", 5);
    //   //   formData.append("pid", 0);
    //   //   formData.append("project_id", 1);

    //   this.$http
    //     .post(
    //       "http://192.168.0.154/hs_agent/public/index.php/user/project/upload",
    //       formData,
    //       {
    //         //   method:'post',
    //         headers: {
    //           "Content-Type": "multipart/form-data"
    //         }
    //       }
    //     )
    //     .then(res => {
    //       //   console.log(res)
    //       return res.data.data.img_url;
    //     })
    //     .then(res => {
    //       let qs = require("qs");
    //       let foo = {
    //         name: "foo",
    //         sort: 5,
    //         pid: 0,
    //         img_url: res,
    //         project_id: 1
    //       };

    //       return this.$http({
    //         url:
    //           "http://192.168.0.154/hs_agent/public/index.php/user/project/addNav",
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/x-www-form-urlencoded"
    //         },
    //         data: qs.stringify(foo),
    //         // transformRequest: [
    //         //   function(data) {
    //         //     return qs.stringify(data);
    //         //   }
    //         // ]
    //       });
    //     })
    //     .then(result => {
    //       console.log(result);
    //     });
    // }
  }
};
</script>

<style scoped>
p {
  margin: 0;
}
#madd {
  max-width: 600px;
  margin: 0 auto;
  margin-top: 200px;
  border: 1px solid #dcdcdc;
}
.mtitle {
  background-color: #333333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  margin-bottom: 20px;
}
.txt {
  flex-grow: 1;
  color: aliceblue;
}
.avatar-uploader .el-upload {
  border: 5px dashed #d9d9d9;
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
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px !important;
  height: 120px !important;
  display: block;
}
div.el-upload.el-upload--text {
  width: 120px;
  height: 120px;
}
.text{
    text-align: right;
    padding-right: 12px;
    font-size: 14px
}
.sl{
  font-size: 12px;
}
</style>
