<template>
  <div id="projectImg">
    <el-row type="flex" justify="space-between" class="examine-title">
      <el-col :span="8">
        <breadcrumb :breadcrumbName="breadcrumbName"></breadcrumb>
      </el-col>
      <el-col :span="8">
        <el-button-group>
          <el-button type="primary" size="small">高级搜索</el-button>
          <el-button type="primary" size="small">预览</el-button>
          <el-button type="primary" size="small" @click="check()">查看</el-button>
          <el-button type="primary" size="small" @click="addImgTypeVisible = true">新增</el-button>
          <el-button type="primary" size="small" @click="changeImgTypeVisible = true">修改</el-button>
          <el-button type="primary" size="small">删除</el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <el-table :data="ImgCount" @selection-change="selsChange" border ref="multipleTable" tooltip-effect="dark" class="project-table">
      <el-table-column  reserve-selection="" type="selection" width="50">
      </el-table-column>
       <el-table-column v-if="false" prop="type_id" width="60" label="序号">
      </el-table-column>
      <el-table-column prop="type_name" label="图片类别">
      </el-table-column>
      <el-table-column prop="count" label="图片总数">
      </el-table-column>
      
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="tableData.length" :pageSize="pageSize" @current-change="handleCurrentChange" class="Img-page">
    </el-pagination>
    <!-- 新增弹窗 -->
    <el-dialog title="提示" :visible.sync="addImgTypeVisible" width="50%">
      <el-form>
        <el-form-item label="图片类别:">
          <input type="text" class="textImgType">
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addImgTypeVisible = false">取 消</el-button>
        <el-button type="primary" @click="addImgTypeVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改弹窗 -->
    <el-dialog title="提示" :visible.sync="changeImgTypeVisible" width="50%">
      <el-form>
        <el-form-item label="图片类别:">
          <input type="text" class="textImgType">
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeImgTypeVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeImgTypeVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import breadcrumb from "@/components/shared/breadcrumb";
export default {
  name: "projectImg",
  components: { breadcrumb },
  data() {
    return {
      breadcrumbName: [{ breadcrumbname: "项目图片", router: "" }],
      Data: [],
      tableData: [],
      pageSize: 5,
      alltablesize: [],
      addImgTypeVisible: false,
      changeImgTypeVisible: false,
      sels:[]
    };
  },
  created() {
    //this.getProjectImgList();
    this.addImgs();
    this.getImgList();
    this.getconfig();
  },
  methods: {
    // 项目图片列表详情
    getProjectImgList() {
    	let url=this.Baseurl+"project/img/getNum";
      this.$http.get(url).then(res=>{
        this.tableData=res.data.data;
        this.page();
      })
    },
    page() {
      for (
        let i = 0;
        i < Math.ceil(this.tableData.length / this.pageSize);
        i++
      ){
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
    check() {
    	let sels=this.sels;
      if(sels.length>1){
      	this.$message.error("查看只能单选")
      }else if(sels.length==1){
      	this.AddImgTypeId(sels[0].type_id);
      	this.$router.push({ path: "/index/categoryImg" });
      }else{
      	this.$message.error("请选择查看内容")
      }
    },
    ...mapActions([
    	'addImgs','getImgList'
    ]),
    ...mapMutations([
    	'AddImgTypeId'
    ]),
    selsChange(sels){
    	if(sels){
    		this.sels=sels;
    		console.log(sels);
    	}
    },
    getconfig(){
    	let url=this.Rooturl+"config";
			this.$http.get(url)
				.then(res=>{
						console.log(res.data);
				})
    }
  },
  computed:{
  	...mapState({
  		ImgCount:state=>state.projectImg.ImgCount
  	})
  }
};
</script>
<style scoped>
.el-breadcrumb__inner {
  font-size: 18px !important;
}
.examine-title {
  border-bottom: dashed 1px #b3c0d1;
  margin-bottom: 10px;
  padding-bottom: 10px;
}
.el-table {
  width: 80%;
  margin: 50px auto;
}
.Img-page {
  margin-left: 114px;
}
.textImgType {
  width: 80%;
  height: 25px;
}
</style>


