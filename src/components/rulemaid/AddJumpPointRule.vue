<template>
	<div id="AddJumpPointRule">
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
		  	<el-row>
  	   		<el-col :span="8">
  	   			<el-form-item label="*提成方式：">
           			<el-select @change="change" v-model="CheckruleForm.way" placeholder="提成方式：">
            			<el-option v-for="(tag,idx) in ways" :key="idx" :label="tag.param" :value="tag.id"></el-option>
        
         			</el-select>
  	 			</el-form-item>
  	   		</el-col>
  	   		<el-col :span="8">
  	   			<el-form-item prop="fixed_amount" v-if="fixed_amount" label="固定定额：">
           			<el-input v-model.number="CheckruleForm.fixed_amount"    :disabled="!fixed_amount"  placeholder="输入固定金额1000" ></el-input>
  	 			</el-form-item>
  	 			<el-form-item prop="percentage" v-if="percentage" label="比例：">
           			<el-input v-model.number="CheckruleForm.percentage"    :disabled="!percentage" placeholder="比例3%" ></el-input>
  	 			</el-form-item>
  	 			<el-form-item prop="unit_price" v-if="unit_price"  label="单价：">
           			<el-input  v-model.number="CheckruleForm.unit_price"   :disabled="!unit_price" placeholder="输入单价如" ></el-input>
  	 			</el-form-item>
  	   		</el-col>
  	   	    </el-row>
		</el-form>	
	</div>
</template>

<script>
	export default{
		name:'AddJumpPointRule',
		data(){
			return{
				fixed_amount:true,
                percentage:false,
                unit_price:false,
				CheckruleForm:{
					startNum:'',
					endNum:'',
					method:'',
					methodValue:'',
					extraValue:'',
					inlcude:'',
					way:18,
					fixed_amount:'',
					percentage:'',
					unit_price:''
				},
				radiosCheck:false,
				rules:{
					
				},
				ways:[
					{
               			id:'',
               			param:''
               		}
				]
			}
		},
		methods:{
			getData(){
				let url=this.Rooturl+'/project/ruleCompany/getList';
				this.$http.get(url)
		  		  .then(function(res){
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
            },
            getconfig(){
     			let url =this.Rooturl+"config";
     			this.$http.get(url)
     				.then(res=>{
     					this.ways=res.data.data[3].param;
     			})
     		},
     		change(){
     			this.fixed_amount=false;
                this.percentage=false;
                this.unit_price=false;
     			if(this.CheckruleForm.way=="18"){
     				this.fixed_amount=true;
     			}else if(this.CheckruleForm.way=="19"){
     				 this.percentage=true;
     			}else if(this.CheckruleForm.way=="20"){
     				this.unit_price=true;
     				
     			}
     		}
		},
		created(){
			this.getData();
			this.getconfig();
		}
		
		
	}
</script>

<style lang="scss" scoped  >
#AddJumpPointRule{
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