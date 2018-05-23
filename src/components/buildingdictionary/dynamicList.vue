<template>
    <div id="dynamicList">
        <el-row type="flex" justify="space-between" class="dynamicList-title">
            <el-col :span="8">
                <breadcrumb :breadcrumbName="breadcrumbName"></breadcrumb>
            </el-col>
            <el-col :span="8">
                <el-button-group>
                    <el-button type="primary" size="small">高级搜索</el-button>
                    <el-button type="primary" size="small" @click="previewVisible = true">查看</el-button>
                    <el-button type="primary" size="small" @click="addDynamic">新增</el-button>
                    <el-button type="primary" size="small" @click="change">修改</el-button>
                    <el-button type="primary" size="small">删除</el-button>
                </el-button-group>
            </el-col>
        </el-row>
        <el-table :data="Data" @selection-change="selsChange"  border ref="multipleTable" tooltip-effect="dark" class="apart-table">
            <el-table-column type="selection" reserve-selection='' label="ALL" width="50">
            </el-table-column>
            <el-table-column prop="key" label="序号">
            </el-table-column>
            <el-table-column prop="dynamicTitle" label="动态标题">
            </el-table-column>
            <el-table-column prop="contain" label="简述">
            </el-table-column>
            <el-table-column prop="releasePeople" label="发布人">
            </el-table-column>
            <el-table-column prop="releaseDate" label="发布日期">
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="tableData.length" :pageSize="pageSize" @current-change="handleCurrentChange" class="Img-page">
        </el-pagination>
        <!-- 查看弹窗 -->
        <el-dialog title="查看" :visible.sync="previewVisible">
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
        </el-dialog>
        <!-- 新增弹窗 -->
        
    </div>
</template>
<script>
import breadcrumb from "@/components/shared/breadcrumb";
import  {mapMutations} from 'vuex'
export default {
  name: "dynamicList",
  components: { breadcrumb },
  data() {
    return {
      breadcrumbName: [{ breadcrumbname: "动态列表", router: "" }],
      Data: [],
      tableData: [],
      pageSize: 5,
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
      upImgVisible:false,
      upImgVisibleUrl:"",
      imgUrl: "/static/img/generalpic.jpg",
      sels:[]
    }
  },
  created() {
    this.getdynamicList();
  },
  methods: {
    getdynamicList() {
      for (let i = 1; i < 100; i++) {
        this.tableData.push({
          key: i,
          dynamicTitle: "活动通知",
          house: "三室两厅两卫",
          contain: "**********",
          releasePeople: "张三",
          releaseDate: "2017/10/10"
        });
      }
      this.page();
    },
    page() {
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
      this.Data = this.alltablesize[0];
    },
    handleCurrentChange(val) {
      this.Data = this.alltablesize[val - 1];
    },
    // 验证图片格式大小
    beforeImgUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    addDynamic(){
    	this.$router.push({path:'/index/AddDynamicList'})
    },
    change(){
      let sels=this.sels;
      if(sels.length>1){
      	this.$message.error("查看只能单选")
      }else if(sels.length==1){
      	this.addDynamicList(sels[0].key);
      	 this.$router.push({path: '/index/ChangeDynamicList'})
      }else{
      	this.$message.error("请选择查看内容")
      }
    
    },
    ...mapMutations([
    	'addDynamicList'
    ]),
    selsChange(sels) {  
    	if(sels){
    		   this.sels=sels; 
    	}   
    }
    
  }
};
</script>
<style scoped>
.el-breadcrumb__inner {
  font-size: 18px !important;
}
.dynamicList-title {
  border-bottom: dashed 1px #b3c0d1;
  margin-bottom: 10px;
  padding-bottom: 10px;
}
.el-table {
  margin: 50px auto;
  width: 80%;
}
.Img-page {
  margin-left: 114px;
}
.textImgType {
  width: 80%;
  height: 25px;
}
.dialogImg img {
  width: 80px;
}
.dynamicForm {
  width: 80%;
  margin: 50px auto;
}
.el-dialog__body {
  padding: 0;
}
.dynamicTitle {
  margin-bottom: 30px;
  font-size: 18px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #b3c0d1;
}
.addTitle {
  margin-left: 20px;
}
</style>




