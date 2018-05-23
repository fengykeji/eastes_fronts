<template>
	<div id="CkPayCommission">	
		<el-row >
			
			<el-form :model="ProjectInfo" ref="form" label-width="160px" size="small" class="checkInfo-form ">
				<el-row style="height:40px;padding-left:40px;background:#545c64 ;">
					<el-col :span="12">
						<span class="check-basetitle">查看、结佣</span>
					</el-col>
					<el-col :span="4" :push="8" >
						
    						<el-button size="small" type="primary" @click="onSubmit">确认</el-button>
    						<el-button size="small" @click="back" >取消</el-button>
  						
					</el-col>
				</el-row>
				<el-row class="form_title">
						<el-col :span="11">
							项目信息
						</el-col >
						<el-col :span="2" :push="10">
							<el-button type="info"  size="small" @click="CheckDetail" >
								结佣规则明细
							</el-button>
						</el-col>
				</el-row>
				<el-row class="m_top ">
					<el-col :span="8">
						<el-form-item label="项目名称：">
							<el-input v-model="ProjectInfo.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="开始时间：">
              				<el-date-picker v-model="ProjectInfo.startTime" type="date" placeholder="选择日期">
             	 			</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="结束时间：">
              				<el-date-picker v-model="ProjectInfo.startTime" type="date" placeholder="选择日期">
             	 			</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="实际开始时间：">
              				<el-date-picker v-model="ProjectInfo.startTime" type="date" placeholder="选择日期">
             	 			</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="实际结束时间：">
              				<el-date-picker v-model="ProjectInfo.startTime" type="date" placeholder="选择日期">
             	 			</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
					    <el-form-item label="甲方单位：">
							<el-input v-model="ProjectInfo.name">
							
							</el-input>
					 	</el-form-item>
					</el-col> 
					<el-col :span="8">
					    <el-form-item label="甲方对接人：">
							<el-input v-model="ProjectInfo.name">
							
							</el-input>
					 	</el-form-item>
					</el-col> 
					<el-col :span="8">
					    <el-form-item label="甲方对接人电话：">
							<el-input v-model="ProjectInfo.name">
							
							</el-input>
					 	</el-form-item>
					</el-col> 
				</el-row>
				<el-row>
					<el-col :span="8">
					    <el-form-item label="乙方单位：">
							<el-input v-model="ProjectInfo.name">
							
							</el-input>
					 	</el-form-item>
					</el-col> 
					<el-col :span="8">
					    <el-form-item label="乙方对接人：">
							<el-input v-model="ProjectInfo.name">
							
							</el-input>
					 	</el-form-item>
					</el-col> 
					<el-col :span="8">
					    <el-form-item label="乙方对接人电话：">
							<el-input v-model="ProjectInfo.name">
							
							</el-input>
					 	</el-form-item>
					</el-col> 
				</el-row>
				<el-row>
					<el-col :span="8">
					    <el-form-item label="累计金额(￥)：">
							<el-input v-model="ProjectInfo.name">
							
							</el-input>
					 	</el-form-item>
					</el-col> 
					<el-col :span="8">
					    <el-form-item label="已结金额(￥)：">
							<el-input v-model="ProjectInfo.name">
							
							</el-input>
					 	</el-form-item>
					</el-col> 
					<el-col :span="8">
					    <el-form-item label="扣款金额(￥)：">
							<el-input v-model="ProjectInfo.name">
							
							</el-input>
					 	</el-form-item>
					</el-col> 
				</el-row>
				<el-row >
					<el-col :span="8">
					    <el-form-item label="已结金额(￥)：">
							<el-input v-model="ProjectInfo.name">
							
							</el-input>
					 	</el-form-item>
					</el-col> 
					
				</el-row>
			</el-form>
		</el-row>
		<el-row>
		<div id="CompanyCommission">
		  <el-row type="flex" justify="space-between" class="examine-title thead_m_bottom">
            <el-col :span="11" class="thead_title">
              	结佣信息
            </el-col>
            <el-col :span="11">
                <el-button-group>
                    <el-button type="primary" @click="check" size="small">查看</el-button>
                    <el-button type="primary" size="small">佣金申请</el-button>
                    <el-button type="primary" size="small">修改佣金</el-button>
                    <el-button type="primary" size="small">删除</el-button>
                    <el-button type="primary" size="small">佣金审核</el-button>
                    <el-button type="primary" @click="applycheck" size="small">付款申请</el-button>
                 	<el-button type="primary"  @click="paycheck" size="small">付款审核</el-button>
                </el-button-group>
            </el-col>
         </el-row>
         <el-row class="table_row">
           <el-table :data="Data" @selection-change="selsChange" style="width: 100%"  border ref="multipleTable" tooltip-effect="dark" class="apart-table">
            <el-table-column fixed type="selection" reserve-selection="" label="ALL" width="50">
            </el-table-column>
            <el-table-column fiexd  prop="key" width="50" label="序号">
            </el-table-column>
            <el-table-column  prop="recommendNum" label="申请名称" width="110">
            </el-table-column>
            <el-table-column  prop="customerName" label="申请金额(￥)" width="110">
            </el-table-column>
            <el-table-column prop="phone" label="申请笔数" width="80">
            </el-table-column>
            <el-table-column   prop="state" label="扣款金额" width="80">
            </el-table-column>
            <el-table-column   prop="recommendPeople" label="审核金额" width="80">
            </el-table-column>
            <el-table-column  prop="type" label="审核笔数" width="80">
            </el-table-column>
             <el-table-column   prop="companyName" label="已结金额(￥)" width="110">
            </el-table-column>
            <el-table-column   prop="recommendTime" label="未结金额(￥)" width="110">
            </el-table-column>
             <el-table-column   prop="chargePeople" label="申请类型" width="80">
            </el-table-column>
             <el-table-column  prop="sureTime" label="申请人员" width="80">
            </el-table-column>
             <el-table-column   prop="changeStateTime" label="审核时间" width="80">
            </el-table-column>
            <el-table-column   prop="failCountdown" label="状态" width="50">
            </el-table-column>  
          </el-table>
        </el-row>    
        	<el-pagination background layout="prev, pager, next" :total="tableData.length" :pageSize="pageSize" @current-change="handleCurrentChange" class="Img-page">
         	</el-pagination>
	    </div>
		</el-row>
	</div>
