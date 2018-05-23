<template>
    <div id="examinePass">
        <el-row type="flex" justify="space-between" class="examine-title">
            <el-col :span="8">
                <breadcrumb :breadcrumbName="breadcrumbName"></breadcrumb>
            </el-col>
            <el-col :span="6">
                <el-button-group>
                    <el-button type="info" plain size="small">高级搜索</el-button>
                    <el-button type="info" plain size="small">查看</el-button>
                    <el-button type="info" plain size="small">审核</el-button>
                </el-button-group>
            </el-col>
        </el-row>
        <el-table :data="Data" border style="width: 100%" ref="multipleTable" tooltip-effect="dark" size='mini'>
            <el-table-column type="selection" width="50">
            </el-table-column>
            <el-table-column prop="key" label="序号" width="55">
            </el-table-column>
            <el-table-column prop="companyName" label="公司名称">
            </el-table-column>
            <el-table-column prop="account" label="账号">
            </el-table-column>
            <el-table-column prop="companyType" label="公司类型">
            </el-table-column>
            <el-table-column prop="city" label="城市">
            </el-table-column>
            <el-table-column prop="region" label="区域">
            </el-table-column>
            <el-table-column prop="personInCharge" label="负责人">
            </el-table-column>
            <el-table-column prop="contactWay" label="联系方式">
            </el-table-column>
            <el-table-column prop="organizationCode" label="组织机构代码" width="120">
            </el-table-column>
            <el-table-column prop="businessLicense" label="工商执照号">
            </el-table-column>
            <el-table-column prop="auditTime" label="审核时间">
            </el-table-column>
            <el-table-column prop="auditor" label="审核人员">
            </el-table-column>
            <el-table-column prop="operation" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="tableData.length" :pageSize="pageSize" @current-change="handleCurrentChange">
        </el-pagination>
    </div>
</template>

<script>
import breadcrumb from "@/components/shared/breadcrumb";
export default {
  name: "examinePass",
  components: { breadcrumb },
  data() {
    return {
      breadcrumbName: [
        { breadcrumbname: "公司管理", router: "" },
        { breadcrumbname: "待审核", router: "../index/examine" },
        { breadcrumbname: "审核通过", router: "" }
      ],
      Data: [],
      tableData: [],
      pageSize: 15,
      alltablesize: []
    };
  },
  created() {
    this.getexaminelist();
  },
  methods: {
    getexaminelist() {
      for (let i = 1; i < 100; i++) {
        this.tableData.push({
          key: i,
          companyName: "云算科技",
          account: "GIZHNO" + i,
          companyType: "房地产",
          city: "成都",
          region: "郫都区",
          personInCharge: "张三",
          contactWay: "13921332133",
          organizationCode: "ZZJGDMNO" + i,
          businessLicense: "GSZZNO" + i,
          auditTime: "2017/12/12",
          auditor:"李四"
        });
      }
      this.page()
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

      console.log(this.alltablesize);
      this.Data = this.alltablesize[0];
    },
    handleCurrentChange(val) {
      this.Data = this.alltablesize[val - 1];
    }
  }
};
</script>

<style scoped>
.el-breadcrumb {
  line-height: 40px;
}
.examine-title {
  border-bottom: dashed 1px #dedede;
  margin-bottom: 10px;
  padding-bottom: 10px;
}
.el-pagination {
  margin-top: 20px;
}
</style>


