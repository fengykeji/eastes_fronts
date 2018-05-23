<template>
	<div id="companyintrobroker" class="attachment m_top" >
		<el-row type="flex" justify="space-between" class="dynamicList-title m_bottom">
            <el-col :span="16"   :push="1" class="Commissio_title">
                <font style="font-size:16px;color:#666"> 推荐佣金</font>
                <font style="font-size:12px;color:#999">(推荐的客户在该项目购置房源后产生的佣金)</font>
            </el-col>
            <el-col :span="5">
                <el-button-group>       
                	<el-button @click="CompanyIntroBrokerAdd" type="primary" size="small" >新增</el-button>
                    <el-button @click="CompanyIntroBrokerChange" type="primary" size="small" >修改</el-button>
                    <el-button @click="deletintrobroker" type="primary" size="small" >删除</el-button>
                </el-button-group>
            </el-col>
        </el-row>
        <el-table :data="IntroBrokerTable" border @selection-change="IntroSelsChange" ref="multipleTable" tooltip-effect="dark" class="apart-table">
            <el-table-column type="selection" reserve-selection="" label="ALL" width="50">
            </el-table-column>
            <el-table-column prop="key" label="序号" width="60">
            </el-table-column>
            <el-table-column prop="planeTime" label="单位" >
            </el-table-column> 
            <el-table-column prop="salary" label="奖励金额(元/套)" >
            </el-table-column>   
        </el-table>
        <el-pagination v-if="false" background layout="prev, pager, next" :total="tableData.length" :pageSize="pageSize" @current-change="handleCurrentChange" class="Img-page">
        </el-pagination>
        <el-dialog title="修改推荐佣金" :visible.sync="IntroVisible"   width="50%" > 	
        	<el-form  ref="Introbroker" :rules="Introrule" :model="Introbrokeform" label-width="140px">
        		<el-form-item prop="brokerage" label="奖励金额(元/套)">
        			<el-input v-model.number="Introbrokeform.brokerage"></el-input>
        		</el-form-item>
        		<el-form-item prop="unit"  label="单位">
        			<el-select v-model="Introbrokeform.unit">
        				<el-option  v-for="(item,idx) in icons" :key="idx" :label="item.param" :value="item.id" >       				</el-option>
        			</el-select>
        		</el-form-item>
        		<el-form-item style='padding-left:25%;'>
        			<el-button @click="IntrobrokerSubmit" size="small" type="primary" >修改</el-button>
        			<el-button @click="Introbrokerclose" size="small"  >关闭</el-button>
        		</el-form-item>
        	</el-form>
		</el-dialog>
		<el-dialog title="新增推荐佣金" :visible.sync="addIntroVisible"   width="50%" > 	
        	<el-form  ref="addintobroker" :rules="Introrule" :model="addIntrobrokeform" label-width="140px">
        		<el-form-item prop="brokerage" label="奖励金额(元/套)">
        			<el-input v-model.number="addIntrobrokeform.brokerage"></el-input>
        		</el-form-item>
        		<el-form-item prop="unit" label="单位">
        			<el-select v-model="addIntrobrokeform.unit">
        				<el-option  v-for="(item,idx) in icons" :key="idx" :label="item.param" :value="item.id" >       				</el-option>
        			</el-select>	
        		</el-form-item>
        		<el-form-item style='padding-left:25%;'>
        			<el-button @click="addIntrobrokerSubmit" size="small" type="primary" >新增</el-button>
        			<el-button @click="addIntrobrokerclose" size="small"  >关闭</el-button>
        		</el-form-item>
        	</el-form>
		</el-dialog>
    </div> 
</template>

<script>
import qs from 'qs'	
export default{
	name:"companyintrobroker",
	    data(){
	    const checkNum=(rule,value,callback)=>{
  			 if(value != null && value != "") {
             if(!(typeof(value)==="number"&&value%1==0)) {
                 callback(new Error('请输入正整数!'))
             }else if(value>999999){
                  callback(new Error("不能大于999999"))
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
			alltablesize: [], 
			pageSize:6,
			tableData:[],
			IntroBrokerTable:[],
			IntroSels:[],
			IntroVisible:false,
			addIntroVisible:false,
			Introbrokeform:{
				brokerage:'',
				unit:34
			},
			addIntrobrokeform:{
				brokerage:'',
				unit:34
			},
			Introrule:{
				brokerage:[
					{validator:checkNum,trigger:'blur'}
				],
				unit:[
					{required:true,message:'人民币单位不能为空',trigger:'blur'}
				]
			}
		}
	},
	methods:{
		getApartmentInfoImgList() {
      		for (let i = 1; i < 2; i++) {
       		  this.tableData.push({
          		key: i,
          		planeTime:"人民币",
          		salary:10000
             });
       }
       this.page();
       },
       page(){
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
       this.IntroBrokerTable = this.alltablesize[0];
      },
      CompanyIntroBrokerChange(){ 	
      	let sels=this.IntroSels;
      	if(sels.length>1){
      		this.$message.error("只能单选")
      	}else if(sels.length==1){
      		this.IntroVisible=true;
     	}else{
      		this.$message.error("请选择内容")
      	}
      },
      CompanyIntroBrokerAdd(){
      	this.addIntroVisible=true;
      	
      },
      IntroSelsChange(sels){
      	if(sels){
      		this.IntroSels=sels;
      	}
      },
      Introbrokerclose(){
      	this.IntroVisible=false;
      },
      addIntrobrokerclose(){
      	this.addIntroVisible=false;
      },
      IntrobrokerSubmit(){
       	this.$refs.Introbroker.validate((valid)=>{
       		if(valid){
       			let url=this.Rooturl+"";
       			this.$http.post(url,qs.stringify({
       				...visitbrokeform
       			})).then(res=>{
       				if(res.data.code==200){
       					this.$message.success(res.data.msg);
       					this.$refs.Introbroker.resetFields();
       				}
       			})
       		}
       	})
      },
      deletintrobroker(){
      	let sels=this.IntroSels;
      	if(sels.length>1){
      		this.$message.error("只能单选")
      	}else if(sels.length==1){
      		let url=this.Rooturl+"";
      		this.$http.post(url,qs.stringify({
      			...sels[0].key
      		})).then(res=>{
      			if(res.data.code==200){
      				this.$message.success(res.data.code);
      			}
      		})
     	}else{
      		this.$message.error("请选择内容")
      	}
      },
      addIntrobrokerSubmit(){
       	this.$refs.addintobroker.validate((valid)=>{
       		if(valid){
       			let url=this.Rooturl+"";
       			this.$http.post(url,qs.stringify({
       				...addIntrobrokeform
       			})).then(res=>{
       				if(res.data.code==200){
       					this.$message.success(res.data.msg);
       					this.$refs.Introbroker.resetFields();
       				}
       			})
       		}
       	})
      },
      getconfig(){
      	let url=this.Rooturl+"config";
      	this.$http.get(url)
      		.then(res=>{
      			this.icons=res.data.data[10].param;
      		})
      }
     
	},
	created(){
		this.getApartmentInfoImgList();
		this.getconfig();
	}
}
</script>

<style lang="scss" scoped>
#companyintrobroker{
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