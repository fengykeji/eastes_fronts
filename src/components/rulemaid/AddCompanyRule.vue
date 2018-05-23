<template>
<div id="AddCompanyRule">	
<el-form id="AddTotalRule" ref="form" :rules="rules"  :model="form"  label-width="160px">
<el-row style="height:40px;padding-left:40px;background:#545c64 ;">
	<el-col :span="12">
		<span class="check-basetitle">新增公司规则</span>
	</el-col>
	<el-col :span="7" :push="5" >
		 <el-form-item>
    		<el-button size="small" type="primary" @click="onSubmit">确认</el-button>
    		<el-button size="small" @click="back" >取消</el-button>
  		</el-form-item>
	</el-col>
</el-row>
<el-row>
    <el-col :span="8">
    	 <el-form-item prop="project_name" label="甲方单位：">
    			<el-input v-model="form.project_name" type="text" placeholder="请输入甲方单位名称" style="width: 100%;"></el-input>
  		</el-form-item>
    </el-col> 
    <el-col :span="8">
    	 <el-form-item prop="project_docker" label="甲方对接人：">
    			<el-input v-model="form.project_docker"  placeholder="请输入甲方对接人姓名" style="width: 100%;"></el-input>
  		</el-form-item>
    </el-col>
    <el-col :span="8">
    	 <el-form-item prop="project_docker_tel" label="甲方对接人电话：">
    			<el-input v-model="form.project_docker_tel"  placeholder="请输入甲方对接人电话" type="tel" style="width: 100%;"></el-input>
  		</el-form-item>
    </el-col>
</el-row>
<el-row>
    <el-col :span="8">
    	 <el-form-item prop="sell_id" label="乙方单位：">
    			<el-input v-model="form.sell_id"  placeholder="请输入乙方单位" style="width: 73%;"></el-input>
  				<el-button @click="chosseCompanyRule" type="primary" size="small" >选择</el-button>
    	 </el-form-item>
    </el-col> 
    <el-col :span="8">
    	 <el-form-item  prop="sell_docker" label="乙方对接人：">
    			<el-input v-model="form.sell_docker"  placeholder="请输乙方对接人姓名"  style="width: 100%;"></el-input>
  		</el-form-item>
    </el-col>
    <el-col :span="8">
    	 <el-form-item prop="sell_docker_tel" label="乙方对接人电话：">
    			<el-input v-model="form.sell_docker_tel"  placeholder="请输入乙方对接人电话" type="tel" style="width: 100%;"></el-input>
  		</el-form-item>
    </el-col>
</el-row>
<el-row >	
   	<el-col :span="11">
   	  <el-form-item prop="compact_begin"  label="*合同开始日期">
         <el-date-picker type="date" placeholder="选择日期" v-model="form.compact_begin" style="width: 100%;"></el-date-picker>
      </el-form-item>
   	</el-col>
    <el-col :span="11">
    	 <el-form-item prop="compact_end"  label="*合同截止日期">
           <el-date-picker type="date"  placeholder="选择日期" v-model="form.compact_end" style="width: 100%;"></el-date-picker> 
 	    </el-form-item>
 	</el-col>    
</el-row> 	    
<el-row >	
   	<el-col :span="11">
   	  <el-form-item prop="compact_begin" label="*实际开始日期">
         <el-date-picker type="date" placeholder="选择日期" v-model="form.compact_begin" style="width: 100%;"></el-date-picker>
      </el-form-item>
   	</el-col>
    <el-col :span="11">
    	 <el-form-item prop="compact_end"  label="*实际截止日期">
           <el-date-picker type="date" placeholder="选择日期" v-model="form.compact_end" style="width: 100%;"></el-date-picker> 
 	    </el-form-item>
 	</el-col>    
