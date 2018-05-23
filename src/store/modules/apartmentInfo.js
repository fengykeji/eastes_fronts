import $http from 'axios'
import Rooturl from '../../../static/Rooturl'
import qs from 'qs'

const state={
	houseData:[],
	Isdelete:''
}


const mutations={
	addData(state,payload){
		state.houseData=payload.data;
	}
}


const actions={
	addData({commit},payload){
		let url=Rooturl.Rooturl+"project/houseType/list";
		$http.get(url,{
			params:{
				state:'1'
			}
		}).then(res=>{
				console.log(res.data.data)
				commit({
					type:'addData',
					data:res.data.data
				})
		});
	},
	deleteHouse({commit},payload){
		let url=Rooturl.Rooturl+"project/houseType/delete";
		$http.post(url,qs.stringify(payload)).then(res=>{
			if(res.code==200){
				commit({
					type:'addData',
					data:res.data
				})
			}
		});
	}
}

export default{
	state,
	mutations,
	actions
}
