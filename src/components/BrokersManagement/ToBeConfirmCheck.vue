<template>
	<div id="ToBeConfirmCheck">
		<el-row>
			<el-form  label-width="160px">
				<el-row style="height:40px;padding-left:40px;background:#545c64 ;">
					<el-col :span="12">
						<span class="check-basetitle">新增基本规则</span>
					</el-col>
					<el-col :span="8" :push="4" >
						<el-form-item>
    						<el-button size="small" type="primary" @click="onSubmit">确认</el-button>
    						<el-button size="small" @click="back" >取消</el-button>
  						</el-form-item>
					</el-col>
				</el-row>
		 		<el-row class="m_top">
		 			<el-col :span="11">
		 				<el-form-item label="经纪人名称：">
		 					<el-input></el-input>
		 				</el-form-item>
		 			</el-col>
		 			<el-col :span="11">
		 				<el-form-item label="所属公司：">
		 					<el-input></el-input>
		 				</el-form-item>
		 			</el-col>
		 		</el-row>
		 		<el-row>
		 			<el-col :span="11">
		 				<el-form-item label="联系电话：">
		 					<el-input></el-input>
		 				</el-form-item>
		 			</el-col>
		 			<el-col :span="11">
		 				<el-form-item label="性别：">
		 					<el-input></el-input>
		 				</el-form-item>
		 			</el-col>
		 		</el-row>
		 		<el-row>
		 			<el-col :span="11">
		 				<el-form-item label="年龄：">
		 					<el-input></el-input>
		 				</el-form-item>
		 			</el-col>
		 			<el-col :span="11">
		 				<el-form-item label="区域：">
		 					<el-input></el-input>
		 				</el-form-item>
		 			</el-col>
		 		</el-row>
		 		<el-row>
		 			<el-col :span="11">
		 				<el-form-item label="活跃指数(满分100)：">
		 					<el-input></el-input>
		 				</el-form-item>
		 			</el-col>
		 			<el-col :span="11">
		 				<el-form-item label="推荐客户数：">
		 					<el-input></el-input>
		 				</el-form-item>
		 			</el-col>
		 		</el-row>
		 		<el-row>
		 			<el-col :span="11">
		 				<el-form-item label="成交数量：">
		 					<el-input></el-input>
		 				</el-form-item>
		 			</el-col>
		 			<el-col :span="11">
		 				<el-form-item label="成交率：">
		 					<el-input></el-input>
		 				</el-form-item>
		 			</el-col>
		 		</el-row>
		 		<el-row>
		 			<el-col :span="11">
		 				<el-form-item  label="申请时间：">
		 					<el-date-picker class="date-picker">
		 						
		 					</el-date-picker>
		 				</el-form-item>
		 			</el-col>
		 		</el-row>
		 		<el-row>
		 			<el-col :span="22">
		 				<el-form-item label="经纪人描述：">
		 					<el-input type="textarea" autosize></el-input>
		 				</el-form-item>	
		 			</el-col>
		 		</el-row>
			</el-form>
		</el-row>
	</div>
</template>

<script>
	export default{
		name:'ToBeConfirmCheck',
		data(){
			return{
				
			}
		},
		methods:{
			check(){
				
			},
			back(){
				this.$router.push({path:'/index/ToBeComfirmed'})
			},
			onSubmit(){
				
			}
		}
	}
</script>

<style scoped lang="scss">
	#ToBeConfirmCheck{
		padding-top:50px!important;
		.date-picker{
			width:100%!important;
		}
		.Commissio_title{
			height:32px;
			line-height:32px;
		}
		.dynamicList-title{
			margin-bottom:20px;
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
		.check-basetitle{
			color:#fff;
			height:40px;
			line-height:40px;
			font-size: 16px;
		}
	}
</style>