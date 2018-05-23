<template>
	<div id="AddPersonVisitRule">
		<el-row style="height:40px;padding-left:40px;background:#545c64 ;">	
			<el-col :span="12">
				<span class="check-basetitle">选择</span>
			</el-col>
			<el-col :span="4" :push="8" >	
    			<el-button size="small" type="primary" @click="onSubmit">确认</el-button>
    			<el-button size="small" @click="back" >取消</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default{
		name:'AddPersonVisitRule',
		data(){
			return{
				
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
	#AddPersonDealRule .el-button{
		margin-top:3px!important;
	}
</style>