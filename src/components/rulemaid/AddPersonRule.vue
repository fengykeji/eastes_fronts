<template>
<div id="AddPersonRule">
<el-form id="AddTotalRule" ref="form" :model="form" label-width="160px">
<el-row style="height:40px;padding-left:40px;background:#545c64 ;" class="header" >
	<el-col :span="12">
		<span class="check-basetitle">新增全民经济人规则</span>
	</el-col>
	<el-col :span="3" :push="8" >	
    		<el-button size="small" type="primary" @click="onSubmit">确认</el-button>
    		<el-button size="small" @click="back" >取消</el-button>	
	</el-col>
</el-row>
<el-row class="m_top">
    <el-col :span="11">
    	 <el-form-item label="规则名称：">
    			<el-input v-model="form.name" required placeholder="请输入规则名称" style="width: 100%;"></el-input>
  		</el-form-item>
    </el-col> 
    <el-col :span="11">
    	<el-form-item label="是否筛选经纪人">
   			<el-select v-model="form.region" placeholder="请选择活动区域">
      			<el-option  label="是" value="是"></el-option>
      			<el-option label="否" value="否"></el-option>
    		</el-select>
  		</el-form-item>
    </el-col>
</el-row>
<el-row  >	
   	<el-col :span="11">
   	  <el-form-item  label="*计划开始日期">
         <el-date-picker type="date"required placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
      </el-form-item>
   	</el-col>
    <el-col :span="11">
    	 <el-form-item  label="*计划截止日期">
           <el-date-picker type="date" required placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker> 
 	    </el-form-item>
 	</el-col>    
</el-row> 	    
<el-row >	
   	<el-col :span="11">
   	  <el-form-item  label="*实际开始日期">
         <el-date-picker type="date"required placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
      </el-form-item>
   	</el-col>
    <el-col :span="11">
    	 <el-form-item  label="*实际截止日期">
           <el-date-picker type="date" required placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker> 
 	    </el-form-item>
 	</el-col>    
</el-row> 	    
 
</el-form>  
  	<persondealbroker></persondealbroker>
    <div class="attachment m_top" >
		<el-row type="flex" justify="space-between" class="dynamicList-title m_bottom">
            <el-col :span="16"   :push="1" class="Commissio_title">
                <font style="font-size:16px;color:#666"> 到访佣金</font>
                <font style="font-size:12px;color:#999">(经纪人推荐的客户在该项目购置房源后产生的佣金)</font>
            </el-col>
            <el-col :span="5">
                <el-button-group>            
                    <el-button type="primary" size="small">查看</el-button>
                    <el-button type="primary" size="small">新增</el-button>
                    <el-button type="primary" size="small" >修改</el-button>
                    <el-button type="primary" size="small" >删除</el-button>
                </el-button-group>
            </el-col>
        </el-row>
        <el-table :data="Data" border ref="multipleTable" tooltip-effect="dark" class="apart-table">
            <el-table-column type="selection" label="ALL" width="50">
            </el-table-column>
            <el-table-column prop="key" label="序号" width="60">
            </el-table-column>
            <el-table-column prop="companyName" label="单位" >
            </el-table-column>           
            <el-table-column prop="phone" label="固定金额(每套)" >
            </el-table-column>           
             <el-table-column prop="planeTime" label="结佣周期" >
            </el-table-column>   
        </el-table>
        <el-pagination v-if="false" background layout="prev, pager, next" :total="tableData.length" :pageSize="pageSize" @current-change="handleCurrentChange" class="Img-page">
        </el-pagination>
    </div> 
	<div class="attachment m_top" >
		<el-row type="flex" justify="space-between" class="dynamicList-title m_bottom">
            <el-col :span="16"   :push="1" class="Commissio_title">
                <font style="font-size:16px;color:#666"> 推荐佣金</font>
                <font style="font-size:12px;color:#999">(经纪人推荐的客户在该项目购置房源后产生的佣金)</font>
            </el-col>
            <el-col :span="5">
                <el-button-group>            
                    <el-button type="primary" size="small">查看</el-button>
                    <el-button  type="primary" size="small">新增</el-button>
                    <el-button type="primary" size="small" >修改</el-button>
                    <el-button type="primary" size="small" >删除</el-button>
                </el-button-group>
            </el-col>
        </el-row>
        <el-table :data="Data" border ref="multipleTable" tooltip-effect="dark" class="apart-table">
            <el-table-column type="selection" label="ALL" width="50">
            </el-table-column>
            <el-table-column prop="key" label="序号" width="60">
            </el-table-column>
            <el-table-column prop="companyName" label="单位" >
            </el-table-column>   
            <el-table-column prop="companyName" label="固定金额(每套)" >
            </el-table-column>  
             <el-table-column prop="planeTime" label="结佣周期" >
            </el-table-column>   
        </el-table>
        <el-pagination v-if="false" background layout="prev, pager, next" :total="tableData.length" :pageSize="pageSize" @current-change="handleCurrentChange" class="Img-page">
        </el-pagination>
    </div> 
	

</div>
</template>

<script>
import 	persondealbroker from './PersonDealBroker'
export default{
		name:'AddPersonRule',
		data(){
 	 	return{
 	 		title:"结佣规则",
 	 		Data: [],
     		tableData: [],
            pageSize: 8,
            alltablesize: [],
            url:"https://www.jianshu.com/p/5af06fdd8796",
            form: {
         		 name: '',
         		 visit:'',
         		 recommand:'',
         		 deel:'1',
         		 delivery: false,
         	     type: [],
         		 resource: '',
          		 desc: '',
          		 region:"是"
        	}
           
        }
 	},
 	methods:{
 		getApartmentInfoImgList() {
      		for (let i = 1; i < 2; i++) {
       		  this.tableData.push({
          		key: i,
         		phone: "固定金额",
          		companyName:"住宅、公寓",
          		planeTime:"人民币",
             });
       }
       this.page();
       },
       page() {
         for (let i = 0;i < Math.ceil(this.tableData.length / this.pageSize); i++){
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
      	 this.$router.push({ path:"/index/CommissioCheck"});
      },
      onSubmit() {
         this.$http.post("url",{
         	
         })
         .then(function(res){
         	
         });
         
      },
      back(){
      	 this.$router.push({ path: "/index/CommissioCheck" });
      },
      chosseCompanyRule(){
      	this.$router.push({ path: "/index/choseCompany" });
      }
     
 	},
 	created(){
 		this.getApartmentInfoImgList();	
 	},
 	components:{
 		persondealbroker
 	}
}
</script>

<style scoped lang="scss">
#AddPersonRule{
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