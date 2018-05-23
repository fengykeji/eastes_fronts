<template>
  <div id="categoryImg">
    <el-row class="categoryImginfo" type="flex" justify="space-between">
      <el-col :span="17">
        		项目图片信息
      </el-col>
      <el-col :span="5">
        <el-button-group>
          <el-button type="primary" size="small" @click="seeImgVisibleChange()">查看</el-button>
          <el-button type="primary" size="small" @click="addImgVisible = true">新增</el-button>
          <el-button type="primary" size="small" @click="changeImginfo()">修改</el-button>
          <el-button type="primary" size="small" @click="deleteRow()">删除</el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <el-table :data="ImgList" border style="width: 100%" ref="multipleTable" tooltip-effect="dark" class="cate-table" @select="a($event)">
      <el-table-column type="selection" label="all" width="50">
      </el-table-column>
      <el-table-column type="index" prop="sort" label="图片顺序" width="100">
      </el-table-column>
      <el-table-column prop="type_name" label="图片类型" width="120" >
      </el-table-column>
      <el-table-column prop="img_url" label="图片" width="120">
        <template slot-scope="scope"> 
          <img :src="url+scope.row.img_url" alt="" class="baseImg" >
        </template> 
      </el-table-column>
      <el-table-column prop="comment" label="备注">
      </el-table-column>
      <el-table-column prop="create_time" label="更新时间">
      </el-table-column>
      <el-table-column prop="ordering" label="调序">
        <template slot-scope="scope">  
          <i class="el-icon-upload2" @click="order(scope.$index)"></i>
          <i class="el-icon-download" @click="ordertwo(scope.$index)"></i>
        </template> 
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="tableData.length" :pageSize="pageSize" @current-change="handleCurrentChange" class="cate-page">
    </el-pagination>
    <!-- 查看图片弹窗 -->
    <el-dialog title="查看" :visible.sync="seeImgVisible">
      <el-form ref="form" :model="ruleFormSee" label-width="100px" size="small">
        <el-form-item label="查看:">
          <img width="100%" :src="url+seeImg.img_url" alt="">
        </el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" autosize placeholder="请输入内容" v-model="seeImg.img_describe">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="seeImgVisible = false">取 消</el-button>
        <el-button type="primary" @click="seeImgVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增图片弹窗 -->
    <el-dialog title="新增" :visible.sync="addImgVisible">
      <el-form ref="form" :model="ruleFormUplode" label-width="100px" size="small">
        <el-form-item label="添加文件:">
          <el-upload action="/api/project/file/upload" :data="{file_name:'img'}" name="img" list-type="picture-card" :before-upload="beforeImgUpload" :on-success="addImgSuccess" :on-error="addImgErr" :limit="1" :on-exceed="limit">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="upImgVisible">
            <img width="100%" :src="upImgVisibleUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" autosize placeholder="请输入内容" v-model="ruleFormUplode.remarks">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addImgVisible = false">取 消</el-button>
        <el-button type="primary" @click="addImgVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改图片弹窗 -->
    <el-dialog title="修改" :visible.sync="changeImgVisible">
      <el-form ref="form" :model="ruleFormChange" label-width="100px" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <img width="100%" :src="url+img_url" alt="">
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="添加文件:">
              <el-upload action="/api/project/file/upload" :data="{file_name:'img'}" name="img" list-type="picture-card" :before-upload="beforeImgUpload" :on-success="upImgSuccess" :limit="1" :on-exceed="limit">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="upImgVisible">
                <img width="100%" :src="upImgVisibleUrl" alt="">
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注:">
          <el-input type="textarea" autosize placeholder="请输入内容" v-model="ruleFormUplode.remarks">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeImgVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeImgVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {mapState,mapActions,mapMutations}  from 'vuex'

