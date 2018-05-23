<template>
<div id="SetPersonRule">
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
			<el-form-item prop="house_type" label="物业类型：">
            	<el-checkbox-group  v-model="form.house_type">
             		<el-checkbox v-for="(tag,idx) in house_type" :key="idx"  :label="tag.id"  name="type">{{tag.param}}</el-checkbox>
         		 </el-checkbox-group>
  	   		 </el-form-item>
  	   	</el-row>  	
  	   	<el-row style="margin-top:40px">
			<el-col :span="8">
				<el-form-item prop="resource" label="*单位：">
           			<el-select v-model="form.resource" placeholder="人民币">
        				<el-option  v-for="(item,idx) in icons" :key="idx" :label="item.param" :value="item.id" >       				</el-option>
        				</el-select>		
         			</el-select>
  	 			</el-form-item>
			</el-col>
  	   	</el-row>
  	   	<el-row>
  	   		<el-col :span="8">
  	   			<el-form-item prop="way" label="*提成方式：">
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
  	   	<el-row>
  	   		<el-col :span="8" >
  	   			<el-form-item  prop="pay_time" label="结佣周期：">
  	   				<el-input v-model.number="form.pay_time"></el-input>
  	   			</el-form-item>
  	   		</el-col>
  	   	</el-row>
</el-form>
</div>
</template>

<script>
	import {mapMutations} from 'vuex'
	import qs from 'qs'
	export default{
		name:'SetPersonRule',
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
                  is_include:'0',
                  sels:[],
                  pay_time:''
          },
               fixed_amount:true,
               percentage:false,
               unit_price:false,
               JumpPointBox:false,
               rules:{
               	house_type:[
               		{required:true,message:"不能为空",trigger:'blur'}
               	],
               	resource:[
               		{required:true,message:"不能为空",trigger:'blur'}
               	],
               	way:[
               		{required:true,message:"不能为空",trigger:'blur'}
               	],
               	pay_time:[
               		{validator:checkNum,trigger:'blur'}
               	],
               	fixed_amount:[
               		{validator:checkNum,trigger:'blur'}
               	],
               	unit_price:[
               		{validator:checkNum,trigger:'blur'}
               	],
               	percentage:[
               		{validator:checkNum,trigger:'blur'}
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
					let url=this.Rooturl+"";
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
      	 		this.$router.push({ path: "/index/AddPersonRule" });
     		},
     		change(value){
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
     		getconfig(){
     			let url =this.Rooturl+"config";
     			this.$http.get(url)
     				.then(res=>{
     					this.house_type=res.data.data[16].param;
     					this.ways=res.data.data[3].param;
     					this.icons=res.data.data[10].param;
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
     		])
		},
		created(){
			this.getconfig();
		}
	}
</script>

<style scoped  lang="scss">
#SetPersonRule{
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
.el-select{
	width:268px!important;
}
.header{
	.el-button{
		margin-top:4px!important;
	}
}
}		
</style>