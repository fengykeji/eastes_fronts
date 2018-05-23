<template>
	<div id="SubApplyCount">
		<el-row >
			<el-form :model="ProjectInfo" ref="form" label-width="160px" size="small" class="checkInfo-form ">
				<el-row style="height:40px;padding-left:40px;background:#545c64 ;">
					<el-col :span="12">
						<span class="check-basetitle">公司、扣款、查看</span>
					</el-col>
					<el-col :span="4" :push="8" >
    					<el-button size="small" type="primary" @click="onSubmit">确认</el-button>
    					<el-button size="small" @click="back" >取消</el-button>
					</el-col>
				</el-row>
				<el-row  class="m_top">
					<el-col :span="8">
					    <el-form-item label="佣金类型：">
							<el-input v-model="ProjectInfo.name">				
							</el-input>
					 	</el-form-item>
					</el-col> 
					<el-col :span="8">
					    <el-form-item label="佣金金额(￥)：">
							<el-input v-model="ProjectInfo.name">
							</el-input>
					 	</el-form-item>
					</el-col> 
					<el-col :span="8">
					    <el-form-item label="成交时间：">
							<el-input v-model="ProjectInfo.name">					
							</el-input>
					 	</el-form-item>
					</el-col> 
				</el-row>
				<el-row>
					<el-col :span="8">
					    <el-form-item label="扣款金额(￥)：">
							<el-input v-model="ProjectInfo.name">				
							</el-input>
					 	</el-form-item>
					</el-col> 
					<el-col :span="8">
					    <el-form-item label="应付金额(￥)：">
							<el-input v-model="ProjectInfo.name">
							
							</el-input>
					 	</el-form-item>
					</el-col> 
					<el-col :span="8">
					    <el-form-item label="佣金规则：">
							<el-button type="info"  >点击查看</el-button>
					 	</el-form-item>
					</el-col> 
				</el-row>
						
			</el-form>
		</el-row>
		<el-row>
		<div id="CompanyCommission" v-if="dealContent">
		  <el-row type="flex" justify="space-between" class="examine-title thead_m_bottom">
            <el-col :span="19" class="thead_title">
              	成交信息
            </el-col>
            <el-col :span="3">
              
            </el-col>
         </el-row>
         <el-row class="table_row">
          	<el-form :model="ProjectInfo" ref="dealform" label-width="160px" size="small" class="checkInfo-form ">
			<el-row>	
				<el-col :span="8">
					<el-form-item label="合同编号:">
						<el-input v-model="ProjectInfo.name" >
						</el-input>
					</el-form-item>
				</el-col>
					<el-col :span="8">
					<el-form-item label="物业类型:">
						<el-input v-model="ProjectInfo.name" >			
						</el-input>
					</el-form-item>
				</el-col>
					<el-col :span="7">
					<el-form-item label="房号:">
						<el-input v-model="ProjectInfo.name" >		
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>	
			<el-row>	
				<el-col :span="8">
					<el-form-item label="公示总价(￥):">
						<el-input v-model="ProjectInfo.name" >				
						</el-input>
					</el-form-item>
				</el-col>
					<el-col :span="8">
					<el-form-item label="公示单价(￥):">
						<el-input v-model="ProjectInfo.name" >
						</el-input>
					</el-form-item>
				</el-col>
					<el-col :span="7">
					<el-form-item label="成交总价(￥):">
						<el-input v-model="ProjectInfo.name" >
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>	
			<el-row>	
				<el-col :span="8">
					<el-form-item label="成交单价(￥):">
						<el-input v-model="ProjectInfo.name" >
						
						</el-input>
					</el-form-item>
				</el-col>
					<el-col :span="8">
					<el-form-item label="建筑面积:">
						<el-input v-model="ProjectInfo.name" >
						
						</el-input>
					</el-form-item>
				</el-col>
					<el-col :span="7">
					<el-form-item label="套内面积:">
						<el-input  v-model="ProjectInfo.name">
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>	
				<el-col :span="8">
					<el-form-item label="付款方式:">
						<el-select style="width: 90%;" >
							<el-option label="支付宝" value="1"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
					<el-col :span="8">
					<el-form-item label="已付金额:">
						<el-input v-model="ProjectInfo.name" >	
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="7">
					<el-form-item label="未付金额:">
						<el-input v-model="ProjectInfo.name" >
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>	
				<el-col :span="8">
					<el-form-item label="贷款金额(￥):">
						<el-input v-model="ProjectInfo.name" >	
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>	
				<el-col :span="8">
					<el-form-item label="置业顾问:">
						<el-input v-model="ProjectInfo.name">
						</el-input>
					</el-form-item>
				</el-col>
					<el-col :span="8">
					<el-form-item label="登记人员:">
						<el-input v-model="ProjectInfo.name" >
						</el-input>
					</el-form-item>
				</el-col>
					<el-col :span="7">
					<el-form-item label="成交日期:">
						<el-date-picker v-model="ProjectInfo.startTime" type="date" placeholder="选择日期">
             	 		</el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
          	</el-form>
        </el-row>   
	    </div>
		</el-row>
		<el-row>
		<div id="CompanyCommission"  v-if="introContent">
		  <el-row type="flex" justify="space-between" class="examine-title thead_m_bottom">
            <el-col :span="19" class="thead_title">
              	推荐信息
            </el-col>
            <el-col :span="3">
              
            </el-col>
         </el-row>
         <el-row class="table_row">
          	<el-form :model="ProjectInfo" ref="dealform" label-width="160px" size="small" class="checkInfo-form ">
			<el-row>	
				<el-col :span="8">
					<el-form-item label="推荐编号:">
						<el-input >
						</el-input>
					</el-form-item>
				</el-col>
					<el-col :span="8">
					<el-form-item label="项目类型:">
						<el-input >			
						</el-input>
					</el-form-item>
				</el-col>
					<el-col :span="7">
					<el-form-item label="推荐时间:">
						<el-input >		
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>	
			<el-row>	
				<el-col :span="8">
					<el-form-item label="客户名称:">
						<el-input >
						
						</el-input>
					</el-form-item>
				</el-col>
					<el-col :span="8">
					<el-form-item label="联系电话1:">
						<el-input >
						
						</el-input>
					</el-form-item>
				</el-col>
					<el-col :span="7">
					<el-form-item label="联系电话2:">
						<el-input >
						
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>	
			<el-row>	
				<el-col :span="8">
					<el-form-item label="证件类型:">
						<el-select style="width: 90%;" >
							<el-option label="支付宝" value="1"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
					<el-col :span="8">
					<el-form-item label="证件号码:">
						<el-input >
						
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>	
				
				<el-col :span="8">
					<el-form-item label="住址:">
						<el-input >	
						</el-input>
					</el-form-item>
				</el-col>

			</el-row>
			
          	</el-form>
        </el-row>   
	    </div>
	    <div id="CompanyCommission" v-if="visitContent">
		  <el-row type="flex" justify="space-between" class="examine-title thead_m_bottom">
            <el-col :span="19" class="thead_title">
              	到访信息
            </el-col>
            <el-col :span="3">
              
            </el-col>
         </el-row>
         <el-row class="table_row">
          	<el-form :model="ProjectInfo" ref="dealform" label-width="160px" size="small" class="checkInfo-form ">
			<el-row>	
				<el-col :span="11">
					<el-form-item label="到访人员:">
						<el-input >
						</el-input>
					</el-form-item>
				</el-col>
					<el-col :span="11">
					<el-form-item label="确认到访:">
						<el-input >			
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>	
			<el-row>	
				<el-col :span="11">
					<el-form-item label="到访照片:">
						<img src="../../../build/logo.png"/>
					</el-form-item>
				</el-col>
					<el-col :span="11">
					<el-form-item label="确认单图片:">
						<img src="../../../build/logo.png"/>
					</el-form-item>
				</el-col>		
			</el-row>	
			<el-row>	
				<el-col :span="11">
					<el-form-item label="签字人:">
						<el-input >
						
						</el-input>
					</el-form-item>
				</el-col>
					<el-col :span="11">
					<el-form-item label="签字人:">
						<el-input >
						
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
          	</el-form>
        </el-row>   
	    </div>
		</el-row>
	</div>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	export default{
		name:'SubApplyCount',
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
      			dealContent:true
			}
		},
		methods:{
   			back(){
    			this.$router.push({path:"/index/CkPayCommissonDetail"})
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
   			])
    		
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
	#SubApplyCount{
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
			width:226px!important;	
		}
	}
	
</style>