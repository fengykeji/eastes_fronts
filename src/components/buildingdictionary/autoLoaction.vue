<template>
<div id="autoLoaction">
	<el-row style="height:40px;padding-left:40px;background:#545c64 ;">	
		<el-col :span="12">
			<span class="check-basetitle">地图定位地址</span>
		</el-col>
		<el-col :span="4" :push="8" >	
    		<el-button size="small" type="primary" @click="comfirm">确认</el-button>
    		<el-button size="small" @click="back" >取消</el-button>
		</el-col>
	</el-row>
	<div id="allmap"></div>
</div>
</template>

<script>
import {mapMutations,mapState} from 'vuex'	
export default{
		name:'autoLoaction',
		data(){
			return{
				loactions:'',
				address:''
			}
		},
		methods:{
			load(){
				var lng='';
				let _this=this;
				var lat='';
				var map = new BMap.Map("allmap");
				var geo=new BMap.Geocoder();	
			
				if(this.cityName){
					map.centerAndZoom(this.cityName,18);
				}else{
					var point = new BMap.Point(116.331398,39.897445);
					map.centerAndZoom(point,18);
				}
				
				map.enableScrollWheelZoom(true);
				map.addEventListener("click",function(e){
					map.clearOverlays();
				    geo.getLocation(e.point,function(r){
				    var point = new BMap.Point(r.point.lng,r.point.lat);
				    var marker = new BMap.Marker(point);
				  
				    map.addOverlay(marker); 
				    _this.loactions=r.addressComponents;
				      console.log(r.addressComponents)
				    _this.address=r.address;				 
				})
				}); 
				
				
			},
			...mapMutations([
				'addAddress','addAdressDetail'
			]),
			back(){
				this.$router.push({path:'/index/projectinfo'});
			},
			comfirm(){
				if(this.loactions){
					this.addAdressDetail(this.loactions);
					this.addAddress(this.address);
					this.$router.push({path:'/index/projectinfo'});
				}else{
					this.$message.error("您没有选择你的位置")
				}
					
			}
			
		},
		created(){
			
		},
		mounted(){
			this.load();
		},
		computed:{
			...mapState({
				 cityName:state=>state.autoLoaction.cityName
			})
		}
}
</script>

<style>
#allmap{
	height:440px;
}
#autoLoaction .Commissio_title{
		line-height:32px;
}
#autoLoaction  .check-basetitle{
		height:40px;
		line-height:40px;
		color:#fff;
}
#autoLoaction .el-button{
		margin-top:3px!important;
}
</style>