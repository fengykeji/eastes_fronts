<template>
	<div id="PersonCheckPayFaild">
		<el-row >
			<el-form :model="ProjectInfo" ref="form" label-width="130px" size="small" class="checkInfo-form ">
				<el-row style="height:40px;padding-left:40px;background:#545c64 ;">
					<el-col :span="12">
						<span class="check-basetitle">付款失败</span>
					</el-col>
					<el-col :span="4" :push="8" >
    					<el-button size="small" type="primary" @click="onSubmit">确认</el-button>
    					<el-button size="small" @click="back" >取消</el-button>
					</el-col>
				</el-row>
				<el-row class="m_top">
					<el-col :span="8">
					    <el-form-item label="推荐编号：">
							<el-input v-model="ProjectInfo.name">				
							</el-input>
					 	</el-form-item>
					</el-col> 
				
					<el-col :span="8">
					    <el-form-item label="经济人名称：">
							<el-input v-model="ProjectInfo.name">
							</el-input>
					 	</el-form-item>
					</el-col> 
					<el-col :span="7">
					    <el-form-item label="审核金额：">
							<el-input v-model="ProjectInfo.name">				
							</el-input>
					 	</el-form-item>
					</el-col> 
					
				</el-row>
				<el-row>
					<el-col :span="8">
					    <el-form-item label="佣金类型：">
							<el-input v-model="ProjectInfo.name">				
							</el-input>
					 	</el-form-item>
					</el-col> 
					
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="付款失败类型：">
							<el-select v-model="select">
								<el-option label="银行卡号错误" value="1" ></el-option>
							</el-select>
					 	</el-form-item>
					</el-col>
					
				</el-row>		
				<el-row>
					<el-col :span="16">
					    <el-form-item label="付款失败描述：">
							<el-input type="textarea" v-model="ProjectInfo.name">
							
							</el-input>
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
		name:'PersonCheckPayFaild',
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
    		getApartmentInfoImgList() {
        		for (let i = 1; i < 20; i++) {
        				this.tableData.push({
         				key: i,
          				recommendNum: "2018/01/10",
          				customerName: "2018/05/10",
         				phone: "xxA公司",
         				state: "成都-郫都区",
              			recommendPeople:"张三",
            			type: "13877729922",
            			companyName:"2000",
            			recommendTime:"200",
	            		chargePeople:"1000",
	            		sureTime:"800",
           				changeStateTime:"结佣审核待处理",
            			failCountdown:"付款审核待处理"
        			}); 
     	 		 }
      			this.page();
    		},
   			page() {
     			for (let i = 0;i < Math.ceil(this.tableData.length / this.pageSize);i++) {
        		 	let arr = new Array();
      	 			for (let j = 0; j < this.tableData.length; j++) {
          				if (j >= (i == 0 ? 0 : i * this.pageSize) && j < (i + 1) * this.pageSize){
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
   			...mapMutations([
   				'showForm'
   			]),
   			accesscheck(){
   				
   			}
    		
		},
		created(){
			this.getApartmentInfoImgList()
		},
		computed:{
			...mapState({
				showForms:state=>state.CkPayCommissonDetail.showForm
			})
		}
	}
</script>

<style lang='scss' scoped>
	#PersonCheckPayFaild{
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
			width:256px!important;	
		}
	}
	
</style>