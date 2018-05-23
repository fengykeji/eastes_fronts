<template>
<div id="CheckCompanypPayRule">
<el-row style="height:40px;padding-left:40px;background:#545c64 ;" class="header" >	
	<el-col :span="12">
		<span class="check-basetitle">设置公司</span>
	</el-col>
	<el-col :span="4" :push="8" >	
    	<el-button size="small" type="primary" @click="onSubmit">确认</el-button>
    	<el-button size="small" @click="back" >取消</el-button>
	</el-col>
</el-row>
<el-form ref="form" :model="form" :rules="rules" style="margin-top:40px;" label-width="120px">
		<el-row style="height:40px;">
			<el-form-item label="物业类型：">
            	<el-checkbox-group  v-model="form.house_type">
             		<el-checkbox v-for="(tag,idx) in house_type" :key="idx"  :label="tag.id"  name="type">{{tag.param}}</el-checkbox>
         		 </el-checkbox-group>
  	   		 </el-form-item>
  	   	</el-row>  	
  	   	<el-row style="margin-top:40px">
  	   		<el-col :span="8">
				<el-form-item label="*跳点：">
          	 		<el-select @change="JumpChange" v-model="form.jump_point_id" placeholder="">
            			<el-option label="是" value="1"></el-option>
           				<el-option  label="否" value="0"></el-option>
         			</el-select>
  	   			</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="*跳点提成积累：">
           			<el-select  v-model="form.is_include" placeholder="">
            			<el-option label="是" value="1"></el-option>
           				<el-option  label="否" value="0"></el-option>
        			</el-select>
  	   			</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="*单位：">
           			<el-select v-model="form.resource" placeholder="人民币">
        				<el-option  v-for="(item,idx) in icons" :key="idx" :label="item.param" :value="item.id" >       				</el-option>
        				</el-select>		
         			</el-select>
  	 			</el-form-item>
			</el-col>
  	   	</el-row>
  	   	<el-row>
  	   		<el-col :span="8">
  	   			<el-form-item label="*提成方式：">
           			<el-select @change="change" v-model="form.way" placeholder="提成方式：">
            			<el-option v-for="(tag,idx) in ways" :key="idx" :label="tag.param" :value="tag.id"></el-option>
        
         			</el-select>
  	 			</el-form-item>
  	   		</el-col>
  	   		<el-col :span="8">
  	   			<el-form-item prop="fixed_amount" v-if="fixed_amount" label="固定定额：">
           			<el-input v-model.number="form.fixed_amount"    :disabled="!fixed_amount"  placeholder="输入固定金额1000" ></el-input>
  	 			</el-form-item>
  	 			<el-form-item prop="percentage" v-if="percentage" label="比例：">
           			<el-input v-model.number="form.percentage"    :disabled="!percentage" placeholder="比例3%" ></el-input>
  	 			</el-form-item>
  	 			<el-form-item prop="unit_price" v-if="unit_price"  label="单价：">
           			<el-input  v-model.number="form.unit_price"   :disabled="!unit_price" placeholder="输入单价如" ></el-input>
  	 			</el-form-item>
  	   		</el-col>
  	   	</el-row>
