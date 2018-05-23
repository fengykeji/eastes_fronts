<template>
  <div id="ckDeal">
    <el-row class="Checkinfo" type="flex" justify="space-between">
      <el-col :span="5">
        <span class="ckBeConfirmed-title">查看</span>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" size="small"  @click="back()">关闭</el-button>
      </el-col>
    </el-row>
    <el-form :model="disRuleForminfo" ref="form" label-width="140px" size="small" class="cktInfo-form">
      <el-row class="ck-state">
        <el-col>
          <span class="ckBeConfirmed-title-info">客户信息</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="客户名称:">
            <el-input v-model="disRuleForminfo.customer"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话1:">
            <el-input v-model="disRuleForminfo.conPhone1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话2:">
            <el-input v-model="disRuleForminfo.conPhone2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ck-state">
        <el-col>
          <span class="ckBeConfirmed-title-info">房源信息</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="项目名称:">
            <el-input v-model="disRuleForminfo.proName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="物业类型">
            <el-select v-model="disRuleForminfo.type">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="建筑面积(㎡):">
            <el-input v-model="disRuleForminfo.builtArea"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="套内面积(㎡):">
            <el-input v-model="disRuleForminfo.houseArea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="总价(￥):">
            <el-input v-model="disRuleForminfo.allMoney"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单价 (元/㎡):">
            <el-input v-model="disRuleForminfo.unitPrice"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="房号:">
            <el-input v-model="disRuleForminfo.houseNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="置业顾问">
            <el-input v-model="disRuleForminfo.propertyConsultant"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ck-state">
        <el-col>
          <span class="ckBeConfirmed-title-info">合同信息</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="合同编号:">
            <el-input v-model="disRuleForminfo.contractNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="付款方式:">
            <el-select v-model="disRuleForminfo.payType">
              <el-option v-for="item in payOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="贷款金额(￥):">
            <el-input v-model="disRuleForminfo.payNum"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="建筑成交单价 (￥)">
            <el-input v-model="disRuleForminfo.buiUnitPrice"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="套内成交单价 (￥):">
            <el-input v-model="disRuleForminfo.houseUnitPrice"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="已付金额(￥):">
            <el-input v-model="disRuleForminfo.payed"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="未付金额(￥):">
            <el-input v-model="disRuleForminfo.Unpaid"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="登记人员:">
            <el-input v-model="disRuleForminfo.registerMan"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="登记日期:">
            <el-date-picker v-model="disRuleForminfo.date" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ck-state">
        <el-col>
          <span class="ckBeConfirmed-title-info">银行按揭</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="首付款(￥):">
            <el-input v-model="disRuleForminfo.payFirst"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="首付分期:">
            <el-input v-model="disRuleForminfo. credit"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="按揭银行:">
            <el-select v-model="disRuleForminfo.payBank">
              <el-option v-for="item in bankOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="贷款金额(￥):">
            <el-input v-model="disRuleForminfo.loanMoney"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="贷款年限):">
            <el-input v-model="disRuleForminfo.loanAge">
              <template slot="append">年</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ck-state">
        <el-col>
          <span class="ckBeConfirmed-title-info">公积金按揭</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="公积金首付款(￥):">
            <el-input v-model="disRuleForminfo.accPayFirst"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公积金首付分期:">
            <el-input v-model="disRuleForminfo.accCredit"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="公积金按揭银行:">
            <el-select v-model="disRuleForminfo.accPayBank">
              <el-option v-for="item in bankOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="公积金贷款金额(￥):">
            <el-input v-model="disRuleForminfo.accLoanMoney"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="贷款年限):">
            <el-input v-model="disRuleForminfo.accLoanAge">
              <template slot="append">年</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ck-state">
        <el-col>
          <span class="ckBeConfirmed-title-info">组合贷款</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="首付款(￥):">
            <el-input v-model="disRuleForminfo.comPayFirst"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="首付分期:">
            <el-input v-model="disRuleForminfo.comCredit"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="按揭银行:">
            <el-select v-model="disRuleForminfo.comPayBank">
              <el-option v-for="item in bankOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="贷款金额(￥):">
            <el-input v-model="disRuleForminfo.comLoanMoney"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="贷款年限):">
            <el-input v-model="disRuleForminfo.comLoanAge">
              <template slot="append">年</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ck-state" type="flex" justify="space-between">
        <el-col :span="2">
          <span class="ckBeConfirmed-title-info">分期</span>
        </el-col>
        <el-col :span="4">
          <el-button-group>
            <el-button type="primary" size="mini" @click="creditVisible = true">添加</el-button>
            <el-button type="primary" size="mini">修改</el-button>
            <el-button type="primary" size="mini">删除</el-button>
          </el-button-group>
        </el-col>
      </el-row>
      <el-table :data="Data" border ref="multipleTable" tooltip-effect="dark" class="project-table">
        <el-table-column type="selection" width="50">
        </el-table-column>
        <el-table-column prop="key" label="序号">
        </el-table-column>
        <el-table-column prop="time" label="时间">
        </el-table-column>
        <el-table-column prop="money" label="金额">
        </el-table-column>
        <el-table-column prop="remindTime" label="提醒时间">
        </el-table-column>
        <el-table-column prop="remarks" label="备注">
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="tableData.length" :pageSize="pageSize" @current-change="handleCurrentChange" class="Img-page">
      </el-pagination>
    </el-form>
    <el-dialog title="新增:" :visible.sync="creditVisible">
      <el-row class="ck-state">
        <el-col>
          <span class="ckBeConfirmed-title-info">组合贷款</span>
        </el-col>
      </el-row>
      <el-form ref="form" :model="ruleFormCredit" label-width="100px" size="small">
          <el-row>
            <el-col :span="12">
              <el-form-item label="交款日期:">
               <el-date-picker v-model="ruleFormCredit.payDate" type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="提醒日期:">
                <el-date-picker v-model="ruleFormCredit.remindDate" type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="付款金额:">
               <el-input v-model="ruleFormCredit.payMoney"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="备注:">
               <el-input v-model="ruleFormCredit.remarks" type="textarea" autosize ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ruleFormCredit = false">取 消</el-button>
        <el-button type="primary" @click="ruleFormCredit = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {mapState} from 'vuex'

