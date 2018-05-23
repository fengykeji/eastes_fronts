<template>
    <div id="madd">
        <div class="mtitle">
            <p class="txt">新增</p>
            <el-button type="primary" class="btn" @click="submit">确定</el-button>
            <el-button class="btn" @click="cancel">取消</el-button>
        </div>
        <div class="content">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="二级栏目名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="设置序号">
                    <el-input v-model="form.sort"></el-input>
                </el-form-item>
                <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>

            </el-form>
        </div>
        <form id="formid">
            <label for="resource">上传文档</label>
            <input type="file" id="resource" name="resource" ref="resource">
            <button type="button" @click="upload()">上传</button>
        </form>
    </div>
</template>

<script>
export default {
  name: "addNav",
  data: function() {
    return {
      form: {
        name: "",
        sort: ""
      }
    };
  },
  methods: {
    submit() {},
    cancel() {},
    upload() {
      var formData = new FormData(); // FormData 对象
      formData.append("img_url", this.$refs.resource.files[0]);
    //   formData.append("name", "foo");
    //   formData.append("sort", 5);
    //   formData.append("pid", 0);
    //   formData.append("project_id", 1);

      this.$http.post('http://192.168.0.154/hs_agent/public/index.php/user/project/upload',formData,{
        //   method:'post',
          headers:{
              'Content-Type': 'multipart/form-data'
          }
      }).then((res)=>{
        //   console.log(res)
        return res.data.data.img_url
      }).then((res)=>{

         return this.$http({
              url:'http://192.168.0.154/hs_agent/public/index.php/user/project/addNav',
              method:'POST',
              headers:{
                //   'Content-Type': 'multipart/form-data',
                  'Content-Type': 'application/x-www-form-urlencoded',
                //   'Content-Type': 'application/json',
              },
              data:{
                   name:'foo',
                  sort:5,
                  pid:0,
                  img_url:res,
                  project_id:1
              }
          })
      }).then((result)=>{
          console.log(result)
      })
    }
  }
};
</script>

<style scoped>
#madd {
  max-width: 600px;
  margin: 0 auto;
  margin-top: 200px;
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
}
.txt {
  flex-grow: 1;
  color: aliceblue;
}
.avatar-uploader .el-upload {
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
}
</style>
