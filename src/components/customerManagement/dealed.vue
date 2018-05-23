<template>
    <div id="dealed">
        <el-row type="flex" justify="space-between" class="beConfirmeed-title">
            <el-col :span="18" >
                <breadcrumb :breadcrumbName="breadcrumbName"></breadcrumb>
            </el-col>
            <el-col :span="6">
                <el-button-group>
                    <el-button type="primary" size="small">高级搜索</el-button>
                    <el-button type="primary" size="small" @click="check()">查看</el-button>
                    <el-button type="primary" size="small" :disabled="true">确认</el-button>
                    <el-button type="primary" size="small">成交</el-button>
                </el-button-group>
            </el-col>
        </el-row>
        <el-table :data="Data" border @selection-change="selsChange" ref="multipleTable" tooltip-effect="dark" class="apart-table">
            <el-table-column reserve-selection="" type="selection" label="ALL" width="50">
            </el-table-column>
            <el-table-column prop="key" label="序号" width="50">
            </el-table-column>
            <el-table-column prop="recommendNum" label="推荐编号">
            </el-table-column>
            <el-table-column prop="customerName" label="客户名称">
            </el-table-column>
            <el-table-column prop="phone" label="联系电话" width="100">
            </el-table-column>
            <el-table-column prop="dealBuild" label="成交房源楼栋">
            </el-table-column>
            <el-table-column prop="unit" label="单元">
            </el-table-column>
            <el-table-column prop="houseNum" label="房号">
            </el-table-column>
            <el-table-column prop="money" label="总价(¥)" width="100">
            </el-table-column>
            <el-table-column prop="unitPrice" label="单价 (元/㎡)">
            </el-table-column>
            <el-table-column prop="dealTime" label="成交时间" width="100">
            </el-table-column>
            <el-table-column prop="recommendPeople" label="推荐人">
            </el-table-column>
             <el-table-column prop="type" label="类型">
            </el-table-column>
             <el-table-column prop="companyName" label="公司名称">
            </el-table-column>
            <el-table-column prop="propertyConsultant" label="置业顾问">
            </el-table-column>
            <el-table-column prop="Commission" label="累计佣金(¥)">
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="tableData.length" :pageSize="pageSize" @current-change="handleCurrentChange" class="Img-page">
        </el-pagination>
    </div>
</template>
<script>
import breadcrumb from "@/components/shared/breadcrumb"
import {mapMutations} from 'vuex'

export default {
  name: "dealed",
  components: { breadcrumb },
  data() {
    return {
      breadcrumbName: [
        { breadcrumbname: "全部", router: "/index/allCustomer" },
        { breadcrumbname: "待确认客户", router: "/index/beConfirmed" },
        { breadcrumbname: "有效客户", router: "/index/effective" },
        { breadcrumbname: "无效客户", router: "/index/invalid" },
        { breadcrumbname: "已成交客户", router: "" }
      ],
      Data: [],
      tableData: [],
      pageSize: 6,
      alltablesize: [],
      sels:''
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
          recommendNum: "TJBH" + i,
          customerName: "张三",
          phone: "156****8060",
          dealBuild: "A栋",
          unit:"1单元",
          houseNum: "101",
          companyName: "云算平台",
          propertyConsultant: "王五",
          money: "1,000,000",
          unitPrice:"8,230",
          dealTime: "2017/01/08  12:09:09",
          recommendPeople:"张三",
          type:"公司",
          Commission: "200",
        });
      }
      this.page();
    },
    page() {
      console.log(this.tableData.length);
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
      	this.addDealedId(sels[0].key);
      	 this.$router.push({path: '/index/ckDeal'})
      }else{
      	this.$message.error("请选择查看内容")
      }
    
    },
    ...mapMutations([
    	'addDealedId'
    ]),
    selsChange(sels) {  
    	if(sels){
    		   this.sels=sels; 
    	}   
    }
  }
};
</script>
<style scoped lang="scss">
#dealed{
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
.el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover{
	cursor:pointer!important;
	color:#409EFF!important;
}
}
</style>
