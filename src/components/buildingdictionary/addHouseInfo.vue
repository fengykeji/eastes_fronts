<template>
    <div id="addHouseInfo">
        <el-container>
            <el-header>
                <el-row class="CheckApartinfo" type="flex" justify="space-between">
                    <el-col :span="5">
                        <span class="CheckApart-title">新增户型信息</span>
                    </el-col>
                    <el-col :span="4">
                    	<el-button type="primary" @click="add" size="small" >新增</el-button>
                        <el-button @click="back" size="small" >关闭</el-button>
                    </el-col>
                </el-row>
            </el-header>
            <el-main class="check-con">  
                <el-form :model="ruleFormcheckApart" :rules="rules" ref="form" label-width="100px" class="checkInfo-form">
                    <el-form-item  prop="houseID" label="户型编号:">
                        <el-input v-model="ruleFormcheckApart.houseNum">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="houseType" label="户型:">
                        <el-input v-model="ruleFormcheckApart.house">
                        </el-input>
                    </el-form-item>
                    <el-row>
                    <el-col :span="11">
                    <el-form-item prop="min_squre" label="产权面积:">
                            <el-input  v-model="ruleFormcheckApart.min_area">
                                <template slot="append">m
                                    <sup>2</sup>
                                </template>
                            </el-input>
                 
                     </el-form-item>  
                     </el-col>
                        <el-col :span="2">
                            <i style="height:40px;width:100%;line-height:40px;text-align: center;" class="el-icon-minus"></i>
                        </el-col>
                    <el-form-item prop="max_squre" >    
                        <el-col :span="11">
                            <el-input v-model="ruleFormcheckApart.max_area">
                                <template slot="append">m
                                    <sup>2</sup>
                                </template>
                            </el-input>
                        </el-col>
                    </el-form-item>
                    </el-row>
                    <el-form-item prop="sell_point" label="户型卖点:">
                        <el-input type="textarea" autosize v-model="ruleFormcheckApart.sell">
                        </el-input>
                    </el-form-item>
                </el-form>
            </el-main>
            <el-row class="row_m_top">
            	<palnPho></palnPho>
            </el-row>
            <el-row class="row_m_top">
            	<thressDPic></thressDPic>
            </el-row>
  			<el-row class="row_m_top">
  				<LivePic></LivePic>
  			</el-row>
  			<el-row class="row_m_top">
  				<effectPic></effectPic>
  			</el-row>
				
        </el-container>
        <!-- 新增图片弹窗 -->
    </div>
</template>
<script>
import palnPho from './palnPho'	 
import thressDPic from './thressDPic'
import LivePic  from './LivePic'
import effectPic from './effectPic'
import {mapState,mapActions} from 'vuex'
export default {
  name: "addHouseInfo",
  data() {
  	const checkNum=(rule,value,callback)=>{
  			 if(value != null && value != "") {
             if(!(typeof(value)==="number"&&value%1==0)) {
                 callback(new Error('请输入正整数!'))
             }else if(value>999){
                  callback(new Error("不能大于9999"))
             }else{
             	callback()
             }
        }
	 	else if(!value){
	 	 	callback(new Error("不能为空"));
	 	}
         else{
              callback();
         }
  	};
    return {
      ruleFormcheckApart: {
        houseNum: "",
        house: "",
        min_area: "",
        max_area: "",
        sell_point: ""
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
      upImgVisibleUrl: "",
      upImgVisible: false,
      addImgVisible: false,
      checkImgVisible:false,
      changeImgVisible:false,
      rules:{
      	houseID:[
      		{required:true,message:'错误',trigger:'blur'},
      		{min:1,max:10,message:'长度超出范围',trigger:'blur'}
      	],
      	houseType:[
      		{required:true,message:'错误',trigger:'blur'}
      	],
      	min_squre:[
      		{validator:checkNum,trigger:'blur'}
      	],
      	max_squre:[
      		{validator:checkNum,trigger:'blur'}
      	],
      	sell_point:[
      		{required:true,message:'不能为空',trigger:'blur'},
      		{min:1,max:200,message:'长度不对',trigger:'change'}
      	]
      }
      
    }
  },
  created() {
    this.getCheckApartmentList();
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
    addImgSuccessP(res,file){
      let imgUrlP = res.data;
      seeImgVisible = imgUrl;
      console.log(res);
    },
    addImgSuccessS(res,file){
      let imgUrlS = res.data;
      seeImgVisible = imgUrl;
      console.log(res);
    },
    addImgSuccessT(res,file){
      let imgUrlT = res.data;
      seeImgVisible = imgUrl;
      console.log(res);
    },
    addImgSuccessX(res,file){
      let imgUrlX = res.data;
      seeImgVisible = imgUrl;
      console.log(res);
    },
    back(){
    	this.$router.push({path:"/index/apartmentInfo"});
    },
    add(){
    	this.$refs.form.validate((valid)=>{
    		if(valid){
    			this.houseAdd(this.ruleFormcheckApart);
    			if(this.clear==200){
    				this.$refs.form.resetFields();
    				this.$message.success('新增成功')
    			}
    			if(this.clear==400){
    				this.$message.error(this.msg)
    			}
    		}
    	})
    },
    ...mapActions([
    	'houseAdd'
    ])
  },
  components:{
  	palnPho,
  	thressDPic,
  	LivePic,
  	effectPic
  },
  computed:{
  	...mapState({
  		clear:state=>state.addHouseInfo.clear,
  		msg:state=>state.addHouseInfo.msg
  	})
  }
};
</script>
<style scoped lang="scss">
#addHouseInfo{
 .CheckApartinfo{
  height: 40px;
  line-height: 40px;
  margin-bottom: 20px;
  color:#fff;
  background-color: #545c64;
}
.row_m_top{
	margin-top:40px!important;
}
 .checkInfo-form{
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 20px auto;
  width: 750px;
  padding: 0px 35px 10px 35px;
}
.el-main{
  padding: 0;
}
 .apart-title{
  display: block;
  margin-left: 20px;
}
.CheckApart-title{
  display: block;
  margin-left: 20px;
}
.check-con{

  border: 1px solid #d3dce6;
}
 .apart-lay-list{
  line-height: 50px;
  height: 50px;
  margin-bottom: 20px;
  border-top: 1px solid #d3dce6;
  border-bottom: 1px solid #d3dce6;
}
.baseImg{
  width: 50px;
}
.el-icon-upload2,
.el-icon-download{
  font-size: 20px;
  color: #409eff;
  cursor: pointer;
}
.el-header{
	padding: 0px!important;
}
.nav{
	height:40px;
	box-sizing: border-box;
	padding-left:20px;
}
.nav  a{
	margin-left:10px;
	padding:3px 9px;
	border:1px solid #ddd;
	color:#409EFF;
	background: #fff;
}
.nav  a:hover{
	color:#fff;
	background: #409EFF;
	
}

}
</style>


