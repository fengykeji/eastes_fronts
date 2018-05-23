<template>
	<div id="planPho">
		<el-row class="apart-lay-list">
                    <el-col :span="4">
                        <el-checkbox v-model="checkAlls" @change="handleCheckAllChange" class="apart-title">平面图</el-checkbox>
                    </el-col>
                    <el-col :span="7" :offset="13">
                        <el-button-group>
                            <el-button type="primary" size="mini">预览</el-button>
                            <el-button type="primary"  @click="checkTable" size="mini">查看</el-button>
                            <el-button type="primary" size="mini" @click="addImgVisible = true">新增</el-button>
                            <el-button type="primary" @click="changeTable" size="mini">修改</el-button>
                            <el-button type="primary" size="mini">删除</el-button>
                        </el-button-group>
                    </el-col>
                </el-row>
                <el-table :data="Data" border @selection-change="selsChange" style="width: 100%" ref="multipleTable" tooltip-effect="dark" class="cate-table">
                    <el-table-column type="selection" reserve-selection="" label="ALL" width="50" prop="chk">
                    </el-table-column>
                    <el-table-column prop="pictureOrder" label="图片顺序">
                    </el-table-column>
                    <el-table-column prop="imgPath" label="图片">
                        <template slot-scope="scope">
                            <img :src="scope.row.imgPath" alt="" class="baseImg">
                        </template>
                    </el-table-column>
                    <el-table-column prop="remarks" label="备注">
                    </el-table-column>
                    <el-table-column prop="update" label="更新人员">
                    </el-table-column>
                    <el-table-column prop="ordering" label="调序">
                        <template slot-scope="scope">
                            <i class="el-icon-upload2" @click="order(scope.row.pictureOrder)"></i>
                            <i class="el-icon-download"></i>
                        </template>
                    </el-table-column>
                </el-table>
            <el-pagination background layout="prev, pager, next" :total="tableData.length" :pageSize="pageSize" @current-change="handleCurrentChange" class="cate-page">
            </el-pagination>  
            <!--新增效果-->
            <el-dialog title="新增" :visible.sync="addImgVisible">
            <el-form ref="form" :model="ruleFormUplode" label-width="100px" size="small">
                <el-form-item label="添加文件:">
                    <el-upload action="/api/project/file/upload"  :data="{file_name:'img'}" name="img"  list-type="picture-card" :before-upload="beforeImgUpload" :on-success="addImgSuccess">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="upImgVisible">
                        <img width="100%" :src="upImgVisibleUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item label="备注:">
                    <el-input type="textarea" autosize placeholder="请输入内容" v-model="ruleFormUplode.remarks">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addImgVisible = false">取 消</el-button>
                <el-button type="primary">确 定</el-button>
            </span>
        </el-dialog>
        <!--查看图片弹窗-->
        <el-dialog title="查看" :visible.sync="checkImgVisible">
            <el-form ref="form" :model="ruleFormUplode" label-width="100px" size="small">
                <el-form-item label="添加文件:">
                    <img width="100%" :src="checkImgurl" alt="">
                </el-form-item>
                <el-form-item label="备注:">
                    <el-input type="textarea" autosize placeholder="请输入内容" v-model="ruleFormUplode.remarks">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="checkImgVisible = false">关闭</el-button>
            </span>
        </el-dialog>
        <!-- 修改图片-->
        <el-dialog title="修改" :visible.sync="changeImgVisible">
            <el-form ref="form" :model="change"  label-width="140px" size="small">
            	<el-form-item label="原来的图片:">
            		    <img width="146px" height="146px" :src="change.imgPath" alt="">
            	</el-form-item>	
                <el-form-item label="添加替换的图片:">
                    <el-upload action=""   ref="newfile"  :on-change="ChangeCheck" :auto-upload="false"  :on-exceed="exceed" :limit="1"  :data="{file_name:'img'}" name="img" list-type="picture-card" :before-upload="beforeImgUpload" :on-success="addImgSuccess">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                 	  <el-dialog :visible.sync="checkAll" >
                        <img width="100%" :src="upImgVisibleUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item label="备注:">
                    <el-input type="textarea" max="200" placeholder="请输入内容" v-model="change.remarks">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="changeImgVisible = false">关闭</el-button>
                <el-button type="primary" @click="AddNew">确 定</el-button>
            </span>
        </el-dialog>
	</div>
