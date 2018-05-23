import $http from 'axios'
import Rooturl from '../../../static/Rooturl'
import qs from 'qs'

const state={
	formData:[],
	open_ways:[]
}

const mutations={
	clearData(state,payload){
		state.formData={...payload.clear}
	},
	config(state,payload){
		state.open_ways=payload.config
	}
}

const actions={
	AddBuildDetail({commit,state},payload){
		let url =Rooturl.Rooturl+"project/build/add";
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
				state.formData=payload;
			}
		}).catch(err=>{
			console.log(err);
		})
	},
	config({commit,state},payload){
		let url =Rooturl.Rooturl+"config";
		$http.get(url).then(res=>{
			console.log(res.data.data[11].param);
			commit({
				type:'config',
				config:res.data.data[11].param
			})
		})
	}
}

export default{
	state,
	mutations,
	actions
}
