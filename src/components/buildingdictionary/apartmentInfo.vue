<template>
    <div id="apartmentInfo">
        <el-row type="flex" justify="space-between" class="examine-title">
            <el-col :span="8">
                <breadcrumb :breadcrumbName="breadcrumbName"></breadcrumb>
            </el-col>
            <el-col :span="8">
                <el-button-group>
                    <el-button type="primary" size="small">高级搜索</el-button>
                    <el-button type="primary" size="small" >预览</el-button>
                    <el-button type="primary" size="small" @click="check">查看</el-button>
                    <el-button type="primary" size="small" @click="add">新增</el-button>
                    <el-button type="primary" size="small" @click="check">修改</el-button>
                    <el-button type="primary" size="small">删除</el-button>
                </el-button-group>
            </el-col>
        </el-row>
        <el-table :data="houseData" border @selection-change="selsChange"  ref="multipleTable" tooltip-effect="dark" class="apart-table">
            <el-table-column type="selection" reserve-selection="" label="ALL" width="50">
            </el-table-column>
            <el-table-column prop="id" label="序号" width='60'>
            </el-table-column>
            <el-table-column prop="house_type_name" label="户型编号">
            </el-table-column>
            <el-table-column prop="house_type" label="户型">
            </el-table-column>
            <el-table-column prop="houseData" width='140' label="产权面积范围">
            	<template slot-scope="scope">
            		{{scope.row.property_area_min+'-'+scope.row.property_area_max}}
            	</template>
            </el-table-column>
            <el-table-column prop="imgCount[3].count" label="平面图">
            </el-table-column>
            <el-table-column prop="imgCount[1].count" label="3D图">
            </el-table-column>
            <el-table-column prop="imgCount[2].count" label="效果图">
            </el-table-column>
            <el-table-column prop="imgCount[4].count" label="实景图">
            </el-table-column>
            <el-table-column prop="imgCount[0].count" label="户型图">
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
  name: "apartmentInfo",
  components: { breadcrumb },
  data() {
    return {
      breadcrumbName: [{ breadcrumbname: "户型信息", router: "" }],
      Data: [],
      tableData: [],
      pageSize: 5,
      alltablesize: [],
      addImgTypeVisible: false,
      changeImgTypeVisible: false,
      sels:[]
    };
  },
  beforeCreated(){
  	 
  },
  created() {
  	this.addData();
  },
  methods: {
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
    check() {
      let sels=this.sels;
      if(sels.length>1){
      	this.$message.error("查看只能单选")
      }else if(sels.length==1){
      	this.PhoAddSels(sels);
      	this.$router.push({ path:"/index/checkApartment"});
      }else{
      	this.$message.error("请选择查看内容")
      }
     
    },
    add(){
      	this.$router.push({ path:"/index/addHouseInfo"});
    },
    ...mapActions([
    	'addData'
    ]),
    ...mapMutations([
    	'PhoAddSels','PhoAddId','PhoHouseTypeName'
    ]),
    selsChange(sels){
    	if(sels){
    		this.sels=sels
    	}
    }
  },
  computed:{
    	...mapState({
    		houseData:state=>state.apartmentInfo.houseData
    	})
  },
  mounted(){
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
 margin-left: 90px;
}
.textImgType {
  width: 80%;
  height: 25px;
}
#apartmentInfo .el-main{
	padding-top:20px!important;
}
</style>




