<template>
    <div id="madd">
        <div class="mtitle">
            <p class="txt">新增</p>
            <el-button type="primary" class="btn" @click="submit">确定</el-button>
            <el-button class="btn" @click="cancel">取消</el-button>
        </div>
        <div class="content">
            <el-form ref="form" :model="form" label-width="100px" class="left">
                <el-form-item label="户型名称">
                    <el-input v-model="form.name" placeholder="如一室一厅一卫"></el-input>
                </el-form-item>
                <el-form-item label="设置序号">
                    <el-input v-model="form.sort"></el-input>
                </el-form-item>
                <el-form-item label="户型编号">
                    <el-input v-model="form.code" placeholder="如A户型输入A"></el-input>
                </el-form-item>
                <el-form-item label="面积">
                    <el-input v-model="form.acreage"></el-input>
                </el-form-item>
                <el-form-item label="所属楼栋">
                    <el-input v-model="form.belong" placeholder="多个楼栋用 - 隔开,如 一栋-二栋"></el-input>
                </el-form-item>
                <el-form-item label="户型描述">
                    <el-input type="textarea" placeholder="请输入内容" v-model="form.profile"></el-input>
                </el-form-item>

                   <el-row type="flex" align="middle">
                    <el-col :span="4" class="text">
                        <span>3D图片</span>
                    </el-col>
                    <el-col :span="8">
                        <el-upload class="avatar-uploader" :action="rooturl + '/user/project/upload'" :show-file-list="false" name="img_url" :http-request="customUploadTD">
                            <img v-if="threedUrl" :src="threedUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-col>
                    <el-col :span="12" class="foo">
                        <el-radio v-model="tdstate" :label="1">显示</el-radio>
                        <el-radio v-model="tdstate" :label="0">隐藏</el-radio>
                    </el-col>
                </el-row>
                <el-row type="flex" align="middle">
                    <el-col :span="4" class="text">
                        <span>平面图</span>
                    </el-col>
                    <el-col :span="8">
                        <el-upload class="avatar-uploader" :action="rooturl + '/user/project/upload'" :show-file-list="false" name="img_url" :http-request="customUploadP">
                            <img v-if="planeUrl" :src="planeUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-col>
                    <el-col :span="12" class="foo">
                        <el-radio v-model="pstate" :label="1">显示</el-radio>
                        <el-radio v-model="pstate" :label="0">隐藏</el-radio>
                    </el-col>
                </el-row>
                <el-row type="flex" align="middle">
                    <el-col :span="4" class="text">
                        <span>样板图片</span>
                    </el-col>
                    <el-col :span="8">
                        <el-upload class="avatar-uploader" :action="rooturl + '/user/project/upload'" :show-file-list="false" name="img_url" :http-request="customUploadT">
                            <img v-if="templetUrl" :src="templetUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-col>
                    <el-col :span="12" class="foo">
                        <el-radio v-model="tstate" :label="1">显示</el-radio>
                        <el-radio v-model="tstate" :label="0">隐藏</el-radio>
                    </el-col>
                </el-row>



                <!-- <el-upload class="avatar-uploader" :action="rooturl + '/user/project/upload'" :show-file-list="false" name="img_url" :http-request="customUploadTD">
                    <img v-if="threedUrl" :src="threedUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-radio v-model="tdstate" :label="0">显示</el-radio>
                <el-radio v-model="tdstate" :label="1">隐藏</el-radio>
                <el-upload class="avatar-uploader" :action="rooturl + '/user/project/upload'" :show-file-list="false" name="img_url" :http-request="customUploadP">
                    <img v-if="planeUrl" :src="planeUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-radio v-model="pstate" :label="0">显示</el-radio>
                <el-radio v-model="pstate" :label="1">隐藏</el-radio>
                <el-upload class="avatar-uploader" :action="rooturl + '/user/project/upload'" :show-file-list="false" name="img_url" :http-request="customUploadT">
                    <img v-if="templetUrl" :src="templetUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-radio v-model="tstate" :label="0">显示</el-radio>
                <el-radio v-model="tstate" :label="1">隐藏</el-radio> -->
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
  name: "addHTA",
  data: function() {
    return {
      rooturl: rooturl.rooturl,
      threed: "",
      threedUrl: "",
      plane: "",
      planeUrl: "",
      templet: "",
      templetUrl: "",
      tdstate: 1,
      tstate: 1,
      pstate: 1,
      form: {
        name: "",
        sort: "",
        code: "",
        acreage: "",
        belong: "",
        profile: ""
      }
    };
  },
  methods: {
    submit() {
      if (
        !(
          this.form.code &&
          this.form.name &&
          this.form.sort &&
          this.form.acreage
        )
      ) {
        this.$message("请填写相应文本数据");
        return;
      }
      console.log(this.$route.params.navid);
      let data = {
        nav_id: this.$route.params.navid,
        name: this.form.name,
        sort: this.form.sort,
        code: this.form.code,
        acreage: parseFloat(this.form.acreage),
        desc:this.form.profile,
        building:this.form.belong,
        threed_status:this.tdstate,
        plane_status:this.pstate,
        templet_status:this.tstate,
        // pid:this.$route.params.id,
        threed_img: this.threed,
        plane_img: this.plane,
        templet_img: this.templet

        // project_id:1
      };
      this.$http({
        url: this.rooturl + "user/project/addAioHouseType",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: qs.stringify(data)
      }).then(
        res => {
          console.log(res);
          this.$router.go(-1);
          // this.$router.push({name:'editsecondary',params:{id:this.$route.params.id}})
        },
        () => {
          this.$message("网络错误");
        }
      );
    },
    cancel() {
      this.$router.go(-1);
    },
    customUploadTD(file) {
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
        console.log(res);
        this.threed = res.data.data.img_url;
        //   console.log(res)
        this.threedUrl = this.rooturl + res.data.data.img_url;
      });
    },
    customUploadP(file) {
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
        console.log(res);
        this.plane = res.data.data.img_url;
        //   console.log(res)
        this.planeUrl = this.rooturl + res.data.data.img_url;
      });
    },
    customUploadT(file) {
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
        console.log(res);
        this.templet = res.data.data.img_url;
        //   console.log(res)
        this.templetUrl = this.rooturl + res.data.data.img_url;
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
  margin-top: 0px;
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
.text {
  text-align: center;
  line-height: 124px
}
</style>