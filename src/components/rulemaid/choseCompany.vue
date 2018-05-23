<template>
<div id="choseCompany">
<el-form  :model="formInline" ref="formInline" :rules="rules" >
<el-row style="height:40px;padding-left:40px;background:#545c64 ;">	
	<el-col :span="12">
		<span class="check-basetitle">选择公司</span>
	</el-col>
	<el-col :span="4" :push="8" >
		 <el-form-item>
    		<el-button size="small" type="primary" @click="onSubmit">确认</el-button>
    		<el-button size="small" @click="back" >取消</el-button>
  		</el-form-item>
	</el-col>
</el-row>
<el-row style="margin-top:30px;padding-left:20px;">
	<el-col :span="12">
          <el-form-item label="项目地址:">
            <el-col :span="6">
              <el-select v-model="formInline.province_name" placeholder="请选择" @change="provinceChange($event)">
                <el-option v-for="(item,idx) in firoptions" :key="idx" :label="item.name"  :value="item.name">
                </el-option>
              </el-select>
            </el-col>
            <el-col  :span="7">
              <el-select ref="cityName" v-model="formInline.city_name" placeholder="请选择" @change="cityChange($event)">
                <el-option  v-for="(item,id) in secoptions" :key="id" :label="item.name"  :value="item.name" >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="7">
              <el-select v-model="formInline.district_name" placeholder="请选择"  >
                <el-option v-for="(item,idy) in thioptions" :key="idy" :label="item"  :value="item">      
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
    </el-col>
	<el-col :span="9">
		<el-form-item label="">
    		<el-input v-model="formInline.company" placeholder="输入公司名称或营业执照"></el-input>
  		</el-form-item>
	</el-col>
	<el-col :span="3">
		<el-form-item>
    		<el-button type="primary" size="middle" @click="onSubmit">查询</el-button>
  		</el-form-item>
	</el-col>
</el-row>
</el-form>	


<div class="attachment m_top" >
		<el-row type="flex" justify="space-between" class="dynamicList-title m_bottom">
            <el-col :span="16"   :push="1" class="Commissio_title">
                <font style="font-size:16px;color:#666">查询结果</font>      
            </el-col>
            <el-col :span="5">
             
            </el-col>
        </el-row>
        <el-table :data="Data" border @selection-change="selsChange" ref="multipleTable" tooltip-effect="dark" class="apart-table">
            <el-table-column type="selection" reserve-selection="" id="sele"   width="50">
            </el-table-column>
            <el-table-column prop="key" label="序号" width="60">
            </el-table-column>
            <el-table-column prop="companyName" label="公司名称" >
            </el-table-column>
            <el-table-column prop="customerName" label="地址"  >
            </el-table-column>
            <el-table-column prop="phone" label="营业执照" >
            </el-table-column>
            <el-table-column prop="planeTime" label="对接人" >
            </el-table-column> 
             <el-table-column prop="planeTime" label="联系方式" >
            </el-table-column>   
        </el-table>
        <el-pagination  background layout="prev, pager, next" :total="tableData.length" :pageSize="pageSize" @current-change="handleCurrentChange" class="Img-page ">
        </el-pagination>
    </div> 
</div>    
</template>

<script>
import qs from 'qs'	
	 export default{
	 	name:'choseCompany',
	 	data(){
	 		return{
	 			formInline: {
          			company: '',
         			region: '',
         			district_name:'',
         			province_name:'',
         			city_name:''
        	    },
        	    Data: [],
     			tableData: [],
           		pageSize: 8,
            	alltablesize: [],
            	firoptions:[],
            	secoptions:[],
            	thioptions:[],
            	sels:[],
            	rules:{
            		company:[
            			{required:true,message:'不能为空',trigger:'blur'}
            		],
            		province_name:[
            			{required:true,message:'不能为空',trigger:'blur'}
            		],
            		city_name:[
            			{required:true,message:'不能为空',trigger:'blur'}
            		],
            	}
	 		}
	 	},
	 	methods:{
	 		onSubmit(){
	 		 this.$refs.formInline.validate((valid)=>{
	 		 	if(valid){
	 		 		let url=this.Rooturl+"";
         	   		this.$http.post("url",qs.stringify({
         	  	  		...sels[0]
         	    	})).then(function(res){
        				this.Data=res.data.data;
         			})
	 		 	}
	 		 })
	 		    
            },
     		back(){
      	 		this.$router.push({ path: "/index/CheckCompanyRule" });
     		},
     		getApartmentInfoImgList() {
      		 for (let i = 1; i < 28; i++) {
       		   this.tableData.push({
          		key: i,
          		recommendNum: "TJBH"+i,
         		customerName: "否",
         		phone: "固定金额",
          		state: "待审核",      		
          		type: "执行中",
          		companyName:"住宅、公寓",
          		planeTime:"人民币",
          		planeEndTime:"2017/01/08",
          		sureTime:"2017/01/08",
         		sureEndTime:"2017/01/08"   
             });
      	    }
             this.page();
            },
            page() {
              for (let i = 0;i < Math.ceil(this.tableData.length / this.pageSize); i++){
                 let arr = new Array();
       			 for (let j = 0; j < this.tableData.length; j++) {
         			if (j >= (i == 0 ? 0 : i * this.pageSize) &&j < (i + 1) * this.pageSize){
       			       arr.push(this.tableData[j]);
           			}
         		 }
        	   this.alltablesize.push(arr);
      	     }
       	     this.Data = this.alltablesize[0];
            },
           handleCurrentChange(val) {
              this.Data = this.alltablesize[val - 1];
           },
           check(){
      	     this.$router.push({ path:"/index/CommissioCheck"});
          },
          disableSelect(){
          	var sel=document.querySelector(".has-gutter tr td input");
          	console.log(sel);
          	//sel.disabled="true";
          },
          selsChange(sels){
          	if(sels){
          		this.sels=sels;
          	}
          },
          getProvinceList() {
                let token = sessionStorage.getItem("userinfo");
      			let url="../../static/mockdata/cities.json"
      			this.$http.get(url).then(res => {
       				localStorage.setItem("prov",JSON.stringify(res));
        			this.firoptions =res.data;
      			});
   		  },
    	// 读取市区列表
   		 provinceChange(value) {
    		this.formInline.city_name="";
       		this.formInline.district_name="";
        	this.thioptions=[];
        	this.secoptions=[];
    		for(let i=0;i<this.firoptions.length;i++){
    			if(this.firoptions[i].name==value){
    				this.secoptions = this.firoptions[i].city; 
    			}
    		}
       
    	},
    	// 读取区县列表
    	cityChange(value){
    			for(let i=0;i<this.secoptions.length;i++){
    				if(this.secoptions[i].name==value){
    					this.thioptions = this.secoptions[i].area; 
    				}
    			}
    		}
        },
        created(){
 			this.getApartmentInfoImgList();	
 			this.getProvinceList();
 		},
 		mounted(){
 			this.disableSelect();
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
	
</style>