<template>
    <div id="allCustomer">
        <el-row type="flex" justify="space-between" class="examine-title">
            <el-col :span="18">
                <breadcrumb :breadcrumbName="breadcrumbName"></breadcrumb>
            </el-col>
            <el-col :span="6">
                <el-button-group>
                    <el-button type="primary" size="small">高级搜索</el-button>
                    <el-button type="primary" size="small">查看</el-button>
                    <el-button type="primary" size="small">确认</el-button>
                    <el-button type="primary" size="small">成交</el-button>
                </el-button-group>
            </el-col>
        </el-row>
    <el-row class="table_row">
        <el-table :data="Data"  style="width: 100%"  border ref="multipleTable" tooltip-effect="dark" class="apart-table">
            <el-table-column fixed type="selection" label="ALL" width="50">
            </el-table-column>
            <el-table-column fiexd  prop="key" label="序号">
            </el-table-column>
            <el-table-column  prop="recommendNum" label="推荐编号">
            </el-table-column>
            <el-table-column  prop="customerName" label="客户名称">
            </el-table-column>
            <el-table-column prop="phone" label="联系电话" width="100">
            </el-table-column>
            <el-table-column   prop="state" label="状态">
            </el-table-column>
            <el-table-column   prop="recommendPeople" label="推荐人">
            </el-table-column>
            <el-table-column  prop="type" label="类型">
            </el-table-column>
             <el-table-column   prop="companyName" label="公司名称">
            </el-table-column>
            <el-table-column   prop="recommendTime" label="推荐时间" width="100">
            </el-table-column>
             <el-table-column   prop="chargePeople" label="对接人">
            </el-table-column>
             <el-table-column  prop="sureTime" label="发起确认时间" width="100">
            </el-table-column>
             <el-table-column   prop="changeStateTime" label="状态改变时间" width="100">
            </el-table-column>
             <el-table-column   prop="failCountdown" label="失效倒计时">
            </el-table-column>
             <el-table-column   prop="confirmed" label="是否确认">
            </el-table-column>
             <el-table-column   prop="surePeople" label="到访确认人">
            </el-table-column>
             <el-table-column  prop="allotTime" label="分配时间" width="100">
            </el-table-column>
             <el-table-column   prop="propertyConsultant" label="置业顾问">
            </el-table-column>
        </el-table>
    </el-row>    
        <el-pagination background layout="prev, pager, next" :total="tableData.length" :pageSize="pageSize" @current-change="handleCurrentChange" class="Img-page">
        </el-pagination>
    </div>
</template>
<script>
import breadcrumb from "@/components/shared/breadcrumb";
export default {
  name: "allCustomer",
  components: { breadcrumb },
  data() {
    return {
      breadcrumbName: [
        { breadcrumbname: "全部", router: "" },
        { breadcrumbname: "待确认客户", router: "/index/beConfirmed" },
        { breadcrumbname: "有效客户", router: "/index/effective" },
        { breadcrumbname: "无效客户", router: "/index/invalid" },
        { breadcrumbname: "已成交客户", router: "/index/dealed" }
      ],
      Data: [],
      tableData: [],
      pageSize: 6,
      alltablesize: []
    };
  },
  created() {
    this.getApartmentInfoImgList();
  },
  methods: {
    getApartmentInfoImgList() {
      for (let i = 1; i < 101; i++) {
        this.tableData.push({
          key: i,
          recommendNum: "TJBH"+i,
          customerName: "张三",
          phone: "156****8060",
          state: "待确认",
          recommendPeople:"李四",
          type: "渠道",
          companyName:"云算平台",
          recommendTime:"2017/01/08  12:09:09",
          chargePeople:"王五",
          sureTime:"2017/01/08  12:09:09",
          changeStateTime:"2017/01/08  12:09:09",
          failCountdown:"00:59:59",
          confirmed:"未确认",
          surePeople:"赵六",
          allotTime:"2017/01/08  12:09:09",
          propertyConsultant:"王五"
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
    }
    
  }
};
</script>
<style scoped lang="scss">
#allCustomer{
.el-breadcrumb__inner {
  font-size: 16px !important;
}
.examine-title {
  border-bottom: dashed 1px #b3c0d1;
  margin-bottom: 10px;
  padding-bottom: 10px;
}
.el-table {
  width: 100%;
  margin-top: 30px;
  padding: 2px 0px !important;
}
::-webkit-scrollbar,::scrollbar{
	height:8px!important;	
}
::-webkit-scrollbar-thumb,::scrollbar-thumb{
	background:rgba(25,158,216,0.9)!important;
}
padding-top:10px!important;
margin-top:10px!important;
padding-bottom:10px!important;
}
</style>


