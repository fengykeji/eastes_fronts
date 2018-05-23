<template>
	<div id="AddApply">
		<el-row >
			<el-form :model="ProjectInfo" ref="form" label-width="160px" size="small" class="checkInfo-form ">
				<el-row style="height:40px;padding-left:40px;background:#545c64 ;">
					<el-col :span="12">
						<span class="check-basetitle">添加结佣</span>
					</el-col>
					<el-col :span="4" :push="8" >
    					<el-button size="small" type="primary" @click="onSubmit">确认</el-button>
    					<el-button size="small" @click="back" >取消</el-button>
					</el-col>
				</el-row>
				<el-row  class="m_top">
					<el-col :span="8">
					    <el-form-item label="推荐编码：">
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
					<el-col :span="8">
					    <el-form-item label="状态：">
							<el-input v-model="ProjectInfo.name">					
							</el-input>
					 	</el-form-item>
					</el-col> 
				</el-row>
				<el-row>
					<el-col :span="8">
					    <el-form-item label="物业类型：">
							<el-input v-model="ProjectInfo.name">				
							</el-input>
					 	</el-form-item>
					</el-col> 
					<el-col :span="8">
					    <el-form-item label="批次：">
							<el-input v-model="ProjectInfo.name">
							
							</el-input>
					 	</el-form-item>
					</el-col> 
					<el-col :span="8">
					    <el-form-item label="楼栋：">
							<el-input v-model="ProjectInfo.name">	
							</el-input>
					 	</el-form-item>
					</el-col> 
				</el-row>
				<el-row>
					<el-col :span="8">
					    <el-form-item label="单元：">
							<el-input v-model="ProjectInfo.name">		
							</el-input>
					 	</el-form-item>
					</el-col> 
					<el-col :span="8">
					    <el-form-item label="房号：">
							<el-input v-model="ProjectInfo.name">		
							</el-input>
					 	</el-form-item>
					</el-col> 
					<el-col :span="8">
					    <el-form-item label="客户名称：">
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
            <el-col :span="19" class="thead_title">
              	申请结佣列表
            </el-col>
            <el-col :span="3">
                <el-button-group>
                    <el-button type="primary" @click="check" size="small">查看</el-button>      
                    <el-button type="primary" size="small">添加</el-button>           
                </el-button-group>
            </el-col>
         </el-row>
         <el-row class="table_row">
           <el-table :data="Data" @selection-change="selsChange" style="width: 100%"  border ref="multipleTable" tooltip-effect="dark" class="apart-table">
            <el-table-column fixed type="selection" reserve-selection="" label="ALL" width="50">
            </el-table-column>
            <el-table-column fiexd  prop="key" width="50" label="序号">
            </el-table-column>
            <el-table-column  prop="recommendNum" label="推荐编码" width="130">
            </el-table-column>
            <el-table-column  prop="customerName" label="经济人名称" width="130">
            </el-table-column>
            <el-table-column prop="phone" label="客户名称" width="130">
            </el-table-column>
            <el-table-column   prop="state" label="成交房号" width="130">
            </el-table-column>
            <el-table-column   prop="recommendPeople" label="物业类型" width="130">
            </el-table-column>
            <el-table-column  prop="type" label="合同总价(￥)" width="130">
            </el-table-column>  
            <el-table-column   prop="recommendPeople" label="已付金额(￥)" width="130">
            </el-table-column>
            <el-table-column  prop="type" label="付款方式" width="130">
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
		name:'AddApply',
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
    		check(){
      			let sels=this.sels;
     		    if(sels.length>1){
      				this.$message.error("查看只能单选")
      			}else if(sels.length==1){
      				this.AddApply(sels[0].key);
      				this.$router.push({path: '/index/ckBeConfirmed'})
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
   				'AddApply'
   			])
    		
		},
		created(){
			this.getApartmentInfoImgList()
		}
	}
</script>

<style lang='scss' scoped>
	#AddApply{
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
	}
	
</style>