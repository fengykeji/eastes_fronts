<template>
 <div id="companyvisitbrokeragetable" class="attachment m_top" >
		<el-row type="flex" justify="space-between" class="dynamicList-title m_bottom">
            <el-col :span="16"   :push="1" class="Commissio_title">
                <font style="font-size:16px;color:#666"> 到访佣金</font>
                <font style="font-size:12px;color:#999">(推荐的客户在该项目购置房源后产生的佣金)</font>
            </el-col>
            <el-col :span="5">
                <el-button-group>   
                	<el-button @click="addCompanyBrokerChange" type="primary" size="small" >新增</el-button>
                    <el-button @click="CompanyBrokerChange" type="primary" size="small" >修改</el-button>
                    <el-button @click="delevisitbroker" type="primary" size="small" >删除</el-button>
                </el-button-group>
            </el-col>
        </el-row>
        <el-table :data="VisitBrokerTable" border @selection-change="VisitSelsChange" ref="multipleTable" tooltip-effect="dark" class="apart-table">
            <el-table-column type="selection" reserv-selection="" label="ALL" width="50">
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
        <el-dialog title="修改到访佣金" :visible.sync="VisitVisible"   width="50%" > 	
        	<el-form  ref="visitbroker" :rules="rules" :model="visitbrokeform" label-width="140px">
        		<el-form-item prop="brokerage" label="奖励金额(元/套)">
        			<el-input v-model.number="visitbrokeform.brokerage"></el-input>
        		</el-form-item>
        		<el-form-item prop="unit" label="单位">
        			<el-select v-model="visitbrokeform.unit">
        				<el-option  v-for="(item,idx) in visiticons" :key="idx" :label="item.param" :value="item.id" >       				</el-option>
        			</el-select>	
        		</el-form-item>
        		<el-form-item style='padding-left:25%;'>
        			<el-button @click="visitbrokerSubmit" size="small" type="primary" >修改</el-button>
        			<el-button @click="visitbrokerclose" size="small"  >关闭</el-button>
        		</el-form-item>
        	</el-form>
		</el-dialog>
		<el-dialog title="新增到访佣金" :visible.sync="addVisitVisible"   width="50%" > 	
        	<el-form  ref="addvisitbroker" :rules="rules" :model="addvisitbrokeform" label-width="140px">
        		<el-form-item prop="brokerage" label="奖励金额(元/套)">
        			<el-input v-model.number="addvisitbrokeform.brokerage"></el-input>
        		</el-form-item>
        		<el-form-item prop="unit" label="单位">
        			<el-select v-model="addvisitbrokeform.unit">
        				<el-option  v-for="(item,idx) in visiticons" :key="idx" :label="item.param" :value="item.id" >       				</el-option>
        			</el-select>	
        		</el-form-item>
        		<el-form-item style='padding-left:25%;'>
        			<el-button @click="addvisitbrokerSubmit" size="small" type="primary" >新增</el-button>
        			<el-button @click="addvisitbrokerclose" size="small"  >关闭</el-button>
        		</el-form-item>
        	</el-form>
		</el-dialog>
</div> 

</template> 

<script>
import qs from 'qs'
export default{
	name:'companyvisitbrokeragetable',
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
			addvisitbroker:false,
			addVisitVisible:false,
			visiticons:[],
			alltablesize: [], 
			pageSize:6,
			tableData:[],
			VisitBrokerTable:[],
			VisitSels:[],
			VisitVisible:false,
			visitbrokeform:{
				brokerage:'',
				unit:34
			},
			addvisitbrokeform:{
				brokerage:'',
				unit:34
			},
			rules:{
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
       this.VisitBrokerTable = this.alltablesize[0];
      },
      VisitSelsChange(sels){
      	if(sels){
      		this.VisitSels=sels;
      	}
      },
      CompanyBrokerChange(){
      	let sels=this.VisitSels;
      	if(sels.length>1){
      		this.$message.error("只能单选")
      	}else if(sels.length==1){
      		this.VisitVisible=true;
     	}else{
      		this.$message.error("请选择内容")
      	}
      		
      },
      addCompanyBrokerChange(){
      	this.addVisitVisible=true;
      },
      visitbrokerclose(){
      	this.VisitVisible=false;
      },
      addvisitbrokerSubmit(){
      	this.$refs.addvisitbroker.validate((valid)=>{
       		if(valid){
       			let url=this.Rooturl+"";
       			this.$http.post(url,qs.stringify({
       				...addvisitbrokeform
       			})).then(res=>{
       				if(res.data.code==200){
       					this.$message.success(res.data.msg);
       				}
       			})
       		}
       	})
      },
      delevisitbroker(){
      	let sels=this.VisitSels;
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
      visitbrokerSubmit(){
       	this.$refs.visitbroker.validate((valid)=>{
       		if(valid){
       			let url=this.Rooturl+"";
       			this.$http.post(url,qs.stringify({
       				...visitbrokeform
       			})).then(res=>{
       				if(res.data.code==200){
       					this.$message.success(res.data.msg);
       				}
       			})
       		}
       	})
      },
      getconfig(){
      	let url=this.Rooturl+"config";
      	this.$http.get(url)
      		.then(res=>{
      			this.visiticons=res.data.data[10].param;
      		})
      },
      addvisitbrokerclose(){
      	this.addVisitVisible=false;
      }
     
	},
	created(){
		this.getApartmentInfoImgList();
		this.getconfig();
	}
}
</script>

<style lang="scss" scoped >
#companyvisitbrokeragetable{
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