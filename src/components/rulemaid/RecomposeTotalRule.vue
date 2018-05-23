<template>
<el-form id="RecomposeTotalRule" ref="form" :rules="rules" :model="form"  label-width="200px">
<el-row style="height:40px;padding-left:40px;background:#545c64 ;">
	<el-col :span="12">
		<span class="check-basetitle">查看、修改基本规则</span>
	</el-col>
	<el-col :span="8" :push="4" >
		 <el-form-item>
    		<el-button size="small" type="primary" @click="onSubmit">确认</el-button>
    		<el-button size="small" @click="back" >取消</el-button>
  		</el-form-item>
	</el-col>
</el-row>
<el-row >	
   	<el-col :span="12">
   	  <el-form-item  prop="begin_time"  label="*开始执行时间">
         <el-date-picker   @change="CheckTime" type="date"required placeholder="选择日期" v-model="form.begin_time" style="width: 90%;"></el-date-picker>
      </el-form-item>
   	</el-col>
    <el-col :span="12">
    	 <el-form-item  prop="end_time"  label="*截止执行时间">
         <el-date-picker   @change="CheckTime" type="date" required placeholder="选择日期" v-model="form.end_time" style="width: 90%;"></el-date-picker> 
 	    </el-form-item>
 	</el-col>    
</el-row> 	    
    
<el-row>
    <el-col :span="12">
    	 <el-form-item prop="valid_visit_time" label="到访确认保护期(分钟)：">
    			<el-input    v-model.number="form.valid_visit_time"  placeholder="请输入失效时间,如:60" style="width: 90%;"></el-input>
  		</el-form-item>
    </el-col> 
</el-row>
<el-row>
    <el-col :span="12">
    	 <el-form-item prop="visit_confirm_time" label="有效来访保护期(天)：">
    			<el-input @blur="CheckTime"   v-model.number="form.visit_confirm_time" placeholder="请输入失效时间,如:1"  style="width: 90%;"></el-input>
  		</el-form-item>
    </el-col> 
</el-row>
<el-row>
    <el-col :span="12">
    	 <el-form-item  prop="make_bargain_time" label="成交保护期(天)：">
    			<el-input  @blur="CheckTime"  v-model.number="form.make_bargain_time"   placeholder="请输入失效时间,如1"  style="width: 90%;"></el-input>
  		</el-form-item>
    </el-col> 
</el-row>
 <el-row>
 	<el-col :span="12">
 	  <el-form-item  prop="intro_pay_time" label="推荐佣金结款周期">
    		<el-select @blur="CheckTime" v-model="form.intro_pay_time" style="width: 90%;" placeholder="请选择结佣时间">
              <el-option label="一个工作日后" value="1"></el-option>
              <el-option label="两个工作日后" value="2"></el-option>
              <el-option label="七个工作日后" value="7"></el-option>
           </el-select>
     </el-form-item>
 	</el-col>
 </el-row>
  <el-row>
 	<el-col :span="12">
 	  <el-form-item prop="visit_pay_time"  label="到访佣金结款周期">
    		<el-select v-model="form.visit_pay_time" style="width: 90%;" placeholder="请选择结佣时间">
              <el-option label="一个工作日后" value="1"></el-option>
              <el-option label="两个工作日后" value="2"></el-option>
              <el-option label="七个工作日后" value="7"></el-option>
           </el-select>
     </el-form-item>
 	</el-col>
 </el-row>
 <el-row>
 	<el-col :span="12">
 	  <el-form-item prop="deal_pay_time"  label="成交佣金结款周期">
    		<el-select  v-model="form.deal_pay_time" style="width: 90%;" placeholder="请选择结佣时间">
              <el-option label="一个工作日后" value="1"></el-option>
              <el-option label="两个工作日后" value="2"></el-option>
              <el-option label="七个工作日后" value="7"></el-option>
           </el-select>
     </el-form-item>
 	</el-col>
 	<el-col :span="12">
 	  <el-form-item  prop="deal_pay_condition" label="成交结款条件">
    		<el-select  v-model="form.deal_pay_condition" style="width: 90%;" placeholder="请选择结佣条件">
              <el-option label="已签订单，且付定金" value="1"></el-option>
              <el-option label="签订购房合同，且付房款" value="2"></el-option>      
           </el-select>
     </el-form-item>
 	</el-col>
 </el-row>
 <el-row>
  <el-col :span="23" >
  	 <el-form-item prop="remark_comment" label="备注：">
    	<el-input  type="textarea" v-model="form.comment"></el-input>
 	 </el-form-item>
  </el-col>	 
