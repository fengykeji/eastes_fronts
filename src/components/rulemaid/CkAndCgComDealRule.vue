<template>
<div id="CkAndCgComDealRule">
<el-row style="height:40px;padding-left:40px;background:#545c64 ;">	
	<el-col :span="12">
		<span class="check-basetitle">设置公司</span>
	</el-col>
	<el-col :span="4" :push="8" >	
    		<el-button size="small" type="primary" @click="onSubmit">确认</el-button>
    		<el-button size="small" @click="back" >取消</el-button>
	</el-col>
</el-row>
<el-form ref="form" :model="form" style="margin-top:40px;" label-width="120px">
		<el-row style="height:40px;">
			<el-form-item label="物业类型：">
            	<el-checkbox-group v-model="form.type">
             		<el-checkbox label="住宅" name="type"></el-checkbox>
             		<el-checkbox label="公寓" name="type"></el-checkbox>
             		<el-checkbox label="别墅" name="type"></el-checkbox>
             		<el-checkbox label="商铺" name="type"></el-checkbox>
             		<el-checkbox label="写字楼" name="type"></el-checkbox>
            		 <el-checkbox label="车位" name="type"></el-checkbox>
         		 </el-checkbox-group>
  	   		 </el-form-item>
  	   	</el-row>  	
  	   	<el-row style="margin-top:40px">
  	   		<el-col :span="8">
				<el-form-item label="*跳点：">
          	 		<el-select v-model="form.desc" placeholder="">
            			<el-option label="是" value="是"></el-option>
           				<el-option checked selected label="否" value="否"></el-option>
         			</el-select>
  	   			</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="*跳点提成积累">
           			<el-select v-model="form.resource" placeholder="">
            			<el-option label="是" value="是"></el-option>
           				<el-option selected label="否" value="否"></el-option>
        			</el-select>
  	   			</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="*单位">
           			<el-select v-model="form.resource" placeholder="人民币">
            			<el-option label="人民币" value="shanghai"></el-option>			
         			</el-select>
  	 			</el-form-item>
			</el-col>
  	   	</el-row>
  	   	<el-row>
  	   		<el-col :span="8">
  	   			<el-form-item label="*提成方式：">
           			<el-select @change="change" v-model="form.way" placeholder="提成方式">
            			<el-option checked label="固定金额x套数" value="1"></el-option>
           				<el-option label="销售总价x比例" value="2"></el-option>
           				<el-option label="建筑面积x单价" value="3"></el-option>
         			</el-select>
  	 			</el-form-item>
  	   		</el-col>
  	   		<el-col :span="8">
  	   			<el-form-item v-if="fixed_amount" label="固定定额">
           			<el-input v-model="form.fixed_amount"  type="number"  :disabled="!fixed_amount"  placeholder="输入固定金额1000" ></el-input>
  	 			</el-form-item>
  	 			<el-form-item v-if="percentage" label="比例">
           			<el-input v-model="form.percentage"  type="number"   :disabled="!percentage" placeholder="比例3%" ></el-input>
  	 			</el-form-item>
  	 			<el-form-item v-if="unit_price"  label="单价">
           			<el-input  v-model="form.unit_price" type="number"  :disabled="!unit_price" placeholder="输入单价如" ></el-input>
  	 			</el-form-item>
  	   		</el-col>
  	   	</el-row>
</el-form>
 <div class="attachment m_top" >
		<el-row type="flex" justify="space-between" class="dynamicList-title m_bottom">
            <el-col :span="16"   :push="1" class="Commissio_title">
                <font style="font-size:16px;color:#666">跳点规则</font>
            </el-col>
            <el-col :span="5">
                <el-button-group>            
                    <el-button @click="CheckJumpRule" type="primary" size="small">查看</el-button>
                    <el-button @click="addJumpRule" type="primary" size="small">新增</el-button>
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
            <el-table-column prop="companyName" label="起始数" >
            </el-table-column>
            <el-table-column prop="customerName" label="截止数"  >
            </el-table-column>
            <el-table-column prop="phone" label="提成公式" >
            </el-table-column>
            <el-table-column prop="phone" label="金额/比例/单价" >
            </el-table-column>
            <el-table-column prop="planeTime" label="是否累积" >
            </el-table-column> 
             <el-table-column prop="planeTime" label="奖励金额(元/套)" >
            </el-table-column>   
        </el-table>
    </div> 
</div>
</template>

<script>
	export default{
		name:'CkAndCgComDealRule',
		data(){
			return{
				form: {
         		  name: '',
                  region: '',
                  date1: '',
                  date2: '',
                  delivery: false,
                  type: [],
                  resource: '',
                  desc: '',
                  way:'1',
                  fixed_amount:'',
               	  percentage:'',
                  unit_price:''
               },
               fixed_amount:true,
               percentage:false,
               unit_price:false,
               tableData:[
               		{
               			key: 1,
          				recommendNum: "TJBH",
         				customerName: "否",
         				phone: "固定金额",
          				state: "待审核",      		
          				type: "执行中",
          				companyName:"住宅、公寓",
          				planeTime:"人民币",
          				planeEndTime:"2017/01/08",
          				sureTime:"2017/01/08",
         				sureEndTime:"2017/01/08"  
               		}
               ]

			}
		},
		methods:{
			onSubmit(){
			  let url=this.Rooturl+"project/ruleCompany/getList";
         	  this.$http.get(url,{
         	
       		  }).then(function(res){
        			console.log(res);
             })},
     		back(){
      	 		this.$router.push({ path: "/index/CheckCompanyRule" });
     		},
     		change(){
     			 this.fixed_amount=false;
                 this.percentage=false;
                 this.unit_price=false;
     			if(this.form.way=="1"){
     				this.fixed_amount=true;
     			}else if(this.form.way=="2"){
     				 this.percentage=true;
     			}else if(this.form.way=="3"){
     				this.unit_price=true;
     				
     			}
     		},
     		CheckJumpRule(){
     			this.$router.push({ path: "/index/CheckJumpPointRule" });
     		},
     		addJumpRule(){
     			
     		}
		}
	}
</script>

<style>
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
	.check-basetitle{
		height:40px;
		line-height:40px;
		color:#fff;
	}
	#CkAndCgComDealRule .el-button{
		margin-top:3px!important;
	}
</style>