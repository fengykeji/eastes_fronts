<template>
	<div id="PersonAccessoryAddCheckChange">
		<el-row >
			<el-form :model="ProjectInfo" ref="form" label-width="130px" size="small" class="checkInfo-form ">
				<el-row style="height:40px;padding-left:40px;background:#545c64 ;">
					<el-col :span="12">
						<span class="check-basetitle">查看、修改、添加</span>
					</el-col>
					<el-col :span="4" :push="8" >
    					<el-button size="small" type="primary" @click="onSubmit">确认</el-button>
    					<el-button size="small" @click="back" >取消</el-button>
					</el-col>
				</el-row>
				<el-row class="m_top">
					<el-col :span="11">
					    <el-form-item label="文件名称：">
							<el-input v-model="ProjectInfo.name">				
							</el-input>
					 	</el-form-item>
					</el-col> 
				</el-row>
				<el-row>
					<el-col :span="11">
					    <el-form-item label="附件：">
							<el-input v-model="ProjectInfo.name">
							</el-input>
					 	</el-form-item>
					</el-col> 
				</el-row>
				<el-row>
					<el-col :span="11">
					    <el-form-item label="备注：">
							<el-input type="textarea" v-model="ProjectInfo.name">				
							</el-input>
					 	</el-form-item>
					</el-col> 
					
				</el-row>
				<el-row>
					<el-col :span="11">
					    <el-form-item label="上传人员：">
							<el-input v-model="ProjectInfo.name">				
							</el-input>
					 	</el-form-item>
					</el-col> 
					
				</el-row>
				<el-row>
					<el-col :span="11">
						<el-form-item label="上传时间：">
							<el-select v-model="select">
								<el-option label="银行卡号错误" value="1" ></el-option>
							</el-select>
					 	</el-form-item>
					</el-col>				
				</el-row>					
			</el-form>
		</el-row>		
	</div>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	export default{
		name:'PersonAccessoryAddCheckChange',
		data(){
			return{
				ProjectInfo:{
					name:'',
					startTime:'',
					endTime:'',
					ArcStartTime:'',
					ArcEndTime:''
				},
				Data: [],
      			tableData: [],
      			pageSize: 6,
      			alltablesize: [],
      			sels:[],
      			visitContent:true,
      			introContent:true,
      			dealContent:true,
      			select:'银行卡号错误'
			}
		},
		methods:{
   			back(){
    			this.$router.push({path:"/index/PerCheckOncePayCheckView"})
   			},
    		onSubmit(){
    	
    		}, 	
   			...mapMutations([
   				'showForm'
   			])
    		
		},
		created(){
			
		},
		computed:{
			...mapState({
				showForms:state=>state.CkPayCommissonDetail.showForm
			})
		}
	}
</script>

<style lang='scss' scoped>
	#PersonAccessoryAddCheckChange{
		.check-basetitle{
			height:40px;
			line-height:40px;
			color:#fff;
		}
		.Commissio_title{
			height:32px;
			line-height:32px;
		}
		.el-button{
			margin-top:3px!important;	
		}
		.main_content{
			padding:0px 10px!important;
		}
		.el-date-picker {
 		  width: 275px !important;
		}
		.m_bottom{
			margin-bottom:20px;
		}
		.m_top{
			margin-top:50px;
		}
		.thead_m_bottom{
			margin-bottom:20px;
			border:1px solid #ddd;
			padding: 10px!important;
		}
		.thead_title{
			height:35px;
			line-height:35px;
			padding-left: 20px;
		}
		.el-select{
			width:401px!important;	
		}
	}
	
</style>