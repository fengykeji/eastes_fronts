<template>
<div id="CheckCompanyRule">	
<el-form id="AddTotalRule" ref="form" :rules="rules"  :model="form"  label-width="160px">
<el-row style="height:40px;padding-left:40px;background:#545c64 ;">
	<el-col :span="12">
		<span class="check-basetitle">查看公司规则</span>
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
    <div class="attachment m_top" >
		<el-row type="flex" justify="space-between" class="dynamicList-title m_bottom">
            <el-col :span="16"   :push="1" class="Commissio_title">
                <font style="font-size:16px;color:#666"> 附件</font>
            </el-col>
            <el-col  :span="5">
                <el-button-group>            
                    <el-button type="primary"  @click="showCheckDialog" size="small">查看</el-button>
                    <el-button type="primary" @click="showDialog" size="small">新增</el-button>
                    <el-button type="primary" @click="showCheckDialog" size="small" >修改</el-button>
                    <el-button type="primary" @click="deleFile" size="small" >删除</el-button>
                </el-button-group>
            </el-col>
        </el-row>
        <el-table :data="Data" border ref="multipleTable" tooltip-effect="dark" class="apart-table">
            <el-table-column type="selection" label="ALL" width="50">
            </el-table-column>
            <el-table-column prop="key" label="序号" width="60">
            </el-table-column>
            <el-table-column prop="companyName" label="文件名称" >
            </el-table-column>
            <el-table-column  label="附件"  >
            	 <template slot-scope="scope">
     				<a :href="scope.row.planeEndTime" target="_blank" style="color:blue;text-decoration: underline;cursor: pointer;">
     					查看附件
     				</a>
      			 </template>
            </el-table-column>
            <el-table-column prop="phone" label="上传人员" >
            </el-table-column>
            <el-table-column prop="planeTime" label="上传时间" >
            </el-table-column>               
        </el-table>
        <el-pagination v-if="false" background layout="prev, pager, next" :total="tableData.length" :pageSize="pageSize" @current-change="handleCurrentChange" class="Img-page">
        </el-pagination>
    </div>   
    <div class="attachment m_top" >
		<el-row type="flex" justify="space-between" class="dynamicList-title m_bottom">
            <el-col :span="16"   :push="1" class="Commissio_title">
                <font style="font-size:16px;color:#666"> 成交佣金</font>
                <font style="font-size:12px;color:#999">(推荐的客户在该项目购置房源后产生的佣金)</font>
            </el-col>
            <el-col :span="5">
                <el-button-group>            
                    <el-button type="primary" size="small">查看</el-button>
                    <el-button @click="addCompanydealRule" type="primary" size="small">新增</el-button>
                    <el-button type="primary"  size="small" >修改</el-button>
                    <el-button type="primary" size="small" >删除</el-button>
                </el-button-group>
            </el-col>
        </el-row>
        <el-table :data="Data" border ref="multipleTable" tooltip-effect="dark" class="apart-table">
            <el-table-column type="selection" label="ALL" width="50">
            </el-table-column>
            <el-table-column prop="key" label="序号" width="60">
            </el-table-column>
            <el-table-column prop="companyName" label="物业类型" >
            </el-table-column>
            <el-table-column prop="customerName" label="跳点"  >
            </el-table-column>
            <el-table-column prop="phone" label="提成公式" >
            </el-table-column>
            <el-table-column prop="planeTime" label="单位" >
            </el-table-column> 
             <el-table-column prop="planeTime" label="奖励金额(元/套)" >
            </el-table-column>   
        </el-table>
        <el-pagination v-if="false" background layout="prev, pager, next" :total="tableData.length" :pageSize="pageSize" @current-change="handleCurrentChange" class="Img-page">
        </el-pagination>
    </div> 
    <div class="attachment m_top" >
		<el-row type="flex" justify="space-between" class="dynamicList-title m_bottom">
            <el-col :span="16"   :push="1" class="Commissio_title">
                <font style="font-size:16px;color:#666"> 到访佣金</font>
                <font style="font-size:12px;color:#999">(推荐的客户在该项目购置房源后产生的佣金)</font>
            </el-col>
            <el-col :span="5">
                <el-button-group>            
                    <el-button type="primary" size="small">查看</el-button>
                    <el-button type="primary" size="small">新增</el-button>
                    <el-button type="primary" size="small" >修改</el-button>
                    <el-button type="primary" size="small" >删除</el-button>
                </el-button-group>
            </el-col>
        </el-row>
        <el-table :data="Data" border ref="multipleTable" tooltip-effect="dark" class="apart-table">
            <el-table-column type="selection" label="ALL" width="50">
            </el-table-column>
            <el-table-column prop="key" label="序号" width="60">
            </el-table-column>
            <el-table-column prop="companyName" label="物业类型" >
            </el-table-column>
            <el-table-column prop="customerName" label="跳点"  >
            </el-table-column>
            <el-table-column prop="phone" label="提成公式" >
            </el-table-column>
            <el-table-column prop="planeTime" label="单位" >
            </el-table-column> 
             <el-table-column prop="planeTime" label="奖励金额(元/套)" >
            </el-table-column>   
        </el-table>
        <el-pagination v-if="false" background layout="prev, pager, next" :total="tableData.length" :pageSize="pageSize" @current-change="handleCurrentChange" class="Img-page">
        </el-pagination>
    </div> 
	<div class="attachment m_top" >
		<el-row type="flex" justify="space-between" class="dynamicList-title m_bottom">
            <el-col :span="16"   :push="1" class="Commissio_title">
                <font style="font-size:16px;color:#666"> 推荐佣金</font>
                <font style="font-size:12px;color:#999">(推荐的客户在该项目购置房源后产生的佣金)</font>
            </el-col>
            <el-col :span="5">
                <el-button-group>            
                    <el-button type="primary" size="small">查看</el-button>
                    <el-button  type="primary" size="small">新增</el-button>
                    <el-button type="primary" size="small" >修改</el-button>
                    <el-button type="primary" size="small" >删除</el-button>
                </el-button-group>
            </el-col>
        </el-row>
        <el-table :data="Data" border ref="multipleTable" tooltip-effect="dark" class="apart-table">
            <el-table-column type="selection" label="ALL" width="50">
            </el-table-column>
            <el-table-column prop="key" label="序号" width="60">
            </el-table-column>
            <el-table-column prop="companyName" label="物业类型" >
            </el-table-column>
            <el-table-column prop="customerName" label="跳点"  >
            </el-table-column>
            <el-table-column prop="phone" label="提成公式" >
            </el-table-column>
            <el-table-column prop="planeTime" label="单位" >
            </el-table-column> 
             <el-table-column prop="planeTime" label="奖励金额(元/套)" >
            </el-table-column>   
        </el-table>
        <el-pagination v-if="false" background layout="prev, pager, next" :total="tableData.length" :pageSize="pageSize" @current-change="handleCurrentChange" class="Img-page">
        </el-pagination>
    </div> 
	<div class="attachment m_top" >
		<el-row type="flex" justify="space-between" class="dynamicList-title m_bottom">
            <el-col :span="16"   :push="1" class="Commissio_title">
                <font style="font-size:16px;color:#666">合作项目记录</font>
 
            </el-col>
            <el-col :span="5">
                
            </el-col>
        </el-row>
        <el-table :data="Data" border ref="multipleTable" tooltip-effect="dark" class="apart-table">
            <el-table-column type="selection" label="ALL" width="50">
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
    </div> 
	<div class="dialoag_content" v-if="addshow">
		<el-row>
			<el-form v-model="addForm"  :rules="rules"  label-width="140px">
			<el-row style="height:40px;padding-left:40px;background:#545c64 ;">
				<el-col :span="11">
					<span class="check-basetitle">新增附件</span>
				</el-col>
				<el-col :span="10" :push="1"  >
		 			<el-form-item>
    					<el-button size="small" type="primary" @click="addDialog">确认</el-button>
    					<el-button size="small" @click="hide" >取消</el-button>
  					</el-form-item>
				</el-col>
			</el-row>
			<el-row  class="m_top">
			<el-col  :span="22">
				<el-form-item prop="file_name" label="文件名称：">
					<el-input v-model="checkForm.file_name" ></el-input>
				</el-form-item>
				<el-form-item prop="file_url" label="附件：">
					<el-upload
 						class="upload-demo"
  						action="https://jsonplaceholder.typicode.com/posts/"
  						:on-preview="handlePreview"
  						:on-remove="handleRemove"
  						:before-remove="beforeRemove"
  						:before-upload="beforeImgUpload"
  						multiple
  						:limit="3"
 						:on-exceed="handleExceed"
  						:file-list="fileList">
 						 <el-button size="small" type="primary">点击上传</el-button>
  						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2m</div>
					</el-upload>
				</el-form-item>
				<el-form-item prop="file_remark" label="备注：">
					<el-input type="textarea" v-model="checkForm.file_remark" ></el-input>
				</el-form-item>
				<el-form-item prop="file_remark" label="上传人员：" >
					<el-input  v-model="checkForm.file_remark" ></el-input>
				</el-form-item>
				<el-form-item prop="upload_time"  label="上传时间：">
					<el-input v-model="checkForm.upload_time"></el-input>
				</el-form-item>
			</el-col>	
			</el-row>
			</el-form>		
		</el-row>
	</div>
	<div class="dialoag_content" v-if="checkshow">
		<el-row>
			<el-form v-model="checkForm" :rules="rules"  label-width="140px">
			<el-row style="height:40px;padding-left:40px;background:#545c64 ;">
				<el-col :span="11">
					<span class="check-basetitle">查看修改附件</span>
				</el-col>
				<el-col :span="10" :push="1"  >
		 			<el-form-item>
    					<el-button size="small" type="primary" @click="changeDialog">确认</el-button>
    					<el-button size="small" @click="hideDialog" >取消</el-button>
  					</el-form-item>
				</el-col>
			</el-row>
			<el-row  class="m_top">
			<el-col  :span="22">
				<el-form-item prop="file_name" label="文件名称：">
					<el-input v-model="checkForm.file_name" ></el-input>
				</el-form-item>
				<el-form-item prop="file_url" label="附件：">
					<el-upload
 						class="upload-demo"
  						action="https://jsonplaceholder.typicode.com/posts/"
  						:on-preview="handlePreview"
  						:on-remove="handleRemove"
  						:before-remove="beforeRemove"
  						:before-upload="beforeImgUpload"
  						multiple
  						:limit="3"
 						:on-exceed="handleExceed"
  						:file-list="fileList">
 						 <el-button size="small" type="primary">点击上传</el-button>
  						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2m</div>
					</el-upload>
				</el-form-item>
				<el-form-item prop="file_remark" label="备注：">
					<el-input type="textarea" v-model="checkForm.file_remark" ></el-input>
				</el-form-item>
				<el-form-item prop="file_remark" label="上传人员：" >
					<el-input  v-model="checkForm.file_remark" ></el-input>
				</el-form-item>
				<el-form-item prop="upload_time"  label="上传时间：">
					<el-input v-model="checkForm.upload_time"></el-input>
				</el-form-item>
			</el-col>	
			</el-row>
			</el-form>		
		</el-row>
	</div>