</template>

<script>
	import {mapMutations} from 'vuex'
	export default{
		name:'CkPayCommission',
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
      			sels:[]
			}
		},
		methods:{
   			back(){
    			this.$router.push({path:"/index/CompanyCommission"})
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
    		check(){
      			let sels=this.sels;
     		    if(sels.length>1){
      				this.$message.error("查看只能单选")
      			}else if(sels.length==1){
      				this.CkPayaddsels(sels[0].key);
      				this.$router.push({path:'/index/CkPayCommissonDetail'})
      			}else{
      				this.$message.error("请选择查看内容")
      			}
    		},
    		selsChange(sels) {  
    			if(sels){
    		  		this.sels=sels; 
    			}   
   			},
   			...mapMutations([
   				'CkPayaddsels'
   			]),
   			CheckDetail(){
   				this.$router.push({path:'/index/CommissioCheck'})
   			},
   			applycheck(){		
   				let sels=this.sels;
     		    if(sels.length>1){
      				this.$message.error("查看只能单选")
      			}else if(sels.length==1){
      				this.CkPayaddsels(sels[0].key);
      				this.$router.push({path:'/index/CheckPayCheckPayment'})
      			}else{
      				this.$message.error("请选择查看内容")
      			}
   			},
   			paycheck(){
   				let sels=this.sels;
     		    if(sels.length>1){
      				this.$message.error("查看只能单选")
      			}else if(sels.length==1){
      				this.CkPayaddsels(sels[0].key);
      				this.$router.push({path:'/index/PersonCheckPayCheckView'})
      			}else{
      				this.$message.error("请选择查看内容")
      			}
   			}
    		
		},
		created(){
			this.getApartmentInfoImgList()
		}
	}
</script>

<style lang='scss' scoped>
	#CkPayCommission{
		
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
		.form_title{
			height:50px;
			line-height:30px;
			padding:10px 20px;
			border:1px solid #ddd;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
			-webkit-box-sizing: border-box;
		}
		.form_title .el-button{
			margin-top:0px!important;
		}
	}
	
</style>