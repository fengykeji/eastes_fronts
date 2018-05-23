<template>
	<div id="AddCompanyRuleFile">
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
                    <el-button type="primary" @click="deletFile" size="small" >删除</el-button>
                </el-button-group>
            </el-col>
        </el-row>
        <el-table :data="FileData" @selection-change="FileselsChange" border ref="multipleTable" tooltip-effect="dark" class="apart-table">
            <el-table-column type="selection" reserve-selection="" label="ALL" width="50">
            </el-table-column>
            <el-table-column prop="file_id" label="序号" width="60">
            </el-table-column>
            <el-table-column prop="company_name" label="文件名称" >
            </el-table-column>
            <el-table-column prop="url"  label="附件"  >
            	<template slot-scope="scope">
     				<a :href="scope.row.url" target="_blank" style="color:blue;text-decoration: underline;cursor: pointer;">
     					查看附件
     				</a>
      			</template>
            </el-table-column>
            <el-table-column prop="upload_person" label="上传人员" >
            </el-table-column>
            <el-table-column prop="upload_time" label="上传时间" >
            </el-table-column>               
        </el-table>
        <el-pagination v-if="false" background layout="prev, pager, next" :total="tableData.length" :pageSize="pageSize" @current-change="handleCurrentChange" class="Img-page">
        </el-pagination>
      </div>  
		<div class="dialoag_content" v-if="addshow">
		<el-row>
			<el-form :model="addForm" ref="addForm"  :rules="rules"  label-width="140px">
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
					<el-input v-model="addForm.file_name" ></el-input>
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
					<el-input type="textarea" v-model="addForm.file_remark" ></el-input>
				</el-form-item>
				<el-form-item prop="upload_person" label="上传人员：" >
					<el-input  v-model="addForm.upload_person" ></el-input>
				</el-form-item>
				<el-form-item prop="upload_time"  label="上传时间：">
					<el-input v-model="addForm.upload_time"></el-input>
				</el-form-item>
			</el-col>	
			</el-row>
			</el-form>		
		</el-row>
	</div>
	<div class="dialoag_content" v-if="checkshow">
		<el-row>
			<el-form :model="checkForm" ref="checkForm" :rule="rules"  label-width="140px">
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
				<el-form-item prop="upload_person" label="上传人员：" >
					<el-input  v-model="checkForm.upload_person" ></el-input>
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
import qs from 'qs'	
export default{
	name:'addcompanyrulefile',
	data(){
			return{
				fileList:[],
				checkshow:false,
 	 			addshow:false,
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
        		},
        		FileData:[
        			{
        				file_id:"1",
        				url:"https://www.jianshu.com/p/5af06fdd8796",
        				company_name:'甲方公司',
        				upload_person:'张三',
        				upload_time:'2018-03-19'
        				
        			},
        			{
        				file_id:"2",
        				url:"https://www.jianshu.com/p/5af06fdd8796",
        				company_name:'甲方公司',
        				upload_person:'张三',
        				upload_time:'2018-03-19'
        				
        			}
        		],
        		rules:{
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
        		},
        		Filesels:[]
			}
	},
	methods:{
			addDialog(){
      			this.$refs.addForm.validate((valid)=>{
      			if(valid){
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
      			}
      			})
      	
     		 },
     		hide(){
      			this.addshow=false;
     		},
      		showDialog(){
      			this.addshow=true; 	
      		},
     		showCheckDialog(id){
      			let sels=this.Filesels;
       			if(sels.length>1){
      	  			this.$message.error("查看只能单选")
        		}else if(sels.length==1){
      	  			let url=this.Rooturl+"";
      	  			this.$http.get(url,{
      		 			param:{
      						file_id:sels[0].key
      				 	}
      	  			}).then(res=>{
      		   			this.checkForm=res.data.data;
      		  		 	this.checkshow=true;
      	 			})
        		}else{
      	  			this.$message.error("请选择查看内容")
        		}   	
      		},
      		changeDialog(){
      	 		this.$refs.checkForm.validate((valid)=>{
      			if(valid){
      				let url=this.Rooturl+"";
      				this.$http.post(url,qs.stringify({
      					...this.checkForm
      				})).then(res=>{
      	 				if(res.data.code==200){
      	 	 				this.$message.success(res.data.msg);
      	 	 				this.checkshow=false;
      	 				}else{
      	 	 				this.$message.error(res.data.msg);
      	 				}
      				})
      			}
      		})
      	},
      	hideDialog(){	
      		this.checkshow=false;
     	},
     	deletFile(){
     		let sels=this.Filesels;
      		if(sels.length>1){
      			this.$message.error("查看只能单选")
      		}else if(sels.length==1){
      			this.deleFile();
     		}else{
      			this.$message.error("请选择查看内容")
      		}
     	},
     	deleFile(){
      		let url=this.Rooturl+"";
      		this.$http.post(url,qs.stringify({
      			...this.Filesels[0]
      		})).then(res=>{
      	 	if(res.data.code==200){
      	 	 	this.$message.success(res.data.msg);
      	 	 	this.checkshow=false;
      	 	}else{
      	 	 	this.$message.error(res.data.msg);
      	 	}
      	 	 
      		})
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
   	  FileselsChange(sels) {  
    	if(sels){
    		this.Filesels=sels; 
    	}   
      }
	}
}
</script>

<style scoped lang="scss">
#AddCompanyRuleFile{
.check-basetitle{
		height:40px;
		line-height:40px;
		color:#fff;
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
</style>