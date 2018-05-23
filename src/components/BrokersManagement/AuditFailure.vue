<template>
	<div id="AuditFailure">	
		<el-row type="flex" justify="space-between" class="examine-title">
            <el-col :span="18">
                <BrokersHeader :breadcrumbName="breadcrumbName"></BrokersHeader>
            </el-col>
            <el-col :span="6">
                <el-button-group>
                    <el-button type="primary" size="small">高级搜索</el-button>
                    <el-button type="primary" size="small">查看</el-button>
                    <el-button type="primary" size="small">审核</el-button>
                    <el-button type="primary" size="small">禁用</el-button>
                </el-button-group>
            </el-col>
        </el-row>
        <el-row>
        	<el-table border :data="tableData"  style="width:100%" >
        		<el-table-column label="all" type="selection" width="50">	
        		</el-table-column>
        		<el-table-column label="序号"  width="50" >	
        		</el-table-column>
        		<el-table-column label="名称"  width="50" >	
        		</el-table-column>
        		<el-table-column label="联系方式"  width="120" >	
        		</el-table-column>
        		<el-table-column label="城市"  width="80" >	
        		</el-table-column>
        		<el-table-column label="区域"  width="80" >	
        		</el-table-column>
        		<el-table-column label="所属公司"  width="110" >	
        		</el-table-column>
        		<el-table-column label="活跃只是(满分100)"  width="140" >	
        		</el-table-column>
        		<el-table-column label="推荐客户数量"  width="120" >	
        		</el-table-column>
        		<el-table-column label="推荐客户成交数量"  width="140" >	
        		</el-table-column>
        		<el-table-column label="推荐客户成交率"  width="120" >	
        		</el-table-column>
        		<el-table-column label="处理人员"  width="80" >	
        		</el-table-column>
        		<el-table-column label="拒绝类型"  width="100" >	
        		</el-table-column>
        		<el-table-column label="处理时间"  width="100" >	
        		</el-table-column>
        	</el-table>
        </el-row>
	</div>
</template>

<script>
	import BrokersHeader from '../shared/BrokersHeader'
	export default{
		name:'AuditFailure',
		data(){
			return{
				breadcrumbName: [
       				 { breadcrumbname: "待审核", router: "/index/ToBeComfirmed" },
        			 { breadcrumbname: "审核通过", router: "/index/VerifiedPerson" },
       				 { breadcrumbname: "审核不通过", router: "/index/AuditFailure" } 
     			],
     			tableData:[]
			}
		},
		methods:{
			
		},
		components:{BrokersHeader}
	}
</script>

<style scoped lang="scss">
#AuditFailure{
.el-breadcrumb__inner {
  font-size: 16px !important;
}
.examine-title {
  border-bottom: dashed 1px #b3c0d1;
  margin-bottom: 10px;
  padding-bottom: 10px;
}
.el-table {
  width: 100%;
  margin-top: 30px;
  padding: 2px 0px !important;
}
::-webkit-scrollbar,::scrollbar{
	height:8px!important;	
}
::-webkit-scrollbar-thumb,::scrollbar-thumb{
	background:rgba(25,158,216,0.9)!important;
}

	padding-top:10px!important;
	margin-top:10px!important;
	padding-bottom:10px!important;
}
</style>