</template>
<script>
import {mapState,mapActions,mapMutations} from 'vuex'	
export default {
  name: "palnPho",
  data() {
    return {
      ruleFormcheckApart: {
        houseNum: "",
        house: "",
        min_area: "",
        max_area: "",
        sell: ""
      },
      ruleFormUplode: {
        remarks: ""
      },
      Data: [],
      tableData: [],
      pageSize: 5,
      alltablesize: [],
      checkAll: false,
      checkAlls: false,
      checkTableAll: false,
      isIndeterminate: false,
      seeImgVisible:false,
      upImgVisibleUrl: "",
      change:{},
      changeData:{},
      upImgVisible: false,
      addImgVisible: false,
      checkImgVisible:false,
      changeImgVisible:false,
      checkImgurl:"/static/img/generalpic.jpg",
      changeImgupUrl:this.Rooturl+"project/file/upload",
      sels:[],
      changeVisible:false
    }
  },
  created() {
  	
   // this.getCheckApartmentList();
    
  },
  methods: {
    getCheckApartmentList() {
      for (let i = 1; i <20; i++) {
        this.tableData.push({
          chk: false,
          pictureOrder: i,
          imgPath: "",
          remarks: "******",
          update: "张三",
          ordering: "",
          imgPath: "/static/img/generalpic.jpg"
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
    handleCheckAllChange() {
      //this.checkAlls = true;
      this.Data[0].chk = true;
      console.log(this.Data);
      console.log(this.Data[0].chk);
    },
    // 验证图片格式大小
    beforeImgUpload(file) {
      console.log(file);
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
    // 上传图片成功
    addImgSuccess(res, file) {
      console.log(res);
      console.log(file);
      let imgUrl = res.data;
      this.seeImgVisible = imgUrl;
    },
    back(){
    	this.$router.push({path:"/index/apartmentInfo"});
    },
    exceed(){
    	this.$message.error("请先删除原来的图片")
    },
    AddNew(){
    	let url=this.Rooturl+"project/houseType/update"
    	this.$http.get(url,{
    		params:{
    			...this.changeData
    		}
    	}).then(res=>{
    		this.changeImgVisible = false;
    		this.upImgVisible=false;
    	}).catch(err=>{
    		
    	})
    	
    },
    order(){
    	let url=this.Rooturl+"config";
    	this.$http.get(url,{
    		params:{
    		   
    		}
    	}).then(res=>{
    		console.log(res.data);
    	})
    },
    checkTable(){
      let sels=this.sels;
      if(sels.length>1){
      	this.$message.error("查看只能单选")
      }else if(sels.length==1){
      	this.change=this.sels[0];

      	this.checkImgVisible=true;
      }else{
      	this.$message.error("请选择查看内容")
      }
 
    },
    changeTable(){
      let sels=this.sels;
      if(sels.length>1){
      	this.$message.error("查看只能单选")
      }else if(sels.length==1){
      	this.change=this.sels[0];
      	this.upImgVisible=true;
      	this.changeImgVisible=true;
      	this.changeVisible=true;
      }else{
      	this.$message.error("请选择查看内容")
      }
      
    },
    ChangeCheck(file){	
    	this.changeData={
    		...this.change
    	}
       	this.changeData.imgPath=file.url;
    },
    selsChange(sels) {  
    	if(sels){
    		   this.sels=sels; 
    	}   
    }
  
  }    
}  
</script>
<style>
.CheckApartinfo {
  height: 40px;
  line-height: 40px;
  margin-bottom: 20px;
  color:#fff;
  background-color: #545c64;
}
.checkInfo-form {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 20px auto;
  width: 750px;
  padding: 0px 35px 10px 35px;
}
.el-main {
  padding: 0;
}
.apart-title {
  display: block;
  margin-left: 20px;
}
.CheckApart-title {
  display: block;
  margin-left: 20px;
}
#checkApartment .check-con {

  border: 1px solid #d3dce6;
}
.apart-lay-list {
  line-height: 50px;
  height: 50px;
  margin-bottom: 20px;
  border-top: 1px solid #d3dce6;
  border-bottom: 1px solid #d3dce6;
}
.baseImg {
  width: 50px;
}
.el-icon-upload2,
.el-icon-download {
  font-size: 20px;
  color: #409eff;
  cursor: pointer;
}
#checkApartment .el-header{
	padding: 0px!important;
}
</style>