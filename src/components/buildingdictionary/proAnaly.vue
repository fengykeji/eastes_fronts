<template>
    <div id="proAnaly">
        <el-row class="proAnalyinfo" type="flex" justify="space-between">
            <el-col :span="4">
                <span class="proAnaly-title">查看项目分析</span>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" size="small" >预览</el-button>
                <el-button  size="small" @click="changedisc" >保存</el-button>
            </el-col>
        </el-row>
        <el-form  :model="proAnalyForm" ref="form" :rules="rules" label-width="120px" class="analyForm">
            <el-form-item  prop="advantage" label="项目优势:">
                <el-input type="textarea" autosize v-model="proAnalyForm.advantage"></el-input>
            </el-form-item>
             <el-form-item  prop="rim" label="周边分析:">
                <el-input type="textarea" autosize v-model="proAnalyForm.rim"></el-input>
            </el-form-item>
             <el-form-item prop="increase_value" label="升值空间:">
                <el-input type="textarea" autosize v-model="proAnalyForm.increase_value"></el-input>
            </el-form-item>
             <el-form-item prop="fetch" label="适合人群:">
                <el-input type="textarea" autosize v-model="proAnalyForm.fetch"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import qs from 'qs'
export default {
  name: "proAnaly",
  data() {
    return {
        proAnalyForm: {
            advantage:"房子二梯三户边套，南北通透户型，产证面积89平实用95平，可谈朝南带阳台，厨房朝北带很大生活阳台，一个卧室朝南，二个朝南。非常方正，没有一点浪费空间。",
            rim:"位于高新区繁华地段临学校，步行街三十米，大型超市菜市场，今年刚刚精装家具，家电刚刚买有车位拎包入住。带车位停车方便",
            increase_value:"位于高新区繁华地段临学校，步行街三十米，大型超市菜市场，今年刚刚精装家具，家电刚刚买有车位拎包入住。带车位停车方便",
            fetch:"此房子适合得到文人雅士的推崇，如教授学者，小资情调白领人员等，特别是英式田园赢得很多女性的喜爱。"
        },
        rules:{
        	rim:[
        		{required:true,message:'不能为空',trigger:'blur'},
        		{min:1,max:200,message:'不能超过200',trigger:'blur'}
        	],
        	advantage:[
        		{required:true,message:'不能为空',trigger:'blur'},
        		{min:1,max:200,message:'不能超过200',trigger:'blur'}
        	],
        	increase_value:[
        		{required:true,message:'不能为空',trigger:'blur'},
        		{min:1,max:200,message:'不能超过200',trigger:'blur'}
        	],
        	fetch:[
        		{required:true,message:'不能为空',trigger:'blur'},
        		{min:1,max:200,message:'不能超过200',trigger:'blur'}
        	]
        },
        Froms:{
        	advantage:'',
        	rim:'',
        	fetch:'',
        	increase_valu:''
        }
    }
  },
  methods:{
    	getdisc(){
    		let url=this.Rooturl+"project/analyse/get";
    		this.$http.get(url)
    			.then(res=>{
    				this.proAnalyForm=res.data.data;
    			})
    	},
    	changedisc(){
    		let url=this.Rooturl+"project/analyse/update";		
    		this.$refs.form.validate((valid)=>{
				if(valid){
    				this.$http.post(url,
    					qs.stringify({
    						advantage:this.proAnalyForm.advantage,
    						fetch:this.proAnalyForm.fetch,
    						increase_value:this.proAnalyForm.increase_value,
    						rim:this.proAnalyForm.rim
    					})
    				).then(res=>{
    					if(res.data.code==200){
    						this.$message.success(res.data.msg);
    					}else{
    						this.$message.error("修改失败");
    					}
    				})
    			}	
    		})	
    	},
    	adddisc(){
    		let url=this.Rooturl+"project/analyse/create";
    		this.$refs.form.validate((valid)=>{
				if(valid){
    				this.$http.post(url,
    					qs.stringify({...this.proAnalyForm})
    				).then(res=>{

    				})
    			}	
    		})	
    	}
   },
   created(){
   		this.getdisc();
   }
};
</script>
<style scoped>
.proAnalyinfo {
  height: 40px;
  line-height: 40px;
  margin-bottom: 20px;

  background-color: #545c64;
  color:#fff;
 
}
.proAnaly-title {
  display: block;
  margin-left: 20px;
  font-size: 16px;
}
.analyForm {
    width: 750px;
    margin: 50px auto;
}
</style>


