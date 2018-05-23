<template>
  <div id="generalLayout">
    <el-container>
      <el-header>
        <el-col class="geninfo">
          <span class="gen-title">总平图</span>
        </el-col>
      </el-header>
      <el-main>
        <el-row v-if="upImgVisibleUrl!==''">
          <el-col :span="13" :offset="4" class="gen-con">
            <img :src="upImgVisibleUrl" alt="">
          </el-col>
          <el-col :span="5" :offset="1">
            <el-row>
              <el-button type="primary" style="width:80px;" size="small" @click="seeImgVisible = true">预览</el-button>
              <el-dialog :visible.sync="seeImgVisible" width="90%">
                <img :src="upImgVisibleUrl" alt="" class="seeImg">
              </el-dialog>
            </el-row>
            <el-row>
              <el-button class="gen-btn" style="width:80px;" size="small" type="primary" @click="changeImgVisible = true">修改图片</el-button>
              <el-dialog title="新增:" :visible.sync="changeImgVisible">
                <el-form ref="form" :model="ruleFormUplode" label-width="100px" size="small">
                  <el-form-item label="添加文件:">
                    <el-upload action="" list-type="picture-card">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="upImgVisible">
                      <img width="100%" :src="upImgVisibleUrl" alt="">
                    </el-dialog>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button size="small" @click="changeImgVisible = false">取 消</el-button>
                  <el-button type="primary" size="small" @click="changeImgVisible = false">确 定</el-button>
                </span>
              </el-dialog>
            </el-row>
            <el-row>
              <el-button style="width:80px;" size="small" type="primary">删除</el-button>
            </el-row>
          </el-col>
        </el-row>

        <el-row v-if="upImgVisibleUrl===''">
          <el-col :span="13" :offset="4" class="gen-con">
            <el-row>
              <el-col class="addBuildingImg">
                还没有楼栋图片,
                <span @click="addImgVisible = true">前去添加！</span>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-row>
              <el-button type="primary">预览</el-button>
            </el-row>
            <el-row>
              <el-button class="gen-btn" type="primary" @click="addImgVisible = true">新增</el-button>
              <el-dialog title="新增:" :visible.sync="addImgVisible">
                <el-form ref="form" :model="ruleFormUplode" label-width="100px" size="small">
                  <el-form-item label="添加文件:">
                    <el-upload action="" list-type="picture-card">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="upImgVisible">
                      <img width="100%" :src="upImgVisibleUrl" alt="">
                    </el-dialog>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="addImgVisible = false">取 消</el-button>
                  <el-button type="primary" @click="addImgVisible = false">确 定</el-button>
                </span>
              </el-dialog>
            </el-row>
            <el-row>
            </el-row>
          </el-col>
        </el-row>
        <el-row v-if="upImgVisibleUrl!==''">
          <el-col class="gen-lay">
            <span class="gen-title">楼栋设置</span>
          </el-col>
          <el-col class="gen-lay-info">
            <el-button v-for="(item,idx) in YsBuild" type="primary" @click="buildDetail($event)" :key="idx"  :id="item.build_id" size="mini">{{item.build_name}}</el-button>
          </el-col>
          <el-row class="gen-lay-list">
            <el-col :span="5">
              <span class="gen-title">楼栋信息</span>
            </el-col>
            <el-col :span="5" :offset="14">
              <el-button-group>
                <el-button type="primary" size="mini" @click="ToNewInfo">查看</el-button>
                <el-button type="primary" @click="ToAddInfo" size="mini">新增</el-button>
                <el-button type="primary" @click="ToNewInfo" size="mini">修改</el-button>
                <el-button type="primary" @click="DeleteInfo" size="mini">删除</el-button>
              </el-button-group>
            </el-col>
          </el-row>
          <el-table :data="builds" border style="width: 100%"  @selection-change="selsChange" ref="multipleTable" tooltip-effect="dark" size='mini'>
            <el-table-column type="selection" reserve-selection="" width="50">
            </el-table-column>
            <el-table-column prop="build_id" label="序号" width="55">
            </el-table-column>
            <el-table-column prop="build_name" label="名称" width="85">
            </el-table-column>
            <el-table-column prop="sale_permit" label="预售许可证编号" width="155">
            </el-table-column>
            <el-table-column prop="permit_time" label="发证时间" width="90">
            </el-table-column>
            <el-table-column prop="open_way" label="开盘方式" width="90">
            </el-table-column>
            <el-table-column prop="open_time" label="开盘时间" width="90">
            </el-table-column>
            <el-table-column prop="update_time" label="交房时间" width="100">
            </el-table-column>
            <el-table-column prop="unit_num" label="单元数" width="80">
            </el-table-column>
            <el-table-column prop="ladder_ratio" label="梯户比" width="80">
            </el-table-column>
            <el-table-column prop="total_house_num" label="总户数" width="80">
            </el-table-column>
            <el-table-column prop="upper_floor_num" label="楼上层数" width="80">
            </el-table-column>
            <el-table-column prop="down_floor_num" label="楼下层数" width="80">
            </el-table-column>
          </el-table>
          <el-pagination background layout="prev, pager, next" :total="tableData.length" :pageSize="pageSize" @current-change="handleCurrentChange">
          </el-pagination>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import {mapMutations,mapActions,mapState} from 'vuex'
