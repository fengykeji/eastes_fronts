<template>
	<div id="ToBeComfirmed">	
		<el-row type="flex" justify="space-between" class="examine-title">
            <el-col :span="18">
                <BrokersHeader :breadcrumbName="breadcrumbName"></BrokersHeader>
            </el-col>
            <el-col :span="6">
                <el-button-group>
                    <el-button type="primary" size="small">高级搜索</el-button>
                    <el-button type="primary" @click="check" size="small">查看</el-button>
                    <el-button type="primary" @click="audit" size="small">审核</el-button>
                    <el-button type="primary" size="small">禁用</el-button>
                </el-button-group>
            </el-col>
        </el-row>
        <el-row>
        	<el-table  border tooltip-effect="dark" class="apart-table" :data="tableData">
        		<el-table-column type="selection"  label="all">  			
        		</el-table-column>
        		<el-table-column prop=""  label="序号" width="50">  			
        		</el-table-column>
        		<el-table-column prop=""  label="名称" width="100">  			
        		</el-table-column>
        		<el-table-column prop=""  label="联系方式" width="120">  			
        		</el-table-column>
        		<el-table-column prop=""  label="城市" wdith="90">  			
        		</el-table-column>
        		<el-table-column prop=""  label="区域" width="100">  			
        		</el-table-column>
        		<el-table-column prop=""  label="所属公司" width="120">  			
        		</el-table-column>
        		<el-table-column prop=""  label="活跃指数(100)" width="120">  			
        		</el-table-column>
        		<el-table-column prop=""  label="推荐客户数量" wdith="80">  			
        		</el-table-column>
        		<el-table-column prop=""  label="成交数量" width="80">  			
        		</el-table-column>
        		<el-table-column prop=""  label="成交率" width="80">  			
        		</el-table-column>
        		<el-table-column prop=""  label="申请时间" width="120">  			
        		</el-table-column>
        	</el-table>
        </el-row>
	</div>
</template>

<script>
	import BrokersHeader from '../shared/BrokersHeader'
	export default{
		name:'ToBeComfirmed',
		data(){
			return{
				breadcrumbName: [
       				 { breadcrumbname: "待审核", router: "/index/ToBeComfirmed" },
        			 { breadcrumbname: "审核通过", router: "/index/VerifiedPerson" },
       				 { breadcrumbname: "审核不通过", router: "/index/AuditFailure" } 
     			],
     			tableData:[
     			]
			}
		},
		methods:{
			check(){
				this.$router.push({path:"/index/ToBeConfirmCheck"})
			},
			audit(){
				
				this.$router.push({path:"/index/ToBeConfilmAudit"})
			}
			
			
		},
		components:{BrokersHeader}
	}
</script>

<style scoped lang="scss">
#ToBeComfirmed{
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