</el-row> 	    
</el-form>
    <addcompanyrulefile ></addcompanyrulefile>
    
    <dealcompanyruletable></dealcompanyruletable>
    <companyvisitbrokeragetable></companyvisitbrokeragetable>
	<companyintrobroker></companyintrobroker>
	<div class="attachment m_top" >
		<el-row type="flex" justify="space-between" class="dynamicList-title m_bottom">
            <el-col :span="16"   :push="1" class="Commissio_title">
                <font style="font-size:16px;color:#666">合作项目记录</font>
            </el-col>
            <el-col :span="5">  
            </el-col>
        </el-row>
        
        <el-table v-if="Data.length>0" :data="Data" border  ref="multipleTable" tooltip-effect="dark" class="apart-table">
            <el-table-column type="selection"  label="ALL" width="50">
            </el-table-column>
            <el-table-column prop="key" label="序号" width="60">
            </el-table-column>
            <el-table-column prop="companyName" label="项目名称" >
            </el-table-column>
            <el-table-column prop="customerName" label="公司名称"  >
            </el-table-column>
            <el-table-column prop="phone" label="开始时间" >
            </el-table-column>
            <el-table-column prop="planeTime" label="截止时间" >
            </el-table-column> 
               <el-table-column prop="planeTime" label="区域" >
            </el-table-column> 
            <el-table-column prop="planeTime" label="推荐客户数量" >
            </el-table-column>
            <el-table-column prop="planeTime" label="到访数量" >
            </el-table-column>
            <el-table-column prop="planeTime" label="成交数量" >
            </el-table-column>
        </el-table>
        <el-pagination v-if="false" background layout="prev, pager, next" :total="tableData.length" :pageSize="pageSize" @current-change="handleCurrentChange" class="Img-page">
        </el-pagination>
        <div class="tips"  v-if="!Data.length>0">
        	暂无合作记录
        </div>
    </div> 
	
</div>
</template>

<script>
import {mapMutations,mapState,mapActions} from 'vuex'
import addcompanyrulefile from './AddCompanyRuleFile'
import dealcompanyruletable from './DealCompanyRuleTalble'
import companyvisitbrokeragetable from './CompanyVisitBrokerageTable'
import companyintrobroker from './CompanyIntroBrokerage'