export default {
  name: "cKDeal",
  data() {
    return {
      disRuleForminfo: {
        customer: "自动生成",
        conPhone1: "自动生成",
        conPhone2: "自动生成",
        type: "住宅",
        proName: "云算公馆",
        builtArea: "100",
        houseArea: "100",
        allMoney: "1,000,000",
        unitPrice: "5654",
        houseNum: "1批次 - 1栋 - 1单元 - 102",
        propertyConsultant: "张三",
        contractNum: "HTBHNO1",
        payType: "一次性付款",
        payNum: "0",
        buiUnitPrice: "1,000,000",
        houseUnitPrice: "1,000,000",
        payed: "200",
        Unpaid: "200",
        registerMan: "张四",
        date: "2017/12/12",
        payFirst: "1,000,000",
        credit: "2000",
        payBank: "建设银行",
        loanMoney: "200",
        loanAge: "20",
        accPayFirst: "20000",
        accCredit: "2000",
        accPayBank: "建设银行",
        accLoanMoney: " 200",
        accLoanAge: "20",
        comPayFirst: "20000",
        comCredit: "120000",
        comLoanMoney: "20",
        comLoanAge: "20"
      },
      ruleFormCredit:{
        payDate:"",
        remindDate:"",
        payMoney:"",
        remarks:""
      },
      creditVisible:false,
      Data: [],
      tableData: [],
      pageSize: 5,
      alltablesize: [],
      options: [
        {
          value: "住宅",
          lable: "选项一"
        }
      ],
      payOptions: [
        {
          value: "请选择付款方式",
          lable: "选项一"
        },
        {
          value: "一次性付款",
          lable: "选项二"
        },
        {
          value: "银行按揭付款",
          lable: "选项三"
        },
        {
          value: "公积金贷款",
          lable: "选项四"
        },
        {
          value: "综合贷款",
          lable: "选项五"
        },
        {
          value: "分期付款",
          lable: "选项六"
        }
      ],
      bankOptions: [
        {
          value: "中国农业银行",
          lable: "1"
        },
        {
          value: "中国建设银行",
          lable: "2"
        },
        {
          value: "中国工商银行",
          lable: "3"
        },
        {
          value: "中国银行",
          lable: "4"
        },
        {
          value: "交通银行",
          lable: "5"
        },
        {
          value: "招商银行",
          lable: "6"
        }
      ]
    };
  },
  created() {
    this.getCkDealList();
  },
  computed:{
  	...mapState({
  		 project_id:state=>state.dealed.project_id
  	})
  },
  methods: {
    getCkDealList() {
      for (let i = 0; i < 100; i++) {
        this.tableData.push({
          key: i,
          time: "2017/12/12",
          money: "30000",
          remindTime: "2018/2/12",
          remarks: "备注"
        });
      }
      console.log(this.tableData);
    },
    page() {
      for (
        let i = 0;
        i < Math.ceil(this.tableData.length / this.pageSize);
        i++
      ) {
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
      this.Data = this.alltablesize[0];
    },
    handleCurrentChange(val) {
      this.Data = this.alltablesize[val - 1];
    },
    back(){
    	this.$router.push({ path: "/index/dealed" });
    }
  }
};
</script>

<style scoped lang="scss">
#ckDeal{
.Checkinfo {
  height: 40px;
  line-height: 40px;
  margin-bottom: 20px;

  background-color: #545c64;
  color:#fff;
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
  height: 30px;
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



