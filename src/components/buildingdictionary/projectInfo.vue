<template>
  <div id="projectInfo">
    <el-row class="buildbaseinfo" type="flex" justify="space-between">
      <el-col :span="5">
        <span class="pro-basetitle">项目基础信息</span>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" size="small"  @click="submit()">保存</el-button>
      </el-col>
    </el-row>
    <el-col class="buildinfo">
      <span class="pro-title">项目信息</span>
    </el-col>
    <el-form :model="ruleForminfo" ref="form" label-width="100px" size="small" class="projectInfo-form">
      <el-col :span="12">
        <el-form-item label="项目名称:">
          <span>{{projectInfo.project_name}}</span>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="开发商:">
          <span>{{projectInfo.developer_name}}</span>
        </el-form-item>
      </el-col>
      <el-row>
        <el-col :span="12">
          <el-form-item label="项目地址:">
            <el-col :span="8">
              <el-select v-model="ruleForminfo.province_name" placeholder="请选择" @change="provinceChange($event)">
                <el-option v-for="(item,idx) in firoptions" :key="idx" :label="item.name"  :value="item.name">  
                </el-option>
              </el-select>
            </el-col>
            <el-col  :span="8">
              <el-select ref="cityName" v-model="ruleForminfo.city_name" placeholder="请选择" @change="cityChange($event)">
                <el-option  v-for="(item,id) in secoptions" :key="id" :label="item.name"  :value="item.name" >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-select v-model="ruleForminfo.district_name" placeholder="请选择"  >
                <el-option v-for="(item,idy) in thioptions" :key="idy" :label="item"  :value="item">      
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目状态:">
            <el-select v-model="ruleForminfo.statevalue" placeholder="请选择">
              <el-option v-for="item in staoptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item>
				 <!-- <el-input v-model="projectInfo.absolute_address"></el-input> -->
            <el-input v-model="ruleForminfo.add"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1">
        	<i style="height:32px;line-height:32px;width:32px;text-align: center;" class="el-icon-location" @click="localBtn"  ></i>
        </el-col>
        <el-col :span="12">
          <el-form-item label="云算地址:">
            <el-input v-model="projectInfo.href" @blur="testUrl" placeholder="输入运算IP地址如：'120.20.212.11'" ></el-input>  
          </el-form-item>
        </el-col>
      </el-row>
 <el-row>   
 	  <el-col :span="12">
      <el-form-item label="项目主图">
        <el-upload
  				class="upload-demo"
  				:action="uploadurl"
  				:on-preview="handlePictureCardPreview"
  				:on-remove="handleRemove"
  				:file-list="fileList2"
  				list-type="picture">
  				<el-button size="small" type="primary">点击上传</el-button>
  				<div slot="tip" class="el-upload__tip">只能上传jpg，且不超过2m</div>
				</el-upload>
      </el-form-item>  	
 	  </el-col>  
 	  <el-col :span="12">
 	  	 <el-form-item v-if="project_select" label="编辑的项目">
    		<el-select v-model="project_id" style="width: 100%;" placeholder="请选择想要编辑的项目">
              <el-option v-for="(item,idx) in  projects" :key="idx" :label="item.XMMC" :value="item.XMID"></el-option>
           </el-select>
    	 </el-form-item>
 	  </el-col>
 </el-row>       
    </el-form>
    <el-col class="buildinfo">
      <span class="pro-title">楼盘信息</span>
    </el-col>
    <el-form ref="form" :model="ruleFormbuild" label-width="100px" size="small" class="projectInfo-form">
      <el-form-item label="物业类型:">
        <el-checkbox-group v-model="ruleFormbuild.procheckList">
          <el-checkbox v-for="(item,idx) in realState"  :label="item.id"  :key="idx"  >{{item.param}}</el-checkbox>    
        </el-checkbox-group>
      </el-form-item>
      <el-col :span="12">
        <el-form-item label="售楼处地址:">
          <el-input v-model="ruleFormbuild.sale_address"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="设计公司:">
          <el-input v-model="ruleFormbuild.decoration_company"></el-input>
        </el-form-item>
      </el-col>
      <el-form-item label="项目标签:">
       <el-col :span="22">
          <el-tag   
          	v-for="(tag,idx) in projectTagss" 
          	:key="tag.id"  
          	closable  
          	@close="handleClose(tag)"  >
          	{{tag.param}}
          </el-tag>
          <el-input
  					class="input-new-tag"
  					v-if="inputVisible"
 		 				v-model="inputValue"
  					ref="saveTagInput"
  					size="small"
  					@keyup.enter.native="handleInputConfirm"
  					@blur="handleInputConfirm"
					>
					</el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">添加项目标签</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="建筑类型:">
        <el-checkbox-group v-model="ruleFormbuild.buicheckList">
            <el-checkbox v-for="(it,idx) in buildType" :label="it.id" :key="idx">{{it.param}}</el-checkbox>  
        </el-checkbox-group>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="均价:">
            <el-input v-model="ruleFormbuild.average_price">
              <template slot="append">元/m
                <sup>2</sup>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="价格区间(万):">
            <el-col :span="11">
              <el-input v-model="ruleFormbuild.min_price"></el-input>
            </el-col>
            <el-col :span="2">
              &nbsp;&nbsp;
              <i class="el-icon-minus"></i>
            </el-col>
            <el-col :span="11">
              <el-input v-model="ruleFormbuild.max_price"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="建筑面积:">
            <el-input v-model="ruleFormbuild.floor_space">
              <template slot="append">m
                <sup>2</sup>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="占地面积:">
            <el-input v-model="ruleFormbuild.covered_area">
              <template slot="append">m
                <sup>2</sup>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="容积率:">
            <el-input v-model="ruleFormbuild.plot_retio">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="规划户数:">
            <el-input v-model="ruleFormbuild.households_num">
              <template slot="append">户</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="绿化率:">
            <el-input v-model="ruleFormbuild.greening_rate">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="规划车位:">
            <el-input v-model="ruleFormbuild.parking_num">
              <template slot="append">个</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="装修标准:">
            <el-input v-model="ruleFormbuild.decoration_standard"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-col class="buildinfo">
      <span class="pro-title">物业信息</span>
    </el-col>
    <el-form ref="form" :model="ruleFormpro" label-width="100px" size="small" class="projectInfo-form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="物业公司:">
            <el-input v-model="ruleFormpro.property_company_name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="物业费:">
            <el-input v-model="ruleFormpro.property_cost"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="供暖方式:">
            <el-input v-model="ruleFormpro.heat_supply"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="供电类型:">
            <el-input v-model="ruleFormpro.power_supply"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="供水类型:">
            <el-input v-model="ruleFormpro.water_supply"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
  name: "projectInfo",
  data() {
    return {
    	fileList2:[{name:'项目主图',url:'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
    	imgul:this.Rooturl,
    	uploadurl:this.Rooturl+"project/file/upload",
    	testData:{},
    	project_select:false,
    	projectTagss:[],
      ruleForminfo: {
        add: "",
        province: "",
        cityvalue: "",
        disvalue: "",
        statevalue: "",
        district_name:'',
        city_name:'',
        province_name:'',
        sale_state:''
      },
      ruleFormbuild: {
        procheckList: [],
        buicheckList: [],
        sale_address: "",
        decoration_company: "",
        average_price: "",
        min_price: "",
        max_price: "",
        floor_space: "",
        covered_area: "",
        plot_retio: "",
        households_num: "",
        greening_rate: "",
        parking_num: "",
        decoration_standard: ""
      },
      ruleFormpro: {
        property_company_name: "",
        property_cost: "",
        heat_supply: "",
        power_supply: "",
        water_supply: ""
      },
      dialogVisible: false,
      firoptions: [],
      secoptions: [],
      thioptions: [],
      staoptions: [
        { value: 1, label: "待售" },
        { value: 2, label: "在售" },
        { value: 3, label: "售罄" }
      ],
      projectTags: [
      	
      ] ,
      inputVisible: false,
      inputValue: "",
      projectInfo: {
      	project_tags:''
      },
      proVisible: false,
      proImageUrl: "",
      realState:[],
      buildType:[],
      project_id:'',
      projects:'',
      temparr:[],
      projectTagsConfig:[]
    }
  },
  created() {
  	this.getProjectInfo();
  	 	
    this.getProvinceList();
   	  	
  },
  methods: {
  	handleClose(tag){
        this.projectTagss.splice(this.projectTags.indexOf(tag), 1);
    },
    showInput(){
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
    },
    handleInputConfirm(){
    		let inputValue={
    			param:'',
    			id:''
    		}
        inputValue.param = this.inputValue;
        inputValue.id = this.inputValue;
        if (!inputValue.param=="") {
          this.projectTagss.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
    },
    handleRemove(file, fileList){
    	
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //查询项目信息
    getProjectInfo() {
    	let url=this.Rooturl+"project/project/getProjectInfo";
      this.$http.get(url).then(res => {
      	this.testData=res.data.data;
      	console.log(res.data);
        this.projectInfo = res.data.data;
        this.ruleForminfo.provalue = this.projectInfo.province;
        this.provinceChange(this.ruleForminfo.provalue);
        this.ruleForminfo.cityvalue = this.projectInfo.city;
        //this.cityChange(this.ruleForminfo.cityvalue);
        this.ruleForminfo.disvalue = this.projectInfo.district;
        this.proImageUrl = this.projectInfo.img_url;
        
        this.ruleForminfo.city_name = this.projectInfo.city_name;
        this.ruleForminfo.district_name = this.projectInfo.district_name;
        this.ruleForminfo.province_name = this.projectInfo.province_name;
        
        this.ruleForminfo.statevalue = this.projectInfo.sale_state;
        this.ruleFormbuild.average_price = this.projectInfo.average_price;
        this.ruleForminfo.add = this.projectInfo.absolute_address;
        this.ruleFormbuild.sale_address = this.projectInfo.sale_address;
        this.ruleFormbuild.min_price = this.projectInfo.min_price;
        this.ruleFormbuild.max_price = this.projectInfo.max_price;
        this.ruleFormbuild.households_num = this.projectInfo.households_num;
        this.ruleFormbuild.parking_num = this.projectInfo.parking_num;
        this.ruleFormbuild.greening_rate = this.projectInfo.greening_rate;
        this.ruleFormbuild.covered_area = this.projectInfo.covered_area;
        this.ruleFormbuild.decoration_standard = this.projectInfo.decoration_standard;
        this.ruleFormpro.power_supply = this.projectInfo.power_supply;
        this.ruleFormbuild.decoration_company = this.projectInfo.decoration_company;
        this.ruleFormbuild.floor_space = this.projectInfo.floor_space;
        this.ruleFormbuild.plot_retio = this.projectInfo.plot_retio;
        this.ruleFormpro.heat_supply = this.projectInfo.heat_supply;
        this.ruleFormpro.property_company_name = this.projectInfo.property_company_name;
        this.ruleFormpro.property_cost = this.projectInfo.property_cost;
        this.ruleFormpro.water_supply = this.projectInfo.water_supply;
        this.ruleFormbuild.buicheckList = [this.projectInfo.build_type];
        for (let i = 0; i < this.projectInfo.property_type.length; i++) {
         this.ruleFormbuild.procheckList.push(
           this.projectInfo.property_type[i].property_tag_id
          );
        }
        this.projectTags = this.projectInfo.project_tags.split(","); 
        this.fileList2.url=this.Lanurl+"upload/agent/headimg/1523850012_10.jpg";
      });
     
    },
    // 读取省列表
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
    		this.ruleForminfo.city_name="";
        this.ruleForminfo.district_name="";
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
    		this.ruleForminfo.district_name="";
    		this.thioptions=[];
    		for(let i=0;i<this.secoptions.length;i++){
    			if(this.secoptions[i].name==value){
    				this.thioptions = this.secoptions[i].area; 
    			}
    		}
	
    },
    districtChang(value){
    	
    },
    // 修改项目信息
    submit() {
      var qs = require("qs");
      console.log(this.ruleFormbuild.procheckList)
      const data = {
        project_name: this.projectInfo.project_name,
        province: this.ruleForminfo.provalue,
        city: this.ruleForminfo.cityvalue,
        district: this.ruleForminfo.disvalue,
        absolute_address:this.ruleForminfo.add,
        property_type:JSON.stringify(this.ruleFormbuild.procheckList).substr(
          1,
          JSON.stringify(this.ruleFormbuild.procheckList).length - 2
        ),
        project_tags:JSON.stringify(this.projectTags).substr(
          1,
          JSON.stringify(this.projectTags).length - 2
        ),
        build_type: JSON.stringify(this.ruleFormbuild.buicheckList).substr(
          1,
          JSON.stringify(this.ruleFormbuild.buicheckList).length - 2
        ),
        sale_address: this.ruleFormbuild.sale_address,
        decoration_company: this.ruleFormbuild.decoration_company,
        average_price: this.ruleFormbuild.average_price,
        min_price: this.ruleFormbuild.min_price,
        max_price: this.ruleFormbuild.max_price,
        covered_area: this.ruleFormbuild.covered_area,
        floor_space: this.ruleFormbuild.floor_space,
        plot_retio: this.ruleFormbuild.plot_retio,
        greening_rate: this.ruleFormbuild.greening_rate,
        households_num: this.ruleFormbuild.households_num,
        parking_num: this.ruleFormbuild.parking_num,
        decoration_standard: this.ruleFormbuild.decoration_standard,
        property_company_name: this.ruleFormpro.property_company_name,
        property_cost: this.ruleFormpro.property_cost,
        heat_supply: this.ruleFormpro.heat_supply,
        power_supply: this.ruleFormpro.power_supply,
        water_supply: this.ruleFormpro.water_supply,
        yunsuan_url:this.projectInfo.href,
        yunsuan_id:this.project_id,
        total_float_url:"upload/project/img/1524463483_23.png",
				total_float_url_phone:"upload/agent/headimg/1526565231_31.jpg"
      }; 
      let url =this.Rooturl+"project/update";
      console.log(data);
      this.$http.post(url,qs.stringify({...data})).then(res => {
      		console.log(res.data);
      		if(res.data.code==200){
      			  this.$message.success(res.data.msg);
      		}else{
      			this.$message.error(res.data.msg);
      		}
      });
    },
    testUrl(){
    //	var reg=/^((25[0-5]|2[0-4]\\d|[1]{1}\\d{1}\\d{1}|[1-9]{1}\\d{1}|\\d{1})[:?]($|(?!\\.$)\\.)){4}/;
    	//if(reg.test(this.projectInfo.href)){
    		if(1){
    			let url=this.Rooturl+"project/build/getYsBuild";
    		  this.$http.get(url,{
    		  	params:{
    		  		url:this.projectInfo.href
    		  	}
    		  }).then(res => {
    		  	console.log(res.data.data[0].content[0].rows);
    		  	this.project_select=true;
    		  	this.projects=res.data.data[0].content[0].rows;
    			});
    	}else{
    		this.$message.error("云算地址输入不正确")
    	}
    },
    beforeImgUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2 = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2) {
          this.$message.error('上传头像图片大小不能超过 200kb!');
        }
        return isJPG && isLt2M;
    },
    localBtn(){
    	if(this.ruleForminfo.cityvalue){
    		this.sencityName(this.ruleForminfo.city_name);
  			this.$router.push({path:'/index/autoLoaction'})
    	}else{
    		this.$message.error("请先选择您所在城市")
    	}
 	  },
 	  ...mapMutations([
 	  		'sencityName'
 	  ]),
 	  getconfig(){
  		let url=this.Rooturl+"config";
    	this.$http.get(url,{
    	}).then(res=>{
    		 let arr=[];
    		 this.realState=res.data.data[16].param;
    		 this.buildType=res.data.data[17].param;
    		 let projectTagsConfig=res.data.data[15].param;
    		 for(let i=0;i<this.projectTags.length;i++){
        	for(let y=0;y<projectTagsConfig.length;y++){
        		if(this.projectTags[i]==projectTagsConfig[y].id){	
        			arr.push(projectTagsConfig[y]);
        		}
        	}
       }
    	
    		this.projectTagss=arr;
    		console.log(arr);
    			
    	})
  	}
  },
  computed:{
  	...mapState({
  		 areaAdrss:state=>state.autoLoaction.street,
  		 address:state=>state.autoLoaction.address,
  		 province:state=>state.autoLoaction.province,
  		 city:state=>state.autoLoaction.city,
  		 district:state=>state.autoLoaction.district,
  		 street:state=>state.autoLoaction.street
  	})
  	
  },
  mounted(){
  	setTimeout(()=>{
  		if(this.address==""){
  			this.ruleForminfo.add=this.ruleForminfo.add;
  		}else{
  			this.ruleForminfo.add=this.address;
  			this.ruleForminfo.province_name=this.province;
  			this.ruleForminfo.city_name=this.city;
  			this.ruleForminfo.district_name=this.district;
  	  }
  		 this.getconfig();
  	},600)
  }
}
//省市区  目前固定在四川没改变
</script>
<style scoped>
.projectInfo-form {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 20px auto;
  width: 1000px;
  padding: 0px 35px 10px 35px;
}
.buildbaseinfo {
  height: 40px;
  line-height: 40px;

  background-color: #545c64;
}
.buildinfo {
  height: 40px;
  line-height: 40px;
  margin-bottom: 20px;
  background-color: #dcdfe6;
}
.pro-basetitle {
  display: block;
  margin-left: 20px;
  color: #fff;
}
.pro-title {
  display: block;
  margin-left: 20px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
#projectInfo .el-icon-location:before{
	width:24px!important;
	height:24px!important;
}
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
 