export default {
  name: "generalLayout",
  data() {
    return {
      Data: [],
      tableData: [],
      pageSize: 5,
      alltablesize: [],
      changeImgVisible: false,
      addImgVisible: false,
      upImgVisible: false,
      seeImgVisible:false,
      ruleFormUplode: {},
      upImgVisibleUrl: "/static/img/generalpic.jpg",
      sels:[]
    }
  },
  created() {
    this.getYsBuild();
    this.getBindBuild();
  },
  methods: {
    // 验证图片格式大小
    beforeImgUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
    },
    handleCurrentChange(val) {
      this.Data = this.alltablesize[val - 1];
    },
    buildDetail(e){
    	let src=e.currentTarget;
    	this.generalLayout(src.id);
    	this.$router.push({path:"/index/BuildingDetail"})
    },
    ...mapMutations([
    	 'generalLayout','addProId','addBuidData'
    ]),
    ToAddInfo(){
    	 this.$router.push({ path: "/index/AddInfo" });
    },
    ToNewInfo(){
      let sels=this.sels;
      if(sels.length>1){
      	this.$message.error("查看只能单选")
      }else if(sels.length==1){
      	this.addProId(sels[0]);
      	this.addBuidData(sels[0]);
      	this.$router.push({path: '/index/checkInfo'})
      }else{
      	this.$message.error("请选择查看内容")
      }
      
    },
    selsChange(sels) {  
    	if(sels){
    		   this.sels=sels; 
    		   console.log(sels)
    	}   
    },
    DeleteInfo(){
    	let sels=this.sels;
    	let url=this.Rooturl+'';
      if(sels.length>1){
      	this.$message.error("查看只能单选")
      }else if(sels.length==1){
      	this.addProId(sels);
      	this.$http.get(url,{
      		params:{
      			
      		}
      	}).then(res=>{
      		if(res.code==200){
      			this.$message.success("删除成功");
      		}
      	})
      }else{
      	this.$message.error("请选择删除内容")
      }
    },
    ...mapActions([
    	'getYsBuild','getBindBuild'
    ])
  },
  computed:{
    	...mapState({
    		YsBuild:state=>state.generalLayout.YsBuild,
    		builds:state=>state.generalLayout.builds
    	})
  }
};
</script>
<style scoped>
.el-header {
  padding: 0px;
}
.geninfo {
  height: 40px;
  line-height: 40px;
  margin-bottom: 20px;

  background-color: #545c64;
}
.gen-title {
  display: block;
  margin-left: 20px;
 
  font-size: 16px;
}
.el-header .gen-title{
	color:#fff;
}
.gen-btn {
  margin: 10px 0px;
}
.gen-lay {
  height: 30px;
  margin-top: 20px;
  border: 1px solid #d3dce6;
  line-height: 30px;
}
.seeImg {
  width: 100%;
}
.addBuildingImg {
  width: 100%;
  height: 500px;
  text-align: center;
  padding-top: 20px;
  border: 1px solid #d3dce6;
}

.addBuildingImg span {
  color: #008000;
  text-decoration: underline #008000;
  cursor: pointer;
}
.gen-con img {
  width: 100%;
}
.gen-lay-info {
  height: 80px;
  margin-top: 5px;
  border: 1px solid #d3dce6;
}
.gen-lay-info .el-button {
  margin: 21px 0px 0px 20px;
}
.gen-lay-list {
  height: 40px;
  line-height: 40px;
  margin-top: 140px;
  border: 1px solid #d3dce6;
}

.el-pagination {
  margin-top: 20px;
}
#generalLayout .el-button{
	
}
</style>


