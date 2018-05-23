<template>
	<div id="CheckJumpPointRule">
		<el-row style="height:40px;padding-left:40px;background:#545c64 ;">	
			<el-col :span="12">
				<span class="check-basetitle">选择</span>
			</el-col>
			<el-col :span="4" :push="8" >	
    			<el-button size="small" type="primary" @click="onSubmit">确认</el-button>
    			<el-button size="small" @click="back" >取消</el-button>
			</el-col>
		</el-row>
		<el-form :model="CheckruleForm"  ref="CheckruleForm" label-width="160px" class="demo-ruleForm">
		  	<el-row>
		  		<el-col :span="8">
		  			<el-form-item label="起始数：">
   				 		<el-input type="text" v-model="CheckruleForm.startNum"></el-input>
  					</el-form-item>
		  		</el-col>
		  		<el-col :span="8">
		  			<el-form-item label="截止数：">
   				 		<el-input type="text" v-model="CheckruleForm.endNum"></el-input>
  					</el-form-item>
		  		</el-col>
		  		<el-col :span="2"  :push="1" style="margin-top:6px" class="radio" >  			
      				<label for="radio"><input :checked="radiosCheck" :modle="CheckruleForm.inlcude" id="radio" type="radio" @click="checkradios($event)"  />包含</label>
		  		</el-col>
		  	</el-row>
		  	<el-row v-if="sels=='固定金额'">
		  		<el-col :span="8">
		  			 <el-form-item label="固定金额x套数">
    					 <el-input v-model="CheckruleForm.endNum"></el-input>
 					 </el-form-item>
		  		</el-col>
		  		<el-col :span="8">
		  			 <el-form-item label="奖励金额(元/套)">
    					 <el-input v-model="CheckruleForm.endNum"></el-input>
 					 </el-form-item>
		  		</el-col>
		  	</el-row>
		  	<el-row v-if="sels=='销售金额'">
		  		<el-col :span="8">
		  			 <el-form-item label="销售金额x比例">
    					 <el-input v-model="CheckruleForm.endNum"></el-input>
 					 </el-form-item>
		  		</el-col>
		  		<el-col :span="8">
		  			 <el-form-item label="比例">
    					 <el-input v-model="CheckruleForm.endNum"></el-input>
 					 </el-form-item>
		  		</el-col>
		  	</el-row>
		  	<el-row v-if="sels=='建筑面积'">
		  		<el-col :span="8">
		  			 <el-form-item label="面积X单价">
    					 <el-input v-model="CheckruleForm.endNum"></el-input>
 					 </el-form-item>
		  		</el-col>
		  		<el-col :span="8">
		  			 <el-form-item label="单价">
    					 <el-input v-model="CheckruleForm.endNum"></el-input>
 					 </el-form-item>
		  		</el-col>
		  	</el-row>
		</el-form>	
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		name:'CheckJumpPointRule',
		data(){
			return{
				CheckruleForm:{
					startNum:'1',
					endNum:'2',
					method:'',
					methodValue:'',
					extraValue:'',
					inlcude:''
				},
				radiosCheck:false
				
			}
		},
		methods:{
			getData(){
				let url=this.Rooturl+'/project/ruleCompany/getList';
				this.$http.get(url)
		  		  .then(res=>{
		  			  console.log(res.data);
				})
			},
			back(){
      	 		this.$router.push({ path: "/index/CheckCompanypPayRule" });
     		},
     		onSubmit(){
			  let url=this.Rooturl+"project/ruleCompany/getList";
         	  this.$http.get(url,{
         	
       		  }).then(function(res){
        			console.log(res);
            })},
            checkradios(){
            	this.radiosCheck=!this.radiosCheck;
            	this.CheckruleForm.inlcude=this.radiosCheck?1:0;
            }
           
            
		},
		created(){
			this.getData();
		},
		computed:{
			...mapState({
				sels:state=>state.CheckCompanypPayRule.sels[0].phone.substring(0,4)
			})
		}
		
	}
</script>

<style lang="scss" scoped >
#CheckJumpPointRule{
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
	.check-basetitle{
		height:40px;
		line-height:40px;
		color:#fff;
	}
	#CheckJumpPointRule .el-button{
		margin-top:3px!important;
	}
	.el-form{
		margin-top:40px;
	}
	.el-button{
		margin-top:3px!important;
	}
}	
</style>