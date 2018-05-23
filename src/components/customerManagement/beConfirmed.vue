<template>
    <div id="beConfirmed">
        <el-row type="flex" justify="space-between" class="beConfirmeed-title">
            <el-col :span="18">
                <breadcrumb :breadcrumbName="breadcrumbName"></breadcrumb>
            </el-col>
            <el-col :span="6">
                <el-button-group>
                    <el-button type="primary" size="small">高级搜索</el-button>
                    <el-button type="primary" size="small" @click="check()">查看</el-button>
                    <el-button type="primary" size="small">确认</el-button>
                    <el-button type="primary" size="small" :disabled="true">成交</el-button>
                </el-button-group>
            </el-col>
        </el-row>
        <el-table :data="Data" @selection-change="selsChange" border ref="multipleTable" tooltip-effect="dark" class="apart-table">
            <el-table-column type="selection" reserve-selection="" label="ALL" width="50">
            </el-table-column>
            <el-table-column prop="key" label="序号" width="50">
            </el-table-column>
            <el-table-column prop="recommendNum" label="推荐编号">
            </el-table-column>
            <el-table-column prop="customerName" label="客户名称">
            </el-table-column>
            <el-table-column prop="phone" label="联系电话" width="100">
            </el-table-column>
            <el-table-column prop="recommendPeople" label="推荐人">
            </el-table-column>
            <el-table-column prop="type" label="类型">
            </el-table-column>
             <el-table-column prop="companyName" label="公司名称">
            </el-table-column>
            <el-table-column prop="recommendTime" label="推荐时间" width="100">
            </el-table-column>
             <el-table-column prop="chargePeople" label="对接人">
            </el-table-column>
             <el-table-column prop="sureTime" label="发起确认时间" width="100">
            </el-table-column>
             <el-table-column prop="failCountdown" label="失效倒计时">
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="tableData.length" :pageSize="pageSize" @current-change="handleCurrentChange" class="Img-page">
        </el-pagination>
    </div>
</template>
<script>
import breadcrumb from "@/components/shared/breadcrumb";
import {mapMutations} from 'vuex'
export default {
  name: "beConfirmed",
  components: { breadcrumb },
  data() {
    return {
      breadcrumbName: [
        { breadcrumbname: "全部", router: "/index/allCustomer" },
        { breadcrumbname: "待确认客户", router: "" },
        { breadcrumbname: "有效客户", router: "/index/effective" },
        { breadcrumbname: "无效客户", router: "/index/invalid" },
        { breadcrumbname: "已成交客户", router: "/index/dealed" }
      ],
      Data: [],
      tableData: [],
      pageSize: 6,
      alltablesize: [],
      sels:[],
      rules: {
         name: [
             { required: true, message: '请输入活动名称', trigger: 'blur' },
             { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
         ],
         region: [
             { required: true, message: '请选择活动区域', trigger: 'change' }
         ]
       }
     }
  },
  created() {
    this.getApartmentInfoImgList();
    this.getData();
  },
  methods: {
    getApartmentInfoImgList() {
      for (let i = 1; i < 101; i++) {
        this.tableData.push({
          key: i,
          recommendNum: "TJBH"+i,
          customerName: "张三",
          phone: "156****8060",
          recommendPeople:"李四",
          type: "渠道",
          companyName:"云算平台",
          recommendTime:"2017/01/08  12:09:09",
          chargePeople:"王五",
          sureTime:"2017/01/08  12:09:09",
          failCountdown:"00:59:59",
        });
      }
      this.page();
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
    check(){
      let sels=this.sels;
      if(sels.length>1){
      	this.$message.error("查看只能单选")
      }else if(sels.length==1){
      	this.addsels(sels[0].key);
      	this.$router.push({path: '/index/ckBeConfirmed'})
      }else{
      	this.$message.error("请选择查看内容")
      }
    },
    selsChange(sels) {  
    	if(sels){
    		   this.sels=sels; 
    	}   
    },
    ...mapMutations([
    	'addsels'
    ]),
    getData(){
    	let url=this.Rooturl+"project/client/waitConfirmedDetail";
    	console.log(url);
    	this.$http.get(url,{params:{client_id:1}})
    	 .then(res=>{console.log(res)});
    }
  }
};
</script>
<style scoped lang="scss">
#beConfirmed{
.el-breadcrumb__inner {
  font-size: 18px !important;
}
.beConfirmeed-title{
  border-bottom: dashed 1px #b3c0d1;
  margin-bottom: 10px;
  padding-bottom: 10px;
}
.el-table {
  width: 100%;
  margin-top: 30px;
}
padding-top:10px!important;
margin-top:10px!important;
padding-bottom:10px!important;
}
</style>
