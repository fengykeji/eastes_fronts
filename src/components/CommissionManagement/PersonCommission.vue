<template>
	<div id="CompanyCommission">
		  <el-row type="flex" justify="space-between" class="examine-title m_line_bottom">
            <el-col :span="11">
                <CommissionManageHeader :breadcrumbName="breadcrumbName"></CommissionManageHeader>
            </el-col>
            <el-col :span="13">
                <el-button-group>
                    <el-button type="primary" size="small">高级搜索</el-button>
                    <el-button type="primary" @click="check" size="small">查看</el-button>
                    <el-button type="primary" size="small">佣金申请</el-button>
                    <el-button type="primary" size="small">修改佣金</el-button>
                    <el-button type="primary" size="small">删除</el-button>
                    <el-button type="primary" size="small">佣金审核</el-button>
                    <el-button type="primary" @click="payapply" size="small">付款申请</el-button>
                    <el-button type="primary" @click="paycheck" size="small">付款审核</el-button>
                </el-button-group>
            </el-col>
        </el-row>
        <el-row class="table_row ">
        <el-table :data="Data"  style="width: 100%" @selection-change="selsChange"  border ref="multipleTable" tooltip-effect="dark" class="apart-table">
            <el-table-column fixed type="selection" reserver-slection="" label="ALL" width="50">
            </el-table-column>
            <el-table-column fiexd  prop="broker_id" width="50" label="序号">
            </el-table-column>
            <el-table-column  prop="broker_type_name" label="申请名称" width="80">
            </el-table-column>
            <el-table-column  prop="broker_num" label="申请金额(￥)"width="110">
            </el-table-column>
            <el-table-column prop="is_urge" label="扣款金额(￥)" width="100">
            </el-table-column>
            <el-table-column   prop="state" label="应付金额(￥)" width="70">
            </el-table-column>
            <el-table-column   prop="client_id" label="合计笔数" width="70">
            </el-table-column>
            <el-table-column  prop="agent_name" label="申请人员" width="90">
            </el-table-column>
             <el-table-column   prop="create_time" label="申请时间" width="105">
            </el-table-column>
            <el-table-column   prop="client_name" label="审核人员" width="90">
            </el-table-column>
             <el-table-column   prop="update_time" label="审核时间" width="105">
            </el-table-column>
             <el-table-column  prop="state_name" label="状态" width="100">
            </el-table-column>
             <el-table-column   prop="pay_state" label="已付金额" width="70">
            </el-table-column>
             <el-table-column   prop="state" label="未付金额" width="70">
            </el-table-column>
            
        </el-table>
        </el-row>    
        <el-pagination background layout="prev, pager, next" :total="tableData.length" :pageSize="pageSize" @current-change="handleCurrentChange" class="Img-page">
        </el-pagination>
	</div>
</template>

<script>
import CommissionManageHeader from "@/components/shared/CommissionManageHeader"
import {mapMutations} from 'vuex'
export default{
	name:'PersonCommission',
	data(){
		return{
			breadcrumbName: [
       			{ breadcrumbname: "公司佣金", router: "/index/CompanyCommission" },
        		{ breadcrumbname: "全民经纪人佣金", router: "/index/PersonCommission" }
        			
      		],
      		Data: [],
      		tableData: [],
      		pageSize: 6,
      		alltablesize: [],
      		sels:[]
		}
	},
	components:{CommissionManageHeader},
	created() {
        this.getData();  
   },
   methods: {
    page() {
      for (
        let i = 0;
        i < Math.ceil(this.tableData.length / this.pageSize);
        i++
      ) {
        let arr = new Array();
        for (let j = 0; j < this.tableData.length; j++) {
          if (
            j >= (i == 0 ? 0 : i * this.pageSize) &&
            j < (i + 1) * this.pageSize
          ) {
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
    getData(){
    	let url=this.Rooturl+"project/broker/list";
    	this.$http.get(url,{
    		params:{
    			//agent_name:1,
    			//property_type:1,
    			//client_name:1,
    			//state:1
    		}
    	}).then(res=>{console.log(res.data.data);this.tableData=res.data.data.data;this.page(); })
    },
    check(){
      let sels=this.sels;
      if(sels.length>1){
      	this.$message.error("查看只能单选")
      }else if(sels.length==1){
      	this.addsels(sels[0].key);
      	this.$router.push({path: '/index/PersonPaymentCheck'})
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
    	'addsels'
    ]),
    payapply(){
      let sels=this.sels;
      if(sels.length>1){
      	this.$message.error("查看只能单选")
      }else if(sels.length==1){
      	this.addsels(sels[0].key);
      	this.$router.push({path: '/index/PersonCheckPayApplyView'})
      }else{
      	this.$message.error("请选择查看内容")
      }
    },
    paycheck(){
     let sels=this.sels;
      if(sels.length>1){
      	this.$message.error("查看只能单选")
      }else if(sels.length==1){
      	this.addsels(sels[0].key);
      	this.$router.push({path: '/index/PersonCheckPayCheckView'})
      }else{
      	this.$message.error("请选择查看内容")
      }
    }
  } 
}
</script>

<style lang="scss" scoped>
	#CompanyCommission{
		margin-top:10px!important;
		padding-bottom:10px!important;
		.m_line_bottom{
			margin-top:10px!important;
			margin-bottom:10px!important;
		}
		.m_top{
			margin-top:10px!important;
		}
		.examine-title {
  			border-bottom: dashed 1px #b3c0d1;
  			margin-bottom: 10px;
 			padding-bottom: 20px;
		}
		.el-table {
 			width: 100%;
 			margin-top: 30px;
  			padding: 2px 0px !important;
		}
		.m_line_bottom{
			margin-top:20px!important;
		
		}
	}
</style>