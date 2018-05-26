<template>
    <div id="madd">
        <div class="mtitle">
            <p class="txt">修改</p>
            <el-button type="primary" class="btn" @click="submit">确定</el-button>
            <el-button class="btn" @click="cancel">取消</el-button>
        </div>
        <div class="content">
            <el-form ref="form" :model="form" label-width="100px" class="left">
                <el-form-item label="名字">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="设置序号">
                    <el-input v-model="form.sort"></el-input>
                </el-form-item>
                <el-form-item label="户型编号">
                    <el-input v-model="form.code"></el-input>
                </el-form-item>
                <el-form-item label="面积">
                    <el-input v-model="form.acreage"></el-input>
                </el-form-item>
                <el-form-item label="所属楼栋">
                    <el-input v-model="form.belong" placeholder="多个楼栋用逗号隔开"></el-input>
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
import { mapState, mapActions } from "vuex";

export default {
  name: "addHTA",
  data: function() {
    return {
      rooturl: rooturl.rooturl,
      profile: "",
      threed: "",
      threedUrl: "",
      plane: "",
      planeUrl: "",
      templet: "",
      templetUrl: "",
      tdstate: null,
      tstate: null,
      pstate: null,
      form: {
        name: "",
        sort: "",
        code: "",
        acreage: ""
      }
    };
  },
  created() {
    this.form.profile = this.$store.state.ModifyHTA.profile;
    this.form.name = this.$route.query.name;
    this.form.sort = this.$route.query.sort;
    this.form.code = this.$route.query.code;
    this.form.acreage = this.$route.query.acreage;
    this.threed = this.$route.query.threed;
    this.plane = this.$route.query.plane;
    this.templet = this.$route.query.templet;
    this.form.belong = this.$route.query.building;
    this.tdstate = this.$route.query.threed_status;
    this.pstate = this.$route.query.plane_status;
    this.tstate = this.$route.query.templet_status;
    if (this.threed) {
      this.threedUrl = this.rooturl + this.threed;
    }
    if (this.plane) {
      this.planeUrl = this.rooturl + this.plane;
    }
    if (this.threed) {
      this.templetUrl = this.rooturl + this.templet;
    }
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
      let data = {
        id: this.$route.query.id,
        name: this.form.name,
        sort: this.form.sort,
        code: this.form.code,
        acreage: parseFloat(this.form.acreage),
        threed_img: this.threed,
        plane_img: this.plane,
        templet_img: this.templet,
        desc: this.form.profile,
        building: this.form.belong,
        threed_status: this.tdstate,
        plane_status: this.pstate,
        templet_status: this.tstate
      };
      this.$http({
        url: this.rooturl + "user/project/editHouseType",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: qs.stringify(data)
      }).then(
        res => {
          console.log(res);
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
    customUploadTD(file) {
      let fd = new FormData();
      fd.append("img_url", file.file);
      this.$http({
        method: "post",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        url: this.rooturl + "user/project/upload",
        data: fd
      }).then(res => {
        this.threed = res.data.data.img_url;
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
        data: fd
      }).then(res => {
        this.plane = res.data.data.img_url;
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
        data: fd
      }).then(res => {
        this.templet = res.data.data.img_url;
        this.templetUrl = this.rooturl + res.data.data.img_url;
      });
    }
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
  /* margin-top: 200px; */
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
/* .foo {
  height: 100%;
  display: flex;
  align-items: flex-end;
} */
.text {
  text-align: center;
  line-height: 124px;
}
</style>