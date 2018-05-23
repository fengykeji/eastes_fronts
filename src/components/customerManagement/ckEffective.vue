<template>
    <div id="ckBeConfirmed">
        <el-row class="Checkinfo" type="flex" justify="space-between">
            <el-col :span="5">
                <span class="ckBeConfirmed-title">查看</span>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" size="small" @click="back()">关闭</el-button>
            </el-col>
        </el-row>
        <el-row class="ck-state">
            <el-col :span="5">
                <span class="ckBeConfirmed-title">推荐编号：TJBHNO1</span>
            </el-col>
            <el-col :span="4" :offset="9">
                目前状态：
                <span class="state">已到访</span>
            </el-col>
            <el-col :span="5" class="count">
                失效倒计时：
                <span>6天</span>
            </el-col>
        </el-row>
        <el-form :model="disRuleForminfo" ref="form" label-width="120px" size="small" class="cktInfo-form">
            <el-row class="ck-state">
                <el-col>
                    <span class="ckBeConfirmed-title-info">客户信息</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="客户名称:">
                        <el-input v-model="disRuleForminfo.customer1"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系电话1:">
                        <el-input v-model="disRuleForminfo.conPhone1"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12" :offset="12">
                    <el-form-item label="联系电话2:">
                        <el-input v-model="disRuleForminfo.conPhone2"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="证件类型:">
                        <el-input v-model="disRuleForminfo.documentType"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="证件号码:">
                        <el-input v-model="disRuleForminfo.typenum"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="通讯住址:">
                        <el-input v-model="disRuleForminfo.address"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="到访时间:">
                        <el-input v-model="disRuleForminfo.sureTime"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="ck-state">
                <el-col>
                    <span class="ckBeConfirmed-title-info">客户需求信息</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="需求物业:">
                        <el-tag>住宅</el-tag>
                        <el-tag>别墅一</el-tag>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="需求标签:">
                        <el-tag>学区房</el-tag>
                        <el-tag>满五年</el-tag>
                        <el-tag>地铁房</el-tag>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="总价:">
                        <el-input v-model="disRuleForminfo.allMoney"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="付款方式:">
                        <el-input v-model="disRuleForminfo.payWay"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="房型:">
                        <el-input v-model="disRuleForminfo.house"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="面积:">
                        <el-input v-model="disRuleForminfo.area"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
             <el-row>
                <el-col :span="12">
                    <el-form-item label="朝向:">
                        <el-input v-model="disRuleForminfo.orientation"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="装修状况:">
                        <el-input v-model="disRuleForminfo.renovation"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
             <el-row>
                <el-col :span="12">
                    <el-form-item label="置业目的:">
                        <el-input v-model="disRuleForminfo.objective"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="房龄要求:">
                        <el-input v-model="disRuleForminfo.houseAge"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="楼层:">
                        <el-input v-model="disRuleForminfo.floor"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="楼层户数:">
                        <el-input v-model="disRuleForminfo.floorNum"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
             <el-row>
                <el-col :span="12">
                    <el-form-item label="意向区域:">
                        <el-input v-model="disRuleForminfo.likeArea"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="ck-state">
                <el-col>
                    <span class="ckBeConfirmed-title-info">置业顾问信息</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="置业顾问:">
                        <el-input v-model="disRuleForminfo.consultant"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系电话1:">
                        <el-input v-model="disRuleForminfo.con1Phone1"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系电话2:">
                        <el-input v-model="disRuleForminfo.con2Phone2"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <!-- 选择置业顾问弹窗 -->
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: "ckBeConfirmed",
  data() {
    return {
      disRuleForminfo: {
        customer1: "张三",
        conPhone1: "13110030000",
        conPhone2: "13110030000",
        conPhone3: "13110030000",
        documentType: "身份证",
        typenum: "510105000100023771",
        address: "成都 - 郫都区 - 大禹东路45号",
        sureTime: "2017/12/12  12:00:00",
        allMoney: "90万 -- 100万",
        house: "3室2厅2卫",
        payWay: "全款",
        area:"90平米 -- 100平米",
        orientation:"西南、东南",
        renovation:"精装",
        objective:"自住",
        houseAge:"10年之内",
        floor:"5层 - 10层",
        floorNum:"2 - 4 户",
        likeArea:"成都 - 高新区、郫都区。绵阳 - 涪城区",
        consultant:"张三",
        con1Phone1: "13110030000",
        con2Phone2: "13110030000",
      }
    };
  },
  computed:{
  	...mapState({
  		project_id:state=>state.effective.project_id
  	})
  },
  methods: {
    back() {
      this.$router.push({ path: "/index/effective" });
    }
  },
  mounted(){
  	console.log(this.project_id);
  }
};
</script>
<style scoped>
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
  height: 40px;
  line-height: 40px;
  margin-bottom: 10px;
  border: 1px solid #b3c0d1;
}
.ckBeConfirmed-title-info {
  display: block;
  margin-left: 20px;
}
.state {
  color: #289428;
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
  height: 30px;
  line-height: 50px;
  border: 1px solid #b3c0d1;
}
.makeSureinfo {
  border-right: 1px solid #b3c0d1;
}
</style>

