<template>
    <div id="secRegister">
        <el-form ref="form" label-width="120px" size="small" class="secRegister-form">
            <el-form-item label="公司名称:">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="公司类型:">
                <el-col :span="4">
                    <i class="el-icon-success"></i>
                    <span>开发商</span>
                </el-col>
                <el-col :span="4">
                    <i class="el-icon-success"></i>
                    <span>代理公司</span>
                </el-col>
                <el-col :span="4">
                    <i class="el-icon-success"></i>
                    <span>分销公司</span>
                </el-col>
                <el-col :span="4">
                    <i class="el-icon-success"></i>
                    <span>渠道</span>
                </el-col>
                <el-col :span="4">
                    <i class="el-icon-success"></i>
                    <span>中介</span>
                </el-col>
                <el-col :span="4">
                    <i class="el-icon-success"></i>
                    <span>其他</span>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-col :span="8">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option v-for="item in firoptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="8">
                    <el-select v-model="value2" placeholder="请选择">
                        <el-option v-for="item in secoptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="8">
                    <el-select v-model="value3" placeholder="请选择">
                        <el-option v-for="item in thioptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="请输入具体地址"></el-input>
            </el-form-item>
            <el-form-item label="组织机构代码：">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="组织机构代码证">
                <el-upload class="upload-demo" action="" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过2M</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="工商执照注册号">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="工商执照营业照">
                <el-upload class="upload-demo" action="" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过2M</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="公司法人">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="身份证号码">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="身份证附件">
                <el-upload class="upload-demo" action="" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">支身份证上传正面，反面各一张。支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过2M</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="其他证明材料">
                <el-upload class="upload-demo" action="" :on-success="handleAvatarSuccess">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item label="联系人">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="联系电话1">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="联系电话2">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input type="textarea" autosize placeholder="请输入内容" v-model="textarea2">
                </el-input>
            </el-form-item>
            <el-form-item style="width:100%">
                <el-button type="primary" style="width:100%;" >提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
  name: "secRegister",
  data() {
    return {
      dialogVisible: false,
      firoptions: [
        {
          value: "1",
          label: "四川"
        },
        {
          value: "2",
          label: "云南"
        }
      ],
      secoptions: [
        {
          value: "1",
          label: "成都"
        },
        {
          value: "2",
          label: "绵阳"
        }
      ],
      thioptions: [
        {
          value: "1",
          label: "郫都县"
        },
        {
          value: "2",
          label: "高新区"
        }
      ],
      value: "请选择省份",
      value2: "请选择城市",
      value3: "请选择区/县",
      tatextarea2:''
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {},
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg/bmp/gif/bng";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("只支持.jpg .jpeg .bmp .gif .png格式照片!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style scoped>
.secRegister-form {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 20px auto;
  width: 800px;
  padding: 35px 35px 15px 35px;
}

.el-icon-success {
  color: #015a44;
}
</style>