export default {
  name: "categoryImg",
  data() {
    return {
    	url:this.Baseurl,
      ruleFormUplode: {
        remarks: ""
      },
      ruleFormSee: {
        remarks: ""
      },
      ruleFormChange: {
        remarks: ""
      },
      Data: [],
      tableData: [],
      pageSize: 15,
      alltablesize: [],
      upImgVisibleUrl: "",
      seeImgVisibleUrl: "",
      upImgVisible: false,
      addImgVisible: false,
      seeImgVisible: false,
      changeImgVisible: false,
      imgId: "",
      img_url: "",
      seeImg: {},
      checked: true,
      url:'',
      sels:[]
    };
  },
  computed:{
  		...mapState({
  				ImgList:state=>state.categoryImg.ImgList
  		})
  },
  created() {
    // 云算接口
    //this.$http
     // .get("http://39.108.60.120:10009/ysservice.ashx?action=getxm")
     //   .then(res => {
       //    console.log(JSON.parse(decodeURI(res.data)));
     //  });
    // 配置信息
    this.AddImgList();
    
  },
  methods: {
    // 图片详情接口
    getCategoryImgList() {
    	let url=this.Rooturl+"project/img/getList";
      this.$http.get(url).then(res => {
        this.tableData = res.data.data;
        this.page();
      });
    },
    page() {
      this.alltablesize = [];
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
      this.ImgList = this.alltablesize[0];
    },
    handleCurrentChange(val) {
      this.ImgList = this.alltablesize[val - 1];
    },
    //修改图片顺序向上交换
    order(index) {
      //index是当前选中的索引值，选第一行index=0，选第二行index=1,所以要判断一下，index=0就不能执行交换，交换接口掉完后要重新调一次列表数据接口，以达到刷新数据的目的。
      let last = index - 1;
      let beijiaohuanid = 0;
      let id = 0;
      for (let i = 0; i < this.ImgList.length; i++) {
        if (last == i) {
          //记住向上交换是当前索引-1，向下交换就是当前索引+1
          beijiaohuanid = this.ImgList[i].project_img_id;
        }
        if (index == i) {
          id = this.ImgList[i].project_img_id;
        }
      }
      let url=this.Rooturl+"project/img/changeSort?project_img_id=";
      this.$http.get(
          url +
            id +
            "&project_img_id_another=" +
            parseInt(beijiaohuanid)
       ).then(res => {
       		let url=this.Rooturl+"project/img/getList";
          this.$http.get(url).then(res => {
            console.log("+++++++++++++++++++++++++++++++++++++++");
            this.tableData = ress.data.data;
            console.log(ress.data.data);
            this.page();
          });
        });
    }, //修改图片顺序向下交换
    ordertwo(index) {
      let last = index + 1;
      let nowId = 0;
      let id = 0;
      for (let i = 0; i < this.ImgList.length; i++) {
        if (last == i) {
          id = this.ImgList[i].project_img_id;
        }
        if (index == i) {
          nowId = this.ImgList[i].project_img_id;
        }
        let url=this.Rooturl+"project/img/changeSort?project_img_id=";
        this.$http    	
          .get(
             url+
              id +
              "&project_img_id_another=" +
              parseInt(nowId)
          )
          .then(res => {
            this.getCategoryImgList();
          });
      }
    },
    // 验证图片格式大小
    beforeImgUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 获取选中行图片id
    a(i) {
      console.log(i);
      if (i.length === 1) {
        this.imgId = i[0].project_img_id;
        this.img_url = i[0].img_url;
      } else {
        this.checked = false;
      }
    },
    //查看图片接口
    seeImgVisibleChange() {
      this.seeImgVisible = true;
      let url=this.Rooturl+"project/img/getImg?project_img_id=";
      this.$http
        .get(url+ this.imgId)
        .then(res => {
          this.seeImg = res.data.data;
        });
    },
    // 修改图片接口
    changeImginfo() {
      var qs = require("qs");
      this.changeImgVisible = true;
      let data = {
        project_img_id: this.imgId,
        img_url: this.img_url,
        house_type_num: "0",
        img_type: "1",
        img_describe: this.ruleFormUplode.remarks
      };
      console.log(data);
      let url=this.Rooturl+"project/img/update"
      this.$http
        .post(url, qs.stringify(data))
        .then(res => {
          console.log(res);
        });
    },
    // 修改图片成功
    upImgSuccess(response) {
       console.log(response)
       if(response.code === 200) {
         //上传图片信息
       var qs = require("qs");
         // 组装参数
       let data = {
          project_img_id:response.project_img_id,
          img_url: response.data,
          img_type: "1",
          house_type_num: "1",
          img_describe: this.ruleFormChange.remarks
       };
       let url=this.Rooturl+'project/img/update'
       this.$http.post(url, qs.stringify(data));
       this.$message({
           message: response.msg,
           type: "success"
         });
       }else {
          this.$message.error("上传失败，请稍后再试");
       }
    },
 
    addImgSuccess(response) {
      if (response.code === 200) {
        // 上传图片信息
        var qs = require("qs");
        // 组装参数
        let data = {
          img_url: response.data,
          img_type: "1",
          house_type_num: "1",
          img_describe: this.ruleFormUplode.remarks
        };
        let url=this.Baseurl+"project/img/upload";
        this.$http.post(url, qs.stringify(data));
        this.$message({
          message: response.msg,
          type: "success"
        });
      } else {
        this.$message.error("上传失败，请稍后再试");
      }
    },
    // 上传图片失败
    addImgErr(err) {
      console.log(err);
      this.$message.error("上传失败，请稍后再试");
    },
    //上传图片超过限制提示
    limit() {
      this.$message.error("图片最多只能上传一张");
    },
    // 删除图片
    deleteRow(index, rows) {
    	let url=this.Rooturl+"project/img/delete?project_img_id=";
      this.$http
        .get(url + this.imgId)
        .then(res => {
          console.log(index);
          for (let i = 0; i < index.length; i++) {
            this.ImgList.splice(index[i], 1);
          }
        });
    },
    ...mapActions([
    	'AddImgList'
    ]),
    selsChange(sels){
    	if(sels){
    		this.sels=sels
    	}
    }
  },
  mounted(){
  	this.AddImgList(this.type_id);
  },
  computed:{
  	...mapState({
  		 type_id:state=>state.categoryImg.type_id,
  		 ImgList:state=>state.categoryImg.ImgList
  	})
  }
};
</script>
<style scoped lang="scss" >
#categoryImg{


.categoryImginfo{
  height: 40px;
  line-height: 40px;
  background-color: #545c64;
	padding-left:20px ;
	color:#fff;
}
.el-button{
	margin-top:3px!important;
}
.img-basetitle {
  display: block;
  margin-left: 20px;
  color: #fff;
}
.baseImg {
  width: 50px;
}
.el-button-group {
  margin-bottom: 5px;
}
#categoryImg .el-button{
	margin-top:3px!important;
} 
.el-dialog__title {
  color: #fff !important;
}
.cate-table {
  /* width: 750px !important; */
  margin: 20px auto;
}
.cate-page {
  margin-top: 20px;
}
.el-icon-upload2,
.el-icon-download {
  font-size: 20px;
  color: #409eff;
  cursor: pointer;
}
}
</style>




