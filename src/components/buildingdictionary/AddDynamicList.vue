<template>
	<div id="AddDynamicList">
		<el-row style="height:40px;padding-left:40px;background:#545c64 ;">	
			<el-col :span="12">
				<span class="check-basetitle">发布动态</span>
			</el-col>
			<el-col :span="6" :push="6" >	
				<el-button size="small" type="primary" @click="back" >预览</el-button>
    			<el-button size="small" type="primary" @click="onSubmit">确认</el-button>
    			<el-button size="small" @click="back" >取消</el-button>
			</el-col>
		</el-row>
		<el-row style="margin:10px 0px;padding-right:20px;">
			<el-form ref="form" :model="form" :rules="form.rules" label-width="80px">
  				<el-form-item label="标题" prop="title">
   					 <el-input v-model="form.title" placeholder="请输入标题1-26字"></el-input>
 				</el-form-item>
 				<el-form-item label="简述" prop="desc" >
   					  <el-input type="textarea" placeholder="请输入简述最多200字" v-model="form.desc"></el-input>
 				</el-form-item>
 			</el-form>		 
		</el-row>
		<el-row>
		<div class="editor-container">
      			<UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
   		 </div>
		</el-row>
		
	</div>
</template>

<script>
import UE from './UE';
export default{
    name:'AddDynamicList',
	data () {
       return {
        defaultMsg: '这是测试文本',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
        form:{
        	name:'',
        	desc:"",
        	rules:{
        		title:[
        			{  required: true,message: '请输入标题1-26字',trigger: 'blur'},
        			{  min: 1,max:20,trigger: 'blur'}
        		],
        		desc:[
        			{  required: true,message: '请输入简述最多200字',trigger: 'blur'},
        			{  min: 1,max:200,trigger: 'blur'}
        		]
        	}
        		
        }
      }
   },
   components:{UE},
   methods: { 
      onSubmit(){
			  let url=this.Rooturl+"project/ruleCompany/getList";
         	  this.$http.get(url,{
         		params:{
         			title:this.form.title,
         			desc:this.form.desc,
         			content: this.getUEContent()//提交富文本的内容
         		}
       		  }).then(res=>{});
       },
       back(){
      	 	this.$router.push({ path: "/index/dynamicList" });
       },
       getUEContent() {
        let content = this.$refs.ue.getUEContent();
       }
   },
   mounted(){
   	 	
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
#AddDynamicList 	.Commissio_title{
		line-height:32px;
	}
	#AddDynamicList .check-basetitle{
		height:40px;
		line-height:40px;
		color:#fff;
	}
	#AddDynamicList .el-button{
		margin-top:3px!important;
	}
	
	#AddDynamicList .info{
    border-radius: 10px;
    line-height: 20px;
    padding: 10px;
    margin: 10px;
    background-color: #ffffff;
  }
</style>