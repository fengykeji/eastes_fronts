<template>
    <div id="breadcrumb">
        <el-row class="title">
            <el-col>
                <el-breadcrumb separator-class="el-icon">
                    <el-breadcrumb-item v-for="(name,index) in breadcrumbName" v-bind:key="name.id" :to="name.router">
                        <i class="el-icon" >|</i>
                        <span @click="addColor($event)" style="cursor: pointer;" v-bind:style="src==name.breadcrumbname?'fontWeight:700;color:#409EFF':'fontWeight:400;color:#666'">{{name.breadcrumbname}}</span>
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'

export default {
  name: "breadcrumb",
  data(){
  	return{
  		
  	}
  },
  props: {
    breadcrumbName: Array
  },
  computed:{
  	...mapState({
  		src:state=>state.allCustomer.ele
  	})
  },
  methods:{
  	addColor(e){
     let src=e.currentTarget;
     this.change(src.innerHTML);
   },
   ...mapMutations([
   		'change'
   ])
  },
  mounted(){
  	
  }
};
</script>

<style scoped>
.title {
  height: 30px;
  line-height: 30px;
 
}
.el-breadcrumb {
  line-height: 30px;
  padding-left: 20px;
}
.el-breadcrumb__inner span {
  font-weight: 700;
}
.el-breadcrumb__inner i {
  margin: 0px 5px 0px 0px;
}
</style>