</el-form>
 <div class="attachment m_top" v-show="JumpPointBox" >
		<el-row type="flex" justify="space-between" class="dynamicList-title m_bottom">
            <el-col :span="16"   :push="1" class="Commissio_title">
                <font style="font-size:16px;color:#666">跳点规则</font>
            </el-col>
            <el-col :span="5">
                <el-button-group>            
                    <el-button @click="CheckJumpRule" type="primary" size="small">查看</el-button>
                    <el-button @click="addJumpRule" type="primary" size="small">新增</el-button>
                    <el-button @click="CheckJumpRule" type="primary" size="small" >修改</el-button>
                    <el-button @click="deletRule" type="primary" size="small" >删除</el-button>
                </el-button-group>
            </el-col>
        </el-row>
        <el-table :data="tableData" @selection-change="selsChange" border ref="multipleTable" tooltip-effect="dark" class="apart-table">
            <el-table-column type="selection" reserve-selection="" label="ALL" width="50">
            </el-table-column>
            <el-table-column prop="key" label="序号" width="60">
            </el-table-column>
            <el-table-column prop="companyName" label="起始数" >
            </el-table-column>
            <el-table-column prop="customerName" label="截止数"  >
            </el-table-column>
            <el-table-column prop="phone" label="提成公式" >
            </el-table-column>
            <el-table-column prop="methods" label="金额/比例/单价" >
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
	import {mapMutations} from 'vuex'
	import qs from 'qs'
	export default{
		name:'CheckCompanypPayRule',
		data(){
			const checkNum=(rule,value,callback)=>{
  			 if(value != null && value != ""){
            	 if(!(typeof(value)==="number"&&value%1==0)) {
                	 callback(new Error('请输入正整数!'))
            	 }else if(value>9999){
                  	callback(new Error("不能大于9999"))
            	 }else{
             		callback()
           		 }
         	 }
	 	   	else if(!value){
	 	 		callback(new Error("不能为空"));
	 	 	}
        	else{
              callback();
        	}
  		};
		return{
			icons:[],
			form: {
         		  company_rule_id:'',
                  delivery: false,
                  house_type: [],
                  resource: 38,
                  desc: '',
                  way:18,
                  fixed_amount:'',
               	  percentage:'',
                  unit_price:'',
                  jump_point_id:'0',
                  is_include:'0',
                  sels:[]
          },
               fixed_amount:true,
               percentage:false,
               unit_price:false,
               JumpPointBox:false,
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
               		},
               		{
               			key: 2,
          				recommendNum: "TJBH",
         				customerName: "否",
         				phone: "建筑面积",
          				state: "待审核",      		
          				type: "执行中",
          				companyName:"住宅、公寓",
          				planeTime:"人民币",
          				planeEndTime:"2017/01/08",
          				sureTime:"2017/01/08",
         				sureEndTime:"2017/01/08"  
               		}
               ],
               rules:{
               	name:[
               		{required:true,message:"不能为空",trigger:'blur'}
               	],
               	ump_point_id:[
               		{required:true,message:"不能为空",trigger:'blur'}
               	],
               	is_include:[
               		{required:true,message:"不能为空",trigger:'blur'}
               	]
               },
               house_type:[
               		{
               			id:'',
               			param:''
               		}
               ],
               ways:[
               		{
               			id:'',
               			param:''
               		}
               ],
               sels:[]
			}
		},
		methods:{
			onSubmit(){
			this.$refs.form.validate((valid)=>{
				if(valid){
					let url=this.Rooturl+"project/ruleCompany/getList";
         	   		this.$http.post(url,qs.stringify({
         	  	 		...this.form
         	   		})).then(function(res){
        				if(res.data.code==200){
        					this.$refs.form.resetFields();
        				}
              		})
				}
			}) 
         	},
     		back(){
      	 		this.$router.push({ path: "/index/AddCompanyRule" });
     		},
     		change(){
     			this.fixed_amount=false;
                this.percentage=false;
                this.unit_price=false;
     			if(this.form.way=="18"){
     				this.fixed_amount=true;
     			}else if(this.form.way=="19"){
     				 this.percentage=true;
     			}else if(this.form.way=="20"){
     				this.unit_price=true;
     				
     			}
     		},
     		CheckJumpRule(){
     			let sels=this.sels;
      			if(sels.length>1){
      				this.$message.error("查看只能单选")
      			}else if(sels.length==1){
      				this.AddSetRule(sels);
      				this.$router.push({ path: "/index/CheckJumpPointRule" });
     			}else{
      				this.$message.error("请选择查看内容")
      			}

     		},
     		addJumpRule(){
     			this.$router.push({ path: "/index/AddJumpPointRule" });
     		},
     		JumpChange(value){
     			if(value==1){
     				this.JumpPointBox=true;
     			}else if(value==0){
     				this.JumpPointBox=false;
     			}
     		},
     		getconfig(){
     			let url =this.Rooturl+"config";
     			this.$http.get(url)
     				.then(res=>{
     					this.house_type=res.data.data[16].param;
     					this.ways=res.data.data[3].param;
     					this.icons=res.data.data[10].param;
     					console.log(res.data.data);
     				})
     		},
     		selsChange(sels){
     			if(sels){
     				this.form.sels=sels;
     				this.sels=sels;
     			}
     		},
     		getData(){
     			let url=this.Rooturl+"";
     			this.$http.get(res=>{
     				this.form=res.data;
     				this.tableData=res.data;
     			})
     		},
     		...mapMutations([
     			'AddSetRule'
     		]),
     		deletRule(){
     			let sels=this.sels;
      			if(sels.length>1){
      				this.$message.error("查看只能单选")
      			}else if(sels.length==1){
      				let url=this.Rooturl+"";
      				this.$http.post(url,qs.stringify({
      					...this.sels[0].key
      				})).then(res=>{
      					if(res.data.code==200){
      						this.$message.success("删除成功");
      					}
      				})
   					
     			}else{
      				this.$message.error("请选择查看内容")
      			}
     		}
		},
		created(){
			this.getconfig();
		}
	}
</script>

<style scoped  lang="scss">
#CheckCompanypPayRule{
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
.header{
	.el-button{
		margin-top:4px!important;
	}
}
}		
</style>