<template>
  <div id="checkInfo">
    <el-row class="checkInfo-title" type="flex" justify="space-between">
      <el-col :span="5">
        <span class="check-basetitle"  >新增楼栋信息</span>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="add" size="small" >确定</el-button>
        <el-button  size="small" @click="back" >取消</el-button>
      </el-col>
    </el-row>
    <el-form :model="ruleFormcheck" :rules="rules" ref="form" label-width="100px" size="small" class="checkInfo-form">
      <el-row>
        <el-col :span="12">
          <el-form-item prop="build_name" label="名称:">
            <el-input v-model="ruleFormcheck.build_name">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="ys_build_id" label="绑定楼栋:">
         				<el-select ref="select" v-model="ruleFormcheck.ys_build_id">
         					 <el-option v-for="(item,idx) in YsBuild"  :key="idx"  :value="item.build_id" :label="item.build_name" ></el-option>
         				</el-select>  
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item  prop="sale_permit" label="预售许可证:">
            <el-input v-model="ruleFormcheck.sale_permit">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="permit_time" label="发证时间:">
            <div class="block">
              <el-date-picker v-model="ruleFormcheck.permit_time" type="date" placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="open_way" label="开盘方式:">
          		<el-select v-model="ruleFormcheck.open_way">
          			<el-option v-for="(item,idx) in open_ways" :key="idx" :label="item.param" :value="item.id" ></el-option>
          		</el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="open_time" label="开盘时间:">
            <div class="block">
              <el-date-picker v-model="ruleFormcheck.open_time" type="date" placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="handing_room_time" label="交房时间:">
            <div class="block">
              <el-date-picker v-model="ruleFormcheck.handing_room_time" type="date" placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="unit_num" label="单元数:">
            <el-input v-model.number="ruleFormcheck.unit_num">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="upper_floor_num" label="楼上层数:">
            <el-input  v-model.number="ruleFormcheck.upper_floor_num">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="down_floor_num" label="楼下层数:">
            <el-input v-model.number="ruleFormcheck.down_floor_num">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item   label="梯户比:">
          		<el-input  type="number" required class="floor"  v-model.number="floorId"></el-input>
            <font>梯</font>
            	<el-input class="floor" type="number" required  v-model.number="houseId"></el-input>
            <font>户</font>
           </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="total_house_num" label="总户数:">
            <el-input v-model.number="ruleFormcheck.total_house_num">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import {mapState,mapActions,mapGetters} from 'vuex'
export default {
  name: "checkInfo",
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
  	};
    return {
       rules:{
      	unit_num:[
      		{validator:checkNum,trigger:'blur'}
      	],
      	down_floor_num:[
      		{validator:checkNum,trigger:'blur'}
      	],
      	upper_floor_num:[
      		{validator:checkNum,trigger:'blur'}
      	],
      	total_house_num:[
      		{validator:checkNum,trigger:'blur'}
      	],
      	floorId:[
      		{validator:checkNum,trigger:'blur'}
      	],
      	houseId:[
      		{validator:checkNum,trigger:'blur'}
      	],
      	handing_room_time:[
      			{required:true,message:'时间错误',trigger:'change'}
      	],
      	sale_permit:[
      		{required:true,message:'预收许可证不能为空',trigger:'change'},
      		{min:1,max:50,message:'长度不对',trigger:'blur'}
      	],
      	permit_time:[
      		{required:true,message:'时间错误',trigger:'change'}
      	],
      	open_time:[
      		{required:true,message:'时间错误',trigger:'change'}
      	],
      	open_way:[
      		{required:true,message:'开盘方式错误',trigger:'blur'}
      	],
      	build_name:[
      		{required:true,message:"名称不能为空",trigger:'blur'},
      		{min:1,max:10,message:'超出10个字',trigger:"change"}
      	],
      	ys_build_id:[
      		{required:true,message:"不能为空",trigger:'change'}
      	]
      },
      floorId:'',
      houseID:''
    }
  },
  created(){
 			this.getBuild();
 			this.getYsBuild();
 			this.config();
 			this.floorId=this.floor;
 			this.houseId=this.house;
  },
  computed:{
 			...mapState({
 			project_id:state=>state.checkInfo.sels,
 			builds:state=>state.checkInfo.builds,
 			totalData:state=>state.checkInfo.totalData,
 			ruleFormcheck:state=>state.checkInfo.sels,
 			YsBuild:state=>state.generalLayout.YsBuild,
 			open_ways:state=>state.AddInfo.open_ways,
 			formData:state=>state.checkInfo.formData
 		}),
 		...mapGetters({
 				floor:'getfloorId',
 				house:'gethouseId'
 		})
  },
  methods:{
  	 back(){
  	 		this.$router.push({path:'/index/generalLayout'});
  	 },
  	 ...mapActions([
  	 	 'getBuild','getYsBuild','config','UpdateBuildDetail'
  	 ]),
  	 add(){
 		 		this.$refs.form.validate((valid) => {
 		 			if(valid){
 		 				this.ruleFormcheck.ys_build_id=this.$refs.select.value;
 		 				this.ruleFormcheck.ladder_ratio=`${this.floorId},${this.houseId}`;
 		 			  this.UpdateBuildDetail(this.ruleFormcheck);
 		 				if(this.formData==200){
 		 						this.$refs.form.resetFields();
 		 				}
 		 			}	
 		 		})
 		 
 		 }
  	
  },
  mounted(){
  	
  }
}
</script>
<style scoped lang="scss">
#checkInfo .el-date-picker ,.el-select{
  width: 275px !important;
  text-align: center;
}
#checkInfo {.el-option{
	 text-align: center!important;
}
.checkInfo-form {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 150px auto;
  width: 750px;
  padding: 0px 35px 10px 35px;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 100% !important;
}
.checkInfo-title {
  height: 40px;
  line-height: 40px;

  background-color: #545c64;
}
.check-basetitle {
  display: block;
  margin-left: 20px;
  color: #fff;
}
.floor{
	width: 115px !important;
}}
</style>


