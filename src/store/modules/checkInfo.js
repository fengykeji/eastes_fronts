import $http from 'axios'
import Rooturl from '../../../static/Rooturl'
import qs from 'qs'

const state={
	sels:'',
	builds:[],
	totalData:[],
	floorId:'',
	houseId:'',
	formData:''
}

const getters={
	getfloorId(state){
	  if(state.sels.ladder_ratio){
		let str=state.sels.ladder_ratio;
		return str.substring(0,1)
	  }	
	},
	gethouseId(state){
	 if(state.sels.ladder_ratio){
		let str=state.sels.ladder_ratio;
		return str.substring(2,str.length)
	 }			
	},
	clearData(state,payload){
		state.formData={...payload.clear}
	}
}
const mutations={
	getBuild(state,payload){
		state.builds=payload.res;
		state.totalData=payload.totalData
	},
	addBuidData(state,payload){
		state.sels=payload
	},
	
}

const actions={
	 getBuild({commit}){
  	 	let url=Rooturl.Rooturl+'project/build/list';
  	 	$http.get(url,{
  	 		params:{
  	 			project_id:1
  	 		}
  	 	}).then(res=>{
  	 		commit({
  	 			type:'getBuild',
  	 			res:res.data.data.data,
  	 			totalData:res.data
  	 		})
  	 	})
  	 },
  	 UpdateBuildDetail({commit,state},payload){
		let url =Rooturl.Rooturl+"project/build/update";
		console.log(payload)
		$http.post(url, qs.stringify({
			...payload
		})).then(res=>{
			console.log(res.data);
			if(res.data.code=='200'){
				alert(res.data.msg);
				commit({
					type:"clearData",
					clear:'200'
				})
			}else if(res.data.code=='400'){
				alert(res.data.msg);
			}
		}).catch(err=>{
			console.log(err);
		})
	}
}

export default {
	state,
	mutations,
	actions,
	getters
	
}