</div>
</template>
<script>
import {mapMutations,mapState,mapActions} from 'vuex'
import qs from 'qs'
export default {
 	 name: "CheckCompanyRule",
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
 	 		fileList:[],
 	 		canUpload:false,
 	 		checkshow:false,
 	 		addshow:false,
 	 		title:"结佣规则",
 	 		Data: [],
     		tableData: [],
            pageSize: 8,
            alltablesize: [],
            url:"https://www.jianshu.com/p/5af06fdd8796",
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
        		]
        	},
        	checkForm:{
        		file_name:'',
        		file_url:'',
        		file_remark:'',
        		upload_person:'',
        		upload_time:''
        	},
        	addForm:{
        		file_name:'',
        		file_url:'',
        		file_remark:'',
        		upload_person:'',
        		upload_time:''
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
        this.$refs.form.validate((valid)=>{
        	let url=this.Rooturl+"";
        	if(valid){
        		this.$http.post(url,qs.stringift({...this.form}))
        		.then(res=>{
        			 alert(res.data.code)
        		})
        	}
        })
      },
      back(){
      	 this.$router.push({ path: "/index/CommissioCheck" });
      },
      chosseCompanyRule(){
      	this.$router.push({ path: "/index/choseCompany" });
      },
      addCompanydealRule(){
      	this.$router.push({ path: "/index/SetRule" });
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
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      beforeImgUpload(file) {
      	 const isLt2M = file.size / 1024 / 1024 < 2;
      	 if (!isLt2M) {
        	this.$message.error("上传头像图片大小不能超过 2MB!");
     	 }
      	 return isLt2M;
   	  },
         //begin-dialog
      addDialog(){
      	let url=this.Rooturl+"";
      	this.$http.post(url,qs.stringify({
      		...this.addForm
      	})).then(res=>{
      	 	 if(res.data.code==200){
      	 	 	this.$message.success(res.data.msg);
      	 	 	this.checkshow=false;
      	 	 }else{
      	 	 	this.$message.error(res.data.msg);
      	 	 }
      	 	 
      	})
      },   
      hide(){
      	this.addshow=false;
      },
      showDialog(){
      	this.addshow=true;
      },
      showCheckDialog(){
      	let url=this.Rooturl+"";
      	this.$http.get(url,{
      		param:{
      			
      		}
      	}).then(res=>{
      		this.checkForm=res.data.data;
      	})
      	this.checkshow=true;
      	
      },
      changeDialog(){
      	 let url=this.Rooturl+"";
      	 this.$http.post(url,qsstringify({
      	 	...this.checkForm
      	 })).then(res=>{
      	 	 if(res.data.code==200){
      	 	 	this.$message.success(res.data.msg);
      	 	 	this.checkshow=false;
      	 	 }else{
      	 	 	this.$message.error(res.data.msg);
      	 	 }
      	 	 
      	 })
      },
      hideDialog(){	
      	this.checkshow=false;
      },
      deleFile(){
      	let url=this.Rooturl+"";
      	this.$http.post(url,qs.stringify({
      		...this.sels[0]
      	})).then(res=>{
      	 	 if(res.data.code==200){
      	 	 	this.$message.success(res.data.msg);
      	 	 	this.checkshow=false;
      	 	 }else{
      	 	 	this.$message.error(res.data.msg);
      	 	 }
      	 	 
      	})
      },
      //end-dialog
      selsChange(sels) {  
    	if(sels){
    		this.sels=sels; 
    	}   
      },
    ...mapMutations([
    	'addsels'
      ]),
      ...mapActions([
      
      ]),
      getCompanyRule(id){
      	let url=this.Rooturl+"project/ruleCompany/getDetail";
      	this.$http.get(url,{
      		params:{
      			rule_id:id
      		}
      	}).then(res=>{
      		this.form=res.data//
      	})
      },
      sortTable(arr){
      	let sarr=[];
      	for(let i=0;i<array.length;i++){
      		if(array[i].rule_id==(i+1)){
      			sarr.push(array[i]);
      		}
      	}
      	return sarr;
      }
 	},
 	computed:{
 		...mapState({
 			ComRules:state=>state.CheckCompanyRule.ComRules,
 			mes:state=>state.CommissioCheck.sels
 		})
 	},
 	created(){
 		this.getApartmentInfoImgList();	
 		this.getCompanyRule(this.mes);
 	}
}
</script>

<style scoped lang="scss">
#CheckCompanyRule{
	

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
}	
	#CheckCompanyRule .el-form{
		margin-top:0px;
	}
	.dialoag_content{
		position:fixed;
   		margin:0 auto 50px;
    	background:#fff;
   		border-radius:2px;
    	-webkit-box-shadow:0 1px 3px rgba(0,0,0,.3);
    	box-shadow:0 1px 3px rgba(0,0,0,.3);
    	-webkit-box-sizing:border-box;
    	box-sizing:border-box;
    	width: 50%;
    	z-index:1000;
    	top:50px;
    	left:30%;
    }
	
</style>