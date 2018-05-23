<template>
<div id="BuildingDetail"> 
	<el-row style="height:40px;padding-left:40px;background:#545c64 ;">	
		<el-col :span="12">
			<span class="check-basetitle">楼栋详情</span>
		</el-col>
		<el-col :span="4" :push="8" >	
    		<el-button size="small" type="primary" @click="onSubmit">确认</el-button>
    		<el-button size="small" @click="back" >取消</el-button>
		</el-col>
	</el-row>
	<el-row style="padding:10px;">
		<el-form ref="form" :model="form" label-width="80px">
			<el-col :span="4">
				 <b  style="text-align:center;line-height:40px;height:40px;width:190px;font-size:16px;display: inline-block;" ref="LDID" :id="form.LDID">{{form.LDMC}}</b>
			</el-col>
			<el-col :span="20">
				 <el-select v-model="value" @change="selechange" placeholder="请选择活动区域">
     			 	<el-option v-for="(item,idx) in form.DYLIST" :key="idx"  :label="item.DYMC" :value="item.DYID"></el-option>
   				 </el-select>
			</el-col>
		</el-form>
	</el-row>
	<el-row style="padding:10px;margin-left:10px">
		<el-button size="small" style="color:#fff" class="fontinfo" >已定</el-button>
		<el-button size="small" style="color:#fff" class="fontdanger" >已售</el-button>
		<el-button size="small" style="color:#fff" class="fontsuccess">未售</el-button>
	</el-row>
	<el-row v-if="tableData">
		<div class="row" v-for="item in tableData">
			<div class="asider "><font>{{item.FLOORNUM}}L</font></div>
			<div v-for="it in item.LIST" class="right_content">
				<font @click="showDetail($event)" v-if="it.FJZT<2" class="fontsuccess">{{it.FJMC}}</font>
				<font @click="showDetail($event)" v-else-if="it.FJZT==4" class="fontdanger">{{it.FJMC}}</font>
				<font @click="showDetail($event)" v-else class="fontinfo">{{it.FJMC}}</font>
			</div>
		</div>
	</el-row>
	<el-dialog :title="title"  :visible.sync="centerDialogVisible"  width="30%">
		
		<el-row>
			<div>
				<h5>房源</h5>
				<div class="dislogrows">
					<div>房号：</div>
					<div>{{dialogData.FJMC}}</div>
				</div>
				<div class="dislogrows">
					<div>楼栋：</div>
					<div>{{dialogData.LDMC}}</div>
				</div>
				<div class="dislogrows">
					<div>单元：</div>
					<div>{{dialogData.DYMC}}</div>
				</div>
				<div class="dislogrows">
					<div>楼层：</div>
					<div>{{dialogData.FLOORNUM}}</div>
				</div>
				<h5>价格</h5>
				<div class="dislogrows">
					<div>计价规则：</div>
					<div>{{dialogData.JJGZ}}</div>
				</div>
				<div class="dislogrows">
					<div>单价：</div>
					<div>{{dialogData.JZDJ}}</div>
				</div>
				<div class="dislogrows">
					<div>总价：</div>
					<div>{{dialogData.FJZJ}}</div>
				</div>
				<h5>物业&nbsp;住宅参数</h5>
				<div class="dislogrows">
					<div>建筑面积：</div>
					<div>{{dialogData.JZMJ}}</div>
				</div>
				<div class="dislogrows">
					<div>套内面积：</div>
					<div>{{dialogData.TNMJ}}</div>
				</div>
				<div class="dislogrows">
					<div>户型信息：</div>
					<div>{{dialogData.HXMC}}</div>
				</div>
			</div>
		</el-row>
	</el-dialog>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default{
		name:'BuildingDetail',
		data(){
			return{
				value:"一单元",
				unit_id:'',
				build_id:'',
				form:{
					LDID:'27',
					DYLIST:[]
				},
				tableData:[],
				dialogData:"",
				centerDialogVisible:false,
				title:'云算公馆'
			}
		},
		computed:{
			...mapState({
				buildId:state=>state.generalLayout.build_id
			})
		},
		methods:{
			back(){
      	 		this.$router.push({ path: "/index/generalLayout" });
     		},
     		onSubmit(){
			  let url=this.Rooturl+"project/ruleCompany/getList";
         	  this.$http.get(url,{
         	
       		  }).then(function(res){
        			console.log(res);
        			
            })},
            getProData(){
            	let url=this.Rooturl+"user/yunsuan/project";
            	this.$http.get(url,{
            		params:{
            			project_id:1
            		}
            	}).then(res=>{ localStorage.setItem("project",JSON.stringify(res));})
            },
            getBuilData(){
            	let url=this.Rooturl+"user/yunsuan/build";
            	this.$http.get(url,{
            		params:{
            			project_id:1
            		}
            	}).then(res=>{     
            		localStorage.setItem("BuilData",JSON.stringify(res));
            		let todata=res.data.data;
            		for(var i=0;i<todata.length;i++){
            			if(todata[i].LDID==this.buildId){
            				this.form=todata[i];
            			}
            		}
            		this.unit_id=this.form.DYLIST[0].DYID;
            		this.build_id=this.form.LDID;
            		this.getUnitData();
            	})
            },
            getUnitData(){
            	let url=this.Rooturl+"user/yunsuan/unit";
            	this.$http.get(url,{
            		params:{
            			project_id:2,
            			build_id:this.build_id,
            			unit_id:this.unit_id
            		}
            	}).then(res=>{this.tableData=res.data.data;localStorage.setItem("UnitData",JSON.stringify(res));})
            	  .catch(err=>{console.log(err)})
            },
            selechange(){
            	this.unit_id=this.value;
            	this.getUnitData();
            },
            showDetail(e){
            	let src=e.currentTarget.innerHTML;
            	for(let i=0;i<this.tableData.length;i++){
            		for(let y=0;y<this.tableData[i].LIST.length;y++){  			
            			if(this.tableData[i].LIST[y].FJMC==src){
            			this.dialogData=this.tableData[i].LIST[y];
            		}
            	 }
            		
            	}
            	console.log(this.dialogData);
            	this.centerDialogVisible=true;
            },
            addTotal(){
            	let res=localStorage.getItem("UnitData");
            	console.log(res);
            	this.tableData=res.data.data;
            	console.log(res.data);
            	this.centerDialogVisible=true;
            }
		},
		created(){
			this.getProData()
			this.getBuilData()
			 //this.addTotal()
		}
}
</script>

