<template>
    <div id="ckBeConfirmed">
        <el-row class="Checkinfo" type="flex" justify="space-between">
            <el-col :span="5">
                <span class="ckBeConfirmed-title">查看待确认客户</span>
            </el-col>
            <el-col :span="4">
            	<el-button size="small" type="primary"  @click="onSubmit">确认</el-button>
                <el-button size="small"  @click="back()">关闭</el-button>
            </el-col>
        </el-row>
        <el-row class="ck-state">
            <el-col :span="5">
                <span class="ckBeConfirmed-title">推荐编号：TJBHNO1</span>
            </el-col>
            <el-col :span="4" :offset="9">
                目前状态：
                <span class="state">待确认</span>
            </el-col>
            <el-col :span="5" class="count">
                失效倒计时：
                <span>：59:00:21</span>
            </el-col>
        </el-row>
        <el-form :model="ckRuleForminfo" ref="form" label-width="120px" size="small" class="cktInfo-form">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="置业目的:">
                        <el-input v-model="ckRuleForminfo.objective"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="到访人数:">
                        <el-input v-model="ckRuleForminfo.visitors"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="到访时间:">
                        <el-input v-model="ckRuleForminfo.visitTime"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="身份证照片:">
                        <img src="/static/img/generalpic.jpg" alt="">
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="到访照片:">
                        <img src="/static/img/generalpic.jpg" alt="">
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="确认单图片:">
                        <img src="/static/img/generalpic.jpg" alt="">
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="签字人:">
                        <el-input v-model="ckRuleForminfo.signMan"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="签字人:">
                        <el-input v-model="ckRuleForminfo.signMan"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="到访确认:">
                        <el-checkbox-group v-model="ckRuleForminfo.sureVisit" :max="1">
                            <el-checkbox label="有效到访"></el-checkbox>
                            <el-checkbox label="无效到访"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="置业顾问:">
                        <el-input v-model="ckRuleForminfo.adviser"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="选择的置业顾问:">
                        <el-input v-model="ckRuleForminfo.choseAdviser">
                            <template slot="append">
                                <el-button @click="choseVisible=false">选择</el-button>
                            </template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-form-item label="备注:">
                        <el-input type="textarea" autosize placeholder="请输入内容" v-model="ckRuleForminfo.remarks"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-row class="infotitle">
            <el-col :span="11" :offset="1" class="makeSureinfo">确认信息</el-col>
            <el-col :span="11" :offset="1">推荐信息</el-col>
        </el-row>
        <el-form :model="disRuleForminfo" ref="form" label-width="120px" size="small" class="cktInfo-form">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="对接人:">
                        <el-input disabled="disabled" v-model="disRuleForminfo.pickUpMan"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="推荐人:">
                        <el-input disabled="disabled" v-model="disRuleForminfo.Referee"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="联系电话1:">
                        <el-input disabled="disabled" v-model="disRuleForminfo.phone1"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系电话1:">
                        <el-input disabled="disabled" v-model="disRuleForminfo.iphone1"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="联系电话2:">
                        <el-input disabled="disabled" v-model="disRuleForminfo.phone2"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系电话2:">
                        <el-input disabled="disabled" v-model="disRuleForminfo.iphone2"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12" :offset="12">
                    <el-form-item label="所属公司:">
                        <el-input disabled="disabled" v-model="disRuleForminfo.company"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="客户名称:">
                        <el-input disabled="disabled" v-model="disRuleForminfo.customer1"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="客户名称:">
                        <el-input disabled="disabled" v-model="disRuleForminfo.customer2"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="联系电话1:">
                        <el-input disabled="disabled" v-model="disRuleForminfo.conPhone1"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系电话1:">
                        <el-input disabled="disabled" v-model="disRuleForminfo.con1Phone1"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="联系电话2:">
                        <el-input disabled="disabled" v-model="disRuleForminfo.conPhone2"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系电话2:">
                        <el-input disabled="disabled" v-model="disRuleForminfo.con1Phone2"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="联系电话3:">
                        <el-input disabled="disabled" v-model="disRuleForminfo.con1Phone3"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系电话3:">
                        <el-input disabled="disabled" v-model="disRuleForminfo.con1Phone3"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="证件类型:">
                        <el-input disabled="disabled" v-model="disRuleForminfo.documentType"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="证件类型:">
                        <el-input disabled="disabled" v-model="disRuleForminfo.documentType1"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="证件号码:">
                        <el-input disabled="disabled" v-model="disRuleForminfo.typenum"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="证件号码:">
                        <el-input disabled="disabled" v-model="disRuleForminfo.typenum1"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="通讯住址:">
                        <el-input disabled="disabled" v-model="disRuleForminfo.address"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="通讯住址:">
                        <el-input disabled="disabled" v-model="disRuleForminfo.address1"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="发起确认时间:">
                        <el-input disabled="disabled" v-model="disRuleForminfo.sureTime"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="推荐时间:">
                        <el-input disabled="disabled" v-model="disRuleForminfo.recommendTime"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <!-- 选择置业顾问弹窗 -->
        <el-dialog title="提示" :visible.sync="choseVisible" width="50%">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="choseVisible = false">取 消</el-button>
                <el-button type="primary" @click="choseVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: "ckBeConfirmed",
  data() {
    return {
      choseVisible: false,
      ckRuleForminfo: {
        objective: "居住",
        visitors: "2",
        visitTime: "2017/12/12  12:00:00",
        signMan: "李四",
        sureVisit: [],
        adviser: "",
        choseAdviser: "",
        remarks: ""
      },
      disRuleForminfo: {
        pickUpMan: "李四",
        Referee: "李四",
        phone1: "13110030000",
        phone2: "131000000000",
        iphone1: "13100020000",
        iphone2: "131000000000",
        company: "云算科技",
        customer1: "张三",
        customer2: "张三",
        conPhone1: "13110030000",
        con1Phone1: "13110030000",
        conPhone2: "13110030000",
        con1Phone2: "13110030000",
        conPhone3: "13110030000",
        con1Phone3: "13110030000",
        documentType: "身份证",
        documentType1: "身份证",
        typenum: "510105000100023771",
        typenum1: "510105000100023771",
        address: "成都 - 郫都区 - 大禹东路45号",
        address1: "成都 - 郫都区 - 大禹东路45号",
        sureTime: "2017/12/12  12:00:00",
        recommendTime: "2017/12/12  12:00:00"
      },
      disabled: true
    };
  },
  computed:{
 	...mapState({
 		project_id:state=>state.beConfirmed.sels
 	})
  },
  methods: {
    back(){
      this.$router.push({ path: "/index/beConfirmed" });
    },
    onSubmit(){
    	let url=this.Rooturl+"'project/client/waitConfirmed";
    	this.$http.get(url,
    		this.ckRuleForminfo
    	).then(res=>{
    		if(res.code==200){
    			this.$message.success("提交");
    		}else{
    			this.$message.error("提交失败");
    		}
    	});
    	
    },
    getData(){
    	let url=this.Rooturl+"project/client/waitConfirmedDetail";
    	console.log(url);
  		this.$http.get(url,{client_id:this.project_id})
  	 	   .then(res=>{console.log(res)})
    }
  },
  mounted(){
  	console.log(this.project_id);
  },
  created(){
  	this.getData();
  }
 
};
</script>
<style scoped lang='scss'>
#ckBeConfirmed{
.Checkinfo {
  height: 40px;
  line-height: 40px;
  margin-bottom: 20px;
  color:#fff;
  background-color: #545c64;
}
.ckBeConfirmed-title {
  display: block;
  margin-left: 20px;
}
.ck-state {
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #b3c0d1;
}
.state {
  color: #ff3737;
}
.count {
  color: #289428;
}
.cktInfo-form {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 20px auto;
  width: 90%;
  padding: 0px 35px 10px 35px;
}
img {
  width: 200px;
}
.el-form-item__content {
  border-bottom: 1px solid #b3c0d1;
}
.el-input-group__append {
  cursor: pointer !important;
}
.infotitle {
  margin: 0 auto;
  width: 90%;
  height: 50px;
  line-height: 50px;
  border: 1px solid #b3c0d1;
}
.makeSureinfo {
  border-right: 1px solid #b3c0d1;
}
padding-top:10px!important;
margin-top:10px!important;
padding-bottom:10px!important;
}	
</style>

