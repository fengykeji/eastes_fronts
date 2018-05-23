<template>
	  <div id="PersonDealBroker" class="attachment m_top" >
		<el-row type="flex" justify="space-between" class="dynamicList-title m_bottom">
            <el-col :span="16"   :push="1" class="Commissio_title">
                <font style="font-size:16px;color:#666"> 成交佣金</font>
                <font style="font-size:12px;color:#999">(经纪人推荐的客户在该项目购置房源后产生的佣金)</font>
            </el-col>
            <el-col :span="5">
                <el-button-group>            
                    <el-button type="primary" size="small">查看</el-button>
                    <el-button @click="addCompanydealRule" type="primary" size="small">新增</el-button>
                    <el-button type="primary" size="small" >修改</el-button>
                    <el-button type="primary" size="small" >删除</el-button>
                </el-button-group>
            </el-col>
        </el-row>
        <el-table :data="tableData" border ref="multipleTable" tooltip-effect="dark" class="apart-table">
            <el-table-column type="selection" label="ALL" width="50">
            </el-table-column>
            <el-table-column prop="key" label="序号" width="60">
            </el-table-column>
            <el-table-column prop="companyName" label="物业类型" >
            </el-table-column>           
            <el-table-column prop="phone" label="提成公式" >
            </el-table-column> 
            <el-table-column prop="planeTime" label="结佣周期" >
            </el-table-column>   
        </el-table>
        <el-pagination v-if="false" background layout="prev, pager, next" :total="tableData.length" :pageSize="pageSize" @current-change="handleCurrentChange" class="Img-page">
        </el-pagination>
    </div> 
</template>

<script>
	export default{
		name:'persondealbroker',
		data(){
			return{
     			tableData: [
     				{
     					key:1,
     					
     				}
     			],
			}
		},
		methods:{
      		addCompanydealRule(){
      			this.$router.push({ path: "/index/SetPersonRule" });
      		}
      	
     		
		}
	}
</script>

<style scoped lang="scss">
	#PersonDealBroker{
		.Commissio_title{
		height:32px;
		line-height:32px;
	}
	.dynamicList-title{
		margin-bottom:20px;
	}
	
	.el-select {
 		 width: 268px!important;
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

	.Commissio_title{
		line-height:32px;
	}
	.m_top{
		margin-top:20px;
	}
	.header  .el-button{
		margin-top:3px!important;
	}
}
</style>