<style>
	#BuildingDetail{
		
	}
	#BuildingDetail .m_bottom{
		margin-bottom:20px;
		border:1px solid #ddd;
	}
	 #BuildingDetail .m_top{
		margin-top:50px;
	}
	#BuildingDetail .Commissio_title{
		line-height:32px;
	}
	#BuildingDetail  .check-basetitle{
		height:40px;
		line-height:40px;
		color:#fff;
	}
	#BuildingDetail .el-button{
		margin-top:3px!important;
	}
	#BuildingDetail .el-form{
		margin-top:40px;
	}
	#BuildingDetail .row{
		width:100%;
		height:40px;
		float:left;
		margin-left:20px;
	}
	#BuildingDetail  .asider{
		height:40px;
		width:140px;
		border: 1px solid #666;
		float:left;
		padding:5px;
		box-sizing: border-box!important;
		cursor:pointer;
	}
	#BuildingDetail  .asider font{
		text-align:center;
		line-height: 28px;
		height:28px;
		width:128px;
		float:left;
		border: 1px solid #999;
		box-sizing: border-box!important;
		cursor:pointer;
	}
	#BuildingDetail  .right_content{
		height:40px;
		width:160px;
		float:left;
		text-align:center;
		line-height: 40px;
	}
	#BuildingDetail  .right_content font{
		float:left;
		text-align:center;
		line-height: 40px;
		height:40px;
		width:160px;
		border: 1px solid #fff;
		cursor:pointer;
	}
	#BuildingDetail .fontinfo{
		background: #FBD997!important;
	
	}
	#BuildingDetail .fontdanger{
		background: #F47564!important;

	}
	#BuildingDetail .fontsuccess{
		background: #ddd!important;

	}
	#BuildingDetail .dislogrows{
		float:left;
		width:100%;
		display: flex;
		height:32px;
		box-sizing: border-box!important;
	}
	#BuildingDetail .dislogrows div:nth-child(1){
		width:100px;
		height:32px;
		line-height: 32px;
		text-align: right;
		box-sizing: border-box!important;
	}
	#BuildingDetail .dislogrows div:nth-child(2){
		width:100px;
		height:32px;
		line-height: 32px;
		text-align: left;
		flex: 1;
		box-sizing: border-box!important;
		padding-left: 10px;
	}
	#BuildingDetail h5{
		float:left;
		width:100%;
		height:32px;
		line-height: 32px;
		text-align: left;
		box-sizing: border-box!important;
		font-size:16px;
		margin:0px;
	}
	#BuildingDetail  .el-dialog__title{
		float:left!important;
		width:100%!important;
		text-align: center!important;
		font-weight: 400!important;
		font-weight:500!important;
	}
	#BuildingDetail .el-dialog__header{
		float:left;
		padding:15px 0px;
		border-bottom: 1px solid #999;
		width:100%!important;
		margin-bottom:10px;
	}
</style>