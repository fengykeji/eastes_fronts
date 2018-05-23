<template>
	<div id="DealCompanyRuleTalble">
		<div class="attachment m_top" >
		<el-row type="flex" justify="space-between" class="dynamicList-title m_bottom">
            <el-col :span="16"   :push="1" class="Commissio_title">
                <font style="font-size:16px;color:#666"> 成交佣金</font>
                <font style="font-size:12px;color:#999">(推荐的客户在该项目购置房源后产生的佣金)</font>
            </el-col>
            <el-col :span="5">
                <el-button-group>            
                    <el-button @click="CheckCompanypPayRule" type="primary" size="small">查看</el-button>
                    <el-button @click="addCompanydealRule" type="primary" size="small">新增</el-button>
                    <el-button @click="CheckCompanypPayRule" type="primary" size="small" >修改</el-button>
                    <el-button type="primary" size="small" >删除</el-button>
                </el-button-group>
            </el-col>
        </el-row>
        <el-table :data="DealData" border @selection-change="DealSelsChange" ref="multipleTable" tooltip-effect="dark" class="apart-table">
            <el-table-column type="selection" reserve-selection="" label="ALL" width="50">
            </el-table-column>
            <el-table-column prop="key" label="序号" width="60">
            </el-table-column>
            <el-table-column prop="property_type" label="物业类型" >
            </el-table-column>
            <el-table-column prop="isjump_ponit" label="跳点"  >
            </el-table-column>
            <el-table-column prop="pay_methods" label="提成公式" >
            </el-table-column>
            <el-table-column prop="unit" label="单位" >
            </el-table-column> 
             <el-table-column prop="amount_reward" label="奖励金额(元/套)" >
            </el-table-column>   
        </el-table>
        <el-pagination v-if="false" background layout="prev, pager, next" :total="tableData.length" :pageSize="pageSize" @current-change="handleCurrentChange" class="Img-page">
        </el-pagination>
    </div> 
	</div>
</template>

<script>
	import {mapMuatations} from 'vuex'
	export default{
		name:'dealcompanyruletable',
		data(){
			return{
				Dealsels:[],
				DealData:[
					{
						key:1,
						property_type:'住宅',
						isjump_ponit:'是',
						pay_methods:'固定金额x套数',
						unit:'人民币',
						amount_reward:'30000'
					},
					{
						key:2,
						property_type:'住宅',
						isjump_ponit:'是',
						pay_methods:'销售总价x比例',
						unit:'人民币',
						amount_reward:'30000'
					}
				]
				
			}
		},
		methods:{
      		DealSelsChange(sels) {  
    			if(sels){
    				this.Dealsels=sels; 
    			}   
     		},
     		addCompanydealRule(){
      			this.$router.push({ path: "/index/SetRule" });
      		},
      		CheckCompanypPayRule(){
      		  let sels=this.Dealsels;
       		  if(sels.length>1){
      	  		  this.$message.error("查看只能单选")
        	  }else if(sels.length==1){		
				  this.$router.push({path:'/index/CheckCompanypPayRule'});
        	  }else{
      	  		  this.$message.error("请选择查看内容")
        	  }   
      		}
     		
		}
	}
</script>

<style scoped lang="scss">
#DealCompanyRuleTalble{
.check-basetitle{
	height:40px;
	line-height:40px;
	color:#fff;
}
.dialoag_content{
		position:fixed;
   		margin:0 auto 50px;
    	background:#fff;
   		border-radius:2px;
    	-webkit-box-shadow:0 1px 3px rgba(0,0,0,.3);
    	box-shadow:0 1px 3px rgba(0,0,0,.3);
    	-webkit-box-sizing:border-box;
    	box-sizing:border-box;
    	width: 50%;
    	z-index:1000;
    	top:50px;
    	left:30%;
}
.Commissio_title{
	height:32px;
	line-height:32px;
}
.dynamicList-title{
	margin-bottom:20px;
}
.el-date-picker {
 	width: 275px !important;
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
.m_top{
	margin-top:50px;
}
.Commissio_title{
	line-height:32px;
}
	}
</style>