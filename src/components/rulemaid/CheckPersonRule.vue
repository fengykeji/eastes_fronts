<template>
<div id="CheckPersonRule">
<el-form id="AddTotalRule" ref="form" :model="form" label-width="160px">
<el-row style="height:40px;padding-left:40px;background:#545c64 ;" class="header" >
	<el-col :span="12">
		<span class="check-basetitle">查看全民经济人规则</span>
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
      
    <div class="attachment m_top" >
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
        <el-table :data="Data" border ref="multipleTable" tooltip-effect="dark" class="apart-table">
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
	

</div>
</template>

<script>
export default{
		name:'CheckPersonRule',
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
          		recommendNum: "TJBH"+i,
         		customerName: "否",
         		phone: "固定金额",
          		state: "待审核",      		
          		type: "执行中",
          		companyName:"住宅、公寓",
          		planeTime:"人民币",
          		planeEndTime:"https://www.jianshu.com/p/5af06fdd8796",
          		sureTime:"2017/01/08",
         		sureEndTime:"2017/01/08"   
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
      },
      addCompanydealRule(){
      	this.$router.push({ path: "/index/SetRule" });
      }
 	},
 	created(){
 		this.getApartmentInfoImgList();	
 	}
}
</script>

<style scoped lang="scss">
	.Commissio_title{
		height:32px;
		line-height:32px;
	}
	.dynamicList-title{
		margin-bottom:20px;
	}
	
	#AddTotalRule el-date-picker {
 		 width: 275px !important;
	}
	#AddTotalRule .check-basetitle{
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
	
	#CheckPersonRule {
		.header {
			.el-button{
				margin-top:4px!important;
			}
			
		}
		.m_top{
			margin-top:20px;
		}
	}
</style>