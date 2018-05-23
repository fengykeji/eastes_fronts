<template>
	<div id="CompanyCommission">
		  <el-row type="flex" justify="space-between" class="examine-title m_line_bottom">
            <el-col :span="18">
                <CommissionManageHeader :breadcrumbName="breadcrumbName"></CommissionManageHeader>
            </el-col>
            <el-col :span="6">
                <el-button-group>
                    <el-button type="primary" size="small">高级搜索</el-button>
                    <el-button type="primary" @click="check" size="small">查看</el-button>
                    <el-button type="primary" size="small">审核</el-button>
                    <el-button type="primary" size="small">结佣</el-button>
                </el-button-group>
            </el-col>
        </el-row>
        <el-row class="table_row m_top">
        <el-table :data="Data"  style="width: 100%" @selection-change="selsChange"  border ref="multipleTable" tooltip-effect="dark" class="apart-table">
            <el-table-column fixed type="selection" reserve-seletion="" label="ALL" width="50">
            </el-table-column>
            <el-table-column fiexd  prop="key" width="50" label="序号">
            </el-table-column>
            <el-table-column  prop="recommendNum" label="开始执行时间" width="110">
            </el-table-column>
            <el-table-column  prop="customerName" label="截止执行时间" width="110">
            </el-table-column>
            <el-table-column prop="phone" label="乙方公司" width="100">
            </el-table-column>
            <el-table-column   prop="state" label="区域" width="100">
            </el-table-column>
            <el-table-column   prop="recommendPeople" label="项目对接人" width="70">
            </el-table-column>
            <el-table-column  prop="type" label="联系电话" width="110">
            </el-table-column>
             <el-table-column   prop="companyName" label="累计金额(￥)" width="70">
            </el-table-column>
            <el-table-column   prop="recommendTime" label="扣款金额(￥)" width="70">
            </el-table-column>
             <el-table-column   prop="chargePeople" label="已结金额(￥)" width="70">
            </el-table-column>
             <el-table-column  prop="sureTime" label="未结金额(￥)" width="70">
            </el-table-column>
             <el-table-column   prop="changeStateTime" label="结佣状态" width="90">
            </el-table-column>
            <el-table-column   prop="failCountdown" label="付款状态" width="90">
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
	name:'CompanyCommission',
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
     this.getApartmentInfoImgList();
   },
   methods: {
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
    check(){
      let sels=this.sels;
      if(sels.length>1){
      	this.$message.error("查看只能单选")
      }else if(sels.length==1){
      	this.addsels(sels[0].key);
      	this.$router.push({path: '/index/CkPayCommission'})
      }else{
      	this.$message.error("请选择查看内容")
      }
    },
    change(){
      let sels=this.sels;
      if(sels.length>1){
      	this.$message.error("查看只能单选")
      }else if(sels.length==1){
      	this.addsels(sels[0].key);
      	this.$router.push({path: '/index/CkPayCommission'})
      }else{
      	this.$message.error("请选择查看内容")
      }
   	},
   	...mapMutations([
   		'addsels'
   	]),
   	selsChange(sels) {  
    	if(sels){
    		   this.sels=sels; 
    	}   
    },
    paycheck(){
    	
      let sels=this.sels;
      if(sels.length>1){
      	this.$message.error("查看只能单选")
      }else if(sels.length==1){
      	this.addsels(sels[0].key);
      	this.$router.push({path: '/index/CkPayCommission'})
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