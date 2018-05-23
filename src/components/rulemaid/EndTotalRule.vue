<template>
	<div id="EndTotalRule">
		<el-row style="height:40px;padding-left:40px;background:#545c64 ;">	
			<el-col :span="12">
				<span class="check-basetitle">终止</span>
			</el-col>
			<el-col :span="4" :push="8" >	
    			<el-button size="small" type="primary" @click="onSubmit">确认</el-button>
    			<el-button size="small" @click="back" >取消</el-button>
			</el-col>
		</el-row>
		<el-form ref="form" :model="form" label-width="160px">
			<el-form-item label="终止原因：">
    			<el-select v-model="form.region" placeholder="请选择活动区域">
      				<el-option checked label="合同到期" value="shanghai"></el-option>
      				<el-option label="合同终止" value="beijing"></el-option>
   				</el-select>
  			</el-form-item>
  			<el-form-item label="备注：" style="width:80%">
   				 <el-input type="textarea" v-model="form.desc"></el-input>
  			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default{
		name:'EndTotalRule',
		data(){
			return{
				 form: {
          			name: '',
          			region: '',
          			date1: '',
         			date2: '',
          			delivery: false,
          			type: [],
         			resource: '',
          			desc: ''
        		}
			}
		},
		methods:{
			onSubmit(){
			  let url=this.Rooturl+"project/ruleCompany/getList";
         	  this.$http.get(url,{
         	
       		  }).then(function(res){
        			console.log(res);
             })},
     		back(){
      	 		this.$router.push({ path: "/index/CheckCompanyRule" });
     		}
		}
	}
</script>

<style>

	.Commissio_title{
		line-height:32px;
	}
	.check-basetitle{
		height:40px;
		line-height:40px;
		color:#fff;
	}
	#EndTotalRule .el-button{
		margin-top:3px!important;
	}
	.el-form{
		margin-top:40px;
	}
</style>