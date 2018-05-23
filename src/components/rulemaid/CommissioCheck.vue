<template>
	<div id="CommissioCheck">
		<h4>推荐规则设定规则</h4>
		<div v-if="false"> 
			<span></span>
			<input v-model="input" placeholder="请输入内容"></input>
		</div>		
		<div class="attachment m_top" >
			<el-row type="flex" justify="space-between" class="dynamicList-title  m_bottom">
            <el-col :span="16"   :push="1" class="Commissio_title">
               <font style="font-size:16px;color:#666"> 判定规则</font>
            </el-col>
            <el-col :span="7" :push="2" >
                <el-button-group>
                    <el-button type="primary" @click="RecomposeTotal" size="small">查看</el-button>
                    <el-button type="primary" @click="AddTotal" size="small">新增</el-button>
                    <el-button type="primary" @click="RecomposeTotal" size="small" >修改</el-button>
                    <el-button type="primary" @click="showBase" size="small" >终止</el-button>
                </el-button-group>
            </el-col>
        	</el-row>
			<el-table :data="ruleData" @selection-change="BaseselsChange" border ref="multipleTable" tooltip-effect="dark" class="apart-table">
                <el-table-column type="selection" reserve-selection=""  width="50">
                </el-table-column>
                <el-table-column prop="rule_id" label="序号" width="60">
                </el-table-column>
                <el-table-column prop="begin_time" label="开始执行日期"  width="120">
                </el-table-column>
                <el-table-column prop="end_time" label="执行截止日期"  width="120">
                </el-table-column>
            	<el-table-column prop="sureEndTime" label="实际截止日期" width="120">
           		</el-table-column>
            	<el-table-column prop="visit_confirm_time" label="到访保护确认期(分钟)" width="100">
            	</el-table-column>
            	<el-table-column prop="valid_visit_time" label="有效来访保护期(天)" width="100">
            	</el-table-column>
            	<el-table-column prop="make_bargain_time" label="成交保护期(天)" width="100">
            	</el-table-column>
            	<el-table-column prop="payAffirTime" label="推荐佣金结佣周期(天)" width="100">
            	</el-table-column>
            	<el-table-column prop="payVisitTime" label="到访佣金结佣周期" width="100">
            	</el-table-column>
            	<el-table-column prop="payDellTime" label="成交佣金结佣周期" width="100">
            	</el-table-column>
            	<el-table-column prop="state"  label="执行状态" width="100">	
            		<template slot-scope="scope">
     					{{scope.row.state==0?'未执行':'执行中'}}
      			 	</template>
            	</el-table-column>
       		 </el-table>
		</div>
		<el-dialog :visible.sync="BaseVisible" :show-close='nacoin' width="50%">
            <div >
				<el-row style="height:40px;padding-left:40px;background:#545c64 ;">	
					<el-col :span="11">
						<span class="check-basetitle">终止基本规则</span>
					</el-col>
					<el-col :span="6" :push="6" >	
    					<el-button size="small" type="primary" @click="delBase">确认</el-button>
    					<el-button size="small" @click="BaseVisible=false" >取消</el-button>
					</el-col>
				</el-row>
				<el-form ref="BaseForm" :model="BaseForm" style="margin-top:30px" label-width="120px">
					<el-form-item label="终止原因：">
    					<el-select v-model="BaseForm.region"  placeholder="请选择终止原因">
      						<el-option v-for="(item,idx) in endReson" :key="idx"  :label="item.param"  :value="item.id" ></el-option>
   						</el-select>
  					</el-form-item>
  					<el-form-item  prop="desc" label="备注：">
   				 		<el-input type="textarea" v-model="BaseForm.desc"></el-input>
  					</el-form-item>
				</el-form>
			</div>
        </el-dialog>
        <el-dialog :visible.sync="CompanyVisible" :show-close='nacoin' width="50%">
            <div >
				<el-row style="height:40px;padding-left:40px;background:#545c64 ;">	
					<el-col :span="11">
						<span class="check-basetitle">终止公司规则</span>
					</el-col>
					<el-col :span="6" :push="6" >	
    					<el-button size="small" type="primary" @click="delCompany">确认</el-button>
    					<el-button size="small" @click="BaseVisible=false" >取消</el-button>
					</el-col>
				</el-row>
				<el-form ref="CompanyForm" :model="CompanyForm" style="margin-top:30px" label-width="120px">
					<el-form-item label="终止原因：">
    					<el-select v-model="CompanyForm.region"  placeholder="请选择终止原因">
      						<el-option v-for="(item,idx) in endReson" :key="idx"  :label="item.param"  :value="item.id" ></el-option>
   						</el-select>
  					</el-form-item>
  					<el-form-item  prop="desc" label="备注：">
   				 		<el-input type="textarea" v-model="CompanyForm.desc"></el-input>
  					</el-form-item>
				</el-form>
			</div>
        </el-dialog>
        <el-dialog :visible.sync="PersonVisible" :show-close='nacoin' width="50%">
            <div >
				<el-row style="height:40px;padding-left:40px;background:#545c64 ;">	
					<el-col :span="11">
						<span class="check-basetitle">终止个人规则</span>
					</el-col>
					<el-col :span="6" :push="6" >	
    					<el-button size="small" type="primary" @click="delPerson">确认</el-button>
    					<el-button size="small" @click="PersonVisible=false" >取消</el-button>
					</el-col>
				</el-row>
				<el-form ref="PersonForm" :model="PersonForm" style="margin-top:30px" label-width="120px">
					<el-form-item label="终止原因：">
    					<el-select v-model="PersonForm.region"  placeholder="请选择终止原因">
      						<el-option v-for="(item,idx) in endReson" :key="idx"  :label="item.param"  :value="item.id" ></el-option>
   						</el-select>
  					</el-form-item>
  					<el-form-item  prop="desc" label="备注：">
   				 		<el-input type="textarea" v-model="PersonForm.desc"></el-input>
  					</el-form-item>
				</el-form>
			</div>
        </el-dialog>
		<div class="attachment m_top " >
			<el-row type="flex" justify="space-between" class="dynamicList-title m_bottom">
            <el-col :span="16"   :push="1" class="Commissio_title">
                <font style="font-size:16px;color:#666">公司规则</font>
            </el-col>
            <el-col :span="7" :push="1">
                <el-button-group>
                	<el-button type="primary" size="small">审核</el-button>
                    <el-button type="primary" @click="checkCompany" size="small">查看</el-button>
                    <el-button type="primary" @click="addCompany" size="small">新增</el-button>
                    <el-button type="primary" @click="checkCompany" size="small" >修改</el-button>
                    <el-button type="primary" @click="showCompany" size="small" >终止</el-button>
                </el-button-group>
            </el-col>
        	</el-row>
			<el-table :data="CompanyData" @selection-change="CompanyselsChange"  border ref="multipleTable" tooltip-effect="dark" class="apart-table">
                <el-table-column type="selection" reserve-selection="" label="ALL" width="50">
                </el-table-column>
                <el-table-column prop="rule_id" label="序号" width="60">
                </el-table-column>
                <el-table-column prop="project_name" label="企业名称"  width="140">
                </el-table-column>
                <el-table-column prop="project_docker" label="负责人"  width="130">
                </el-table-column>
            	<el-table-column prop="project_docker_tel" label="联系方式" width="150">
           		</el-table-column>
            	<el-table-column prop="compact_begin" label="计划开始日期" width="130">
            	</el-table-column>
            	<el-table-column prop="compact_end" label="计划截止日期" width="130">
            	</el-table-column>
            	<el-table-column prop="act_start" label="实际开始日期" width="130">
            	</el-table-column>
            	<el-table-column prop="act_end" label="实际截止日期" width="130">
            	</el-table-column>
            	<el-table-column prop="state_name" label="申请状态" width="130">
            	</el-table-column>
            	<el-table-column prop="end_state_name" label="执行状态" width="130">
            	</el-table-column>
       		 </el-table>
		</div>
		<div class="attachment m_top" >
			<el-row type="flex" justify="space-between" class="dynamicList-title m_bottom">
            <el-col :span="16"   :push="1" class="Commissio_title">
                <font style="font-size:16px;color:#666"> 个人规则</font>
            </el-col>
            <el-col :span="7" :push="1" >
                <el-button-group>
                    <el-button type="primary" size="small">审核</el-button>
                    <el-button type="primary" @click="checkPerson" size="small">查看</el-button>
                    <el-button type="primary" @click="addpersonrule" size="small">新增</el-button>
                    <el-button type="primary" @click="checkPerson" size="small" >修改</el-button>
                    <el-button type="primary" @click="showPerson" size="small" >终止</el-button>
                </el-button-group>
            </el-col>
        	</el-row>
			<el-table :data="introData" border @selection-change="PersonselsChange" ref="multipleTable" tooltip-effect="dark" class="apart-table">
                <el-table-column type="selection" reserv-selection='' label="ALL" width="50">
                </el-table-column>
                <el-table-column prop="key" label="序号" width="60">
                </el-table-column>
                <el-table-column prop="fileName" label="规则名称"  width="140">
                </el-table-column>
                <el-table-column prop="atachment" label="规则类型"  width="130">
                </el-table-column>
            	<el-table-column prop="updataPerson" label="计划开始日期" width="150">
           		</el-table-column>
            	<el-table-column prop="updataTime" label="计划截止日期" width="130">
            	</el-table-column>
            	<el-table-column prop="updataTime" label="实际开始时间" width="130">
            	</el-table-column>
            	<el-table-column prop="updataTime" label="实际截止时间" width="130">		
            	</el-table-column>
            	<el-table-column prop="updataTime" label="状态" width="130">
            	</el-table-column>
            	<el-table-column prop="islimit" label="筛选经济人" width="130">
            		<template slot-scope="scope">
            			<el-switch
 						 	v-model="scope.row.islimit"
  							active-color="#13ce66"
  							inactive-color="#ddd">
						</el-switch>
            		</template>
            	</el-table-column>
       		 </el-table>
		</div>
		
	</div>
