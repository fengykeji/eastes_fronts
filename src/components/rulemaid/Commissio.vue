<template>
	<div id="Commissio">
		<el-row type="flex" justify="space-between" class="dynamicList-title">
            <el-col :span="16"   :push="1" class="Commissio_title">
                {{title}}
            </el-col>
            <el-col :span="7">
                <el-button-group>
                    <el-button type="primary" size="small">高级搜索</el-button>
                    <el-button type="primary" @click="check" size="small">查看</el-button>
                    <el-button type="primary" size="small" >佣金申请</el-button>
                    <el-button type="primary" size="small" >付款申请</el-button>
                </el-button-group>
            </el-col>
        </el-row>
        <el-table :data="Data" border ref="multipleTable" tooltip-effect="dark" class="apart-table">
            <el-table-column type="selection" label="ALL" width="50">
            </el-table-column>
            <el-table-column prop="key" label="序号" width="60">
            </el-table-column>
              <el-table-column prop="companyName" label="公司名称"  width="100">
            </el-table-column>
            <el-table-column prop="customerName" label="负责人"  width="80">
            </el-table-column>
            <el-table-column prop="phone" label="联系方式" width="130">
            </el-table-column>
            <el-table-column prop="planeTime" label="计划开始日期" width="130">
            </el-table-column>
             <el-table-column prop="planeEndTime" label="计划截止日期" width="130">
            </el-table-column>
            <el-table-column prop="sureTime" label="实际开始日期"width="130">
            </el-table-column>
            <el-table-column prop="sureEndTime" label="实际截止日期"width="130">
            </el-table-column>
            <el-table-column prop="state" label="申请状态" width="100">
            </el-table-column>      
            <el-table-column prop="type" label="执行状态"width="100">
            </el-table-column>
                
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="tableData.length" :pageSize="pageSize" @current-change="handleCurrentChange" class="Img-page">
        </el-pagination>
	</div>
</template>

<script>
export default {
 	 name: "Commissio",
 	 data(){
 	 	return{
 	 		title:"结佣规则",
 	 		Data: [],
     		tableData: [],
            pageSize: 8,
            alltablesize: []
        }
 	},
 	methods:{
 		getApartmentInfoImgList() {
      		for (let i = 1; i < 101; i++) {
       		  this.tableData.push({
          		key: i,
          		recommendNum: "TJBH"+i,
         		customerName: "张三",
         		phone: "15692228060",
          		state: "待审核",      		
          		type: "执行中",
          		companyName:"云算平台",
          		planeTime:"2017/01/08",
          		planeEndTime:"2017/01/08",
          		sureTime:"2017/01/08",
         		sureEndTime:"2017/01/08"   
             });
       }
       this.page();
       },
       page() {
         console.log(this.tableData.length);
         for (let i = 0;i < Math.ceil(this.tableData.length / this.pageSize); i++){
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
      	 this.$router.push({ path:"/index/CommissioCheck"});
      }
 	},
 	created(){
 		this.getApartmentInfoImgList();
 		console.log(this.Data);
 	}
}
</script>

<style scoped>
	.Commissio_title{
		height:32px;
		line-height:32px;
	}
	.dynamicList-title{
		margin-bottom:20px;
	}
</style>