</el-row> 
</el-form>

</template>

<script>
	import qs from 'qs'
	import {mapState} from 'vuex'
	export default{
	name:'RecomposeTotalRule',
	data() {
	 const checkNum=(rule,value,callback)=>{
	 	 if(value != null && value != "") {
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
	 }
     return {
      		form: {
         		 visit_confirm_time: '',
         		 valid_visit_time:'',
         		 make_bargain_time:'',	
         		 begin_time: '',
          		 end_time: '',
          		 intro_pay_time:"",
          		 visit_pay_time:'',
          		 deal_pay_time:'',
          		 deal_pay_condition:'',
          		 comment:""
        	},
        	rules:{
          		 	begin_time:[
          		 		{required:true,message:'请选择开始日期',trigger:'blur'},
          		 	],
          		 	end_time:[
          		 		{required:true,message:'请选择截止日期',trigger:'blur'}
          		 	],
          		 	valid_visit_time:[
          		 		{validator:checkNum,trigger:"blur"}
          		 	],
          		 	visit_confirm_time:[
          		 		{validator:checkNum,trigger:'blur'}
          		 	],
          		 	make_bargain_time:[
          		 		{validator:checkNum,trigger:'blur'}
          		 	],
          		 	intro_pay_time:[
          		 		{required:true,message:'请选择推荐结佣周期',trigger:'blur'}
          		 	],
          		 	visit_pay_time:[
          		 		{required:true,message:'请选择到访结佣周期',trigger:'blur'}
          		 	],
          		 	deal_pay_time:[
          		 		{required:true,message:'请选择成交结佣周期',trigger:'blur'}
          		 	],
          		 	deal_pay_condition:[
          		 		{required:true,message:'请选择成交结款条件',trigger:'blur'}
          		 	],
          		 	remark_comment:[
          		 		{required:true,message:'请输入备注',trigger:'blur'},
          		 		{min:1,max:200,message:'输入字数超过1-200字',trigger:'change'}
          		 	]
          	}
        }
    },
    methods: {
      onSubmit() {
      this.$refs.form.validate((valid)=>{    
        if(valid){
      		let url=this.Rooturl+"project/ruleBasic/update";
      		this.$http.post(url,
      			qs.stringify({...this.form})
      		).then(res=>{
      		if(res.code==200){
      			this.$message.success(res.msg);
      			this.$router.push({path:'/index/CommissioCheck'})
      		}else{
      			this.$message.error("提交失败")
      		}
      	 })
      	}
      })  
      },
      back(){
      	 this.$router.push({ path: "/index/CommissioCheck" });
      },  
      CheckTime(){
      	if(this.form.begin_time>this.form.end_time){
      		this.$message.error("截止日期不能小于开始日期");
      		this.canUpload=false;
      	}
      	if(!this.form.begin_time){
      		this.$message.error("请选择开始日期");
      		this.canUpload=false;
      	}
      	if(!this.form.end_time){
      		this.$message.error("请选择截止日期");
      		this.canUpload=false;
      	}
      },
      Upload(id){
      	let url=this.Rooturl+"";
      	this.$http.get(url,{
      		params:{
      			
      		}
      	}).then(res=>{
      		this.from=res.data.data;
      	})
      }
      
   	},
	created(){

	},
	computed:{
		...mapState({
			sels:state=>state.CommissioCheck.sels
		})
	},
	mounted(){
		
	}
}
</script>
	
<style>
	#RecomposeTotalRule el-date-picker {
 		 width: 275px !important;
	}
	#RecomposeTotalRule .check-basetitle{
		height:40px;
		line-height:40px;
		color:#fff;
	}
</style>