</template>

<script>
	import {mapMutations} from 'vuex'
	export default{
		name:'CommissioCheck',
		data(){
			return{
				endReson:'',
				nacoin:false,
				input:"",
				ruleData:[],
				introData:[
					{
						key:1,
						fileName:'规则一',
						atachment:'未认证',
						islimit:false,
						updataPerson:'2018-01-09',
						updataTime:'2018-10-20'
					},
					{
						key:2,
						fileName:'规则二',
						atachment:'未认证',
						islimit:true,
						updataPerson:'2018-01-09',
						updataTime:'2018-10-20'
					}
					
				],
				dellData:[],
				visitedData:[],
				checked:false,
				id:2,
				Basesels:[],
				Personsels:[],
				Companysels:[],
				CompanyData:[],
				BaseVisible:false,
				CompanyVisible:false,
				PersonVisible:false,
				BaseForm:{
					region:'',
					desc:'',
					id:''
				},
				CompanyForm:{
					id:'',
					region:'',
					desc:''
				},
				PersonForm:{
					id:'',
					region:'',
					desc:''
				},
				rules:{
					region:[
						{required:true,message:'不能为空',trigger:'blur'}
					],
					desc:[
						{required:true,message:'不能为空',trigger:'blur'},
						{min:1,max:200,message:'不能超过200',trigger:'change'}
					]
				},
				tableData:{
					
				}
			}	
		},
		created(){
				this.getruleData();
				//this.getCompanyData();
				this.getConfig();
				this.getCompanyRules();
		},
		mounted(){
			
		},
		methods:{
			AddTotal(){
				 this.$router.push({ path: "/index/AddTotalRule" });
			},
			StopTotal(){
				this.$router.push({ path: "/index/EndTotalRule" });
			},
			RecomposeTotal(){
				let sels=this.Basesels;
      			if(sels.length>1){
      				this.$message.error("查看只能单选")
      			}else if(sels.length==1){
      				this.CommissioCheck(sels[0].key);
      				this.$router.push({ path: "/index/RecomposeTotalRule" });
      			}else{
      				this.$message.error("请选择查看内容")
     			}		
			},	
			CheckCompanyRule(){
				
			},
			getruleData(){
				let url=this.Rooturl+"project/ruleBasic/list";
				this.$http.get(url,{
					state:0,
					p:'0'
				})
				 .then((res)=>{
				 	this.ruleData=res.data.data.data;
				 })
			},
			getCompanyData(){
				let url=this.Rooturl+"project/ruleCompany/list";
				this.$http.get(url)
				 .then((res)=>{
				 	this.ruleData=res.data.data.data;
				 	console.log(this.ruleData);
				 })
			},
			check(){
      			let sels=this.Basesels;	
      			if(sels.length>1){
      				this.$message.error("查看只能单选")
      			}else if(sels.length==1){
      				this.CommissioCheck(sels);
      				this.$router.push({path: '/index/AddTotalRule'})
      			}else{
      				this.$message.error("请选择查看内容")
     			}
    		},
    		BaseselsChange(sels) {  
    			if(sels){
    		   		this.Basesels=sels; 
    			}   
    		},
    		PersonselsChange(sels) {  
    			if(sels){
    		   		this.Personsels=sels; 
    			}   
    		},
    		CompanyselsChange(sels) {  
    			if(sels){
    		   		this.Companysels=sels; 
    			}   
    		},
    		delBase(){
    			this.$refs.BaseForm.validate((valid)=>{
    				if(valid){
    					let url=this.Rooturl+"";
    					this.BaseFomr.id=sels.id;
    					this.$http.post(url,{
    						...this.BaseForm
    					}).then(res=>{
    						if(res.data.code==200){
    							this.$message.success("删除成功");
    							this.$refs.BaseForm.resetFields();
    						}else{
    							this.$message.error(res.data.msg);
    						}
    					});
    				}
    			})
    			
    		},
    		delCompany(){
    			this.$refs.CompanyForm.validate((valid)=>{
    				if(valid){
    					let url=this.Rooturl+"";
    					this.CompanyFomr.id=Companysels.id;
    					this.$http.post(url,{
    						...this.CompanyForm
    					}).then(res=>{
    						if(res.data.code==200){
    							this.$message.success("删除成功");
    							this.$refs.CompanyForm.resetFields();
    						}else{
    							this.$message.error(res.data.msg);
    						}
    					});
    				}
    			})
    			
    		},
    		PersonselsChange(sels) {  
    			if(sels){
    		   		this.Personsels=sels; 
    			}   
    		},
    		delPerson(){
    			this.$refs.PersonForm.validate((valid)=>{
    				if(valid){
    					let url=this.Rooturl+"";
    					this.BaseFomr.id=Personsels.id;
    					this.$http.post(url,{
    						...this.PersonForm
    					}).then(res=>{
    						if(res.data.code==200){
    							this.$message.success("删除成功");
    							this.$refs.PersonForm.resetFields();
    						}else{
    							this.$message.error(res.data.msg);
    						}
    					});
    				}
    			})	
    		},
    		...mapMutations([
    			'CommissioCheck'
    		]),
    		getConfig(){
    			let url=this.Rooturl+"config";
    			this.$http.get(url).then(res=>{
    				this.endReson=res.data.data[6].param;
    			})
    		},
    		showBase(){
    			let sels=this.Basesels;	
      			if(sels.length>1){
      				this.$message.error("删除只能单选")
      			}else if(sels.length==1){
      				this.BaseVisible=true;
      			}else{
      				this.$message.error("请选择删除内容")
     			}
    			
    		},
    		showPerson(){
    			let sels=this.Personsels;	
      			if(sels.length>1){
      				this.$message.error("删除只能单选")
      			}else if(sels.length==1){
      				this.PersonVisible=true;
      			}else{
      				this.$message.error("请选择删除内容")
     			}
    		},
    		showCompany(){
    			let sels=this.Companysels;	
      			if(sels.length>1){
      				this.$message.error("删除只能单选")
      			}else if(sels.length==1){
      				this.CompanyVisible=true;
      			}else{
      				this.$message.error("请选择删除内容")
     			}
    			
    		},
    		checkCompany(){
    			let sels=this.Companysels;	
      			if(sels.length>1){
      				this.$message.error("查看只能单选")
      			}else if(sels.length==1){
      				this.CommissioCheck(sels[0].rule_id);
      				this.$router.push({ path: "/index/CheckCompanyRule" });	
      			}else{
      				this.$message.error("请选择查看内容")
     			}
    			
    		},
    		checkPerson(){
    			let sels=this.Personsels;	
      			if(sels.length>1){
      				this.$message.error("查看只能单选")
      			}else if(sels.length==1){
      				this.CommissioCheck(sels);
      				this.$router.push({ path: "/index/CheckPersonRule" });	
      			}else{
      				this.$message.error("请选择查看内容")
     			}
    		},
    		addCompany(){
      			this.$router.push({path: '/index/AddCompanyRule'});
    		},
    		addPerson(){
    			let sels=this.Personsels;	
      			if(sels.length>1){
      				this.$message.error("查看只能单选")
      			}else if(sels.length==1){
      				this.CommissioCheck(sels[0].rule_id);
      				this.$router.push({path: '/index/AddTotalRule'})
      			}else{
      				this.$message.error("请选择查看内容")
     			}
    		},
    		getCompanyRules(){
    			let url=this.Rooturl+"project/ruleCompany/getList";
    			this.$http.get(url)
    				.then(res=>{
    					this.CompanyData=this.sortTable(res.data.data.data);
    				})
    		},
    		sortTable(arr){
      		 let sarr=[];
      		 for(let y=1;y<arr.length+1;y++){
      		 	for(let i=0;i<arr.length;i++){
      				if(arr[i].rule_id==y){
      					sarr.push(arr[i]);
      				}
      			}
      		 }
      		
      			return sarr;
     		},
     		addpersonrule(){
     			this.$router.push({path:'/index/AddPersonRule'})
     		}
    		
		}
		
	}
</script>

<style scoped lang="scss">
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
	h4{
		width:100%;
		text-align: left;
		color:#fff;
		background: #545c64;
		height:40px;
		line-height: 40px;
		font-weight:500;
		padding-left:20px;
		font-size: 16px;
		margin:0px;
	}
#CommissioCheck{	
.el-select{
	width:100%!important;
}
.el-input,.el-textarea__inner{
	width:100%!important;
}
.el-button{
	margin-top:3px!important;
}
.el-dialog__body{
	padding:0px 0px;
	padding-top:0px!important;
	padding-bottom:0px!important;
	padding-left:0px!important;
	padding-right:0px!important;
}
.el-dialog{
	padding:0px 0px!important;
	padding-top:0px!important;
	padding-bottom:0px!important;
	padding-left:0px!important;
	padding-right:0px!important;
}
.check-basetitle{
	color:#fff;
	line-height: 40px;
	font-size: 16px;
}
.el-dialog__header{
	display: none!important;
}
}
#CommissioCheck	.el-dialog__body{
		padding:0px 0px!important;
		padding-top:0px!important;
		padding-bottom:0px!important;
		padding-left:0px!important;
		padding-right:0px!important;
	}
</style>