import qs from 'qs'
export default {
 	 name: "AddCompanyRule",
 	 data(){
 	 	const checkPho=(rule,value,callback)=>{
 	 		let Regex= /^1\d{10}$/;
 	 		if(!Regex.test(value)){
 	 			callback(new Error('手机号码错误'));
 	 		}else if(!value){
 	 			callback(new Error('不能为空'));
 	 		}else{
 	 			callback();
 	 		}
 	 	};
 	 	return{
 	 		DealSels:[],
 	 		VisitSels:[],
 	 		IntroSels:[],
 	 		fileList:[],
 	 		canUpload:false,	
 	 		title:"结佣规则",
 	 		Data: [],
     		tableData: [],
            pageSize: 8,
            alltablesize: [],      
            form: {
         		project_name:'',
 				project_docker:'',
   				project_docker_tel:'',
   				sell_id:'',
  				sell_docker:'',
  				sell_docker_tel:'',
   				compact_begin:'',
    			compact_end:'',
    			has_file:''
        	},
        	rules:{
        		project_name:[
        			{required:true,message:'不能为空',trigger:'blur'}
        		],
        		project_docker:[
        			{required:true,message:'不能为空',trigger:'blur'}
        		],
        		project_docker_tel:[
        			{validator:checkPho,trigger:'blur'}
        		],
        		sell_id:[
        			{required:true,message:"不能空",trigger:'blur'},
        			{min:1,max:10,message:'长度不能超过10',trigger:'blur'}
        		],
        		sell_docker:[
        			{required:true,message:"不能空",trigger:'blur'},
        			{min:1,max:10,message:'长度不能超过10',trigger:'blur'}
        		],
        		sell_docker_tel:[
        			{validator:checkPho,trigger:'blur'}
        		],
        		compact_begin:[
        			{required:true,message:'不能为空',trigger:'blur'}
        		],
        		compact_end:[
        			{required:true,message:'不能为空',trigger:'blur'}
        		],
        		arc_start_time:[
        			{required:true,message:'不能为空',trigger:'blur'}
        		],
        		arc_end_time:[
        			{required:true,message:'不能为空',trigger:'blur'}
        		],
        		file_name:[
        			{required:true,message:'不能为空',trigger:'blur'}
        		],
        		file_url:[
        			{required:true,message:'不能为空',trigger:'blur'}
        		],
        		file_remark:[
        			{required:true,message:'不能为空',trigger:'blur'}
        		],
        		upload_person:[
        			{required:true,message:'不能为空',trigger:'blur'}
        		],
        		upload_time:[
        			{required:true,message:'不能为空',trigger:'blur'}
        		]
        	}
        	
        
           
        }
 	},
 	methods:{
 		getApartmentInfoImgList() {
      		for (let i = 1; i < 2; i++) {
       		  this.tableData.push({
          		key: i,
          		recommendNum: "TJBH"+i,
         		customerName: "否",
         		phone: "固定金额",
          		state: "待审核",      		
          		type: "执行中",
          		companyName:"住宅、公寓",
          		planeTime:"人民币",
          		planeEndTime:"https://www.jianshu.com/p/5af06fdd8796",
          		sureTime:"2017/01/08",
         		sureEndTime:"2017/01/08"   
             });
       }
       this.page();
       },
       page() {
        for (let i = 0;i < Math.ceil(this.tableData.length / this.pageSize); i++){
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
      check(){
      	 this.$router.push({ path:"/index/CommissioCheck"});
      },
      onSubmit() {
      	this.checkArtureTime();
        this.$refs.form.validate((valid)=>{
        	if(valid&&this.canUpload){
        		this.AddComRules(this.form);
        	}
        })
      },
      back(){
      	 this.$router.push({ path: "/index/CommissioCheck" });
      },
      chosseCompanyRule(){
      	this.$router.push({ path: "/index/choseCompany" });
      },
      check(){
        let sels=this.sels;
        if(sels.length>1){
      	  this.$message.error("查看只能单选")
        }else if(sels.length==1){
      	  this.addComRule(sels[0].key);
      	  this.$router.push({path: '/index/ckBeConfirmed'})
        }else{
      	  this.$message.error("请选择查看内容")
        }
      },
      //selsChange
      VisitSelsChange(sels){
      	if(sels){
      		this.VisitSels=sels;
      	}
      },
      //selsChange
      ...mapMutations([
    	 'addsels'
      ]),
      ...mapActions([
      	'AddComRules'
      ]),
       //begin-dialog
      
   	  //end-dialog
   	  checkOrderTime(){
   	  	if(this.compact_begin>this.compact_end){
   	  		this.$message.error("合同的开始时间不能大于合同结束时间");
   	  		this.canUpload=false;
   	  	}else if(!this.compact_begin){
   	  		this.$message.error("合同的开始时间不能为空");
   	  		this.canUpload=false;
   	  	}else if(!this.compact_end){
   	  		this.$message.error("合同的结束时间不能为空");
   	  		this.canUpload=false;
   	  	}else{
   	  		this.canUpload=true;
   	  	}
   	  },
   	  checkArtureTime(){
   	  	if(this.compact_begin>this.compact_end){
   	  		this.$message.error("合同的开始时间不能大于合同结束时间");
   	  		this.canUpload=false;
   	  	}else if(!this.compact_begin){
   	  		this.$message.error("合同的开始时间不能为空");
   	  		this.canUpload=false;
   	  	}else if(!this.compact_end){
   	  		this.$message.error("合同的结束时间不能为空");
   	  		this.canUpload=false;
   	  	}else{
   	  		this.canUpload=true;
   	  	}
   	  },
   	  
 	},
 	created(){
 		this.getApartmentInfoImgList();	
 		
 	},
 	computed:{
 		...mapState({
 			ComRules:state=>state.CheckCompanyRule.ComRules
 		})
 	},
 	components:{
 		addcompanyrulefile,
 		dealcompanyruletable,
 		companyvisitbrokeragetable,
 		companyintrobroker
 	}
}
</script>

<style scoped lang="scss">
#AddCompanyRule{
	.Commissio_title{
		height:32px;
		line-height:32px;
	}
	.dynamicList-title{
		margin-bottom:20px;
	}
	
	.el-date-picker {
 		 width: 275px !important;
	}
	.check-basetitle{
		height:40px;
		line-height:40px;
		color:#fff;
	}
	.m_bottom{
		margin-bottom:20px;
		border:1px solid #ddd;
	}
	.m_top{
		margin-top:50px;
	}
	.Commissio_title{
		line-height:32px;
	}
	.tips{
		width:100%;
		height:60px;
		line-height:50px;
		text-align: center;
		border-left:1px solid #ddd;
		border-right:1px solid #ddd;
		border-bottom:1px solid #ddd;
	}
}		
	#CheckCompanyRule .el-form{
		margin-top:0px;
	}
	
	
	
	
</style>