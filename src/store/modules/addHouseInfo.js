import $http from 'axios'
import Rooturl from '../../../static/Rooturl'
import qs from 'qs'

const state={
	clear:'',
	houseMes:{},
	changeCommplite:'',
	addMsg:'',
	changeMsg:'',
	houseBaseInfo:false
}


const mutations={
	houseMesGet(state,payload){
		state.houseMes=payload.res;
	},
	HousechangeState(state,payload){
		state.changeCommplite=payload.res;
		state.changeMsg=payload.msg
	},
	HouseaddState(state,payload){
		state.clear=payload.res;
		state.addMsg=payload.msg
	}
}


const actions={
	houseAdd({commit},payload){
		let url=Rooturl.Rooturl+"project/houseType/add";
		$http.post(url,qs.stringify({
			...payload
		})).then(res=>{
			if(res.data.code==200){
				commit({
					type:'HouseaddState',
					res:200
				})
			}else{
				commit({
					type:'HouseaddState',
					res:res.data,
					msg:res.data.msg
				})
			}
		})
	},
	houseMesGet({commit},payload){
		let url=Rooturl.Rooturl+"project/houseType/detail";
		$http.get(url,{
			params:{
				id:payload
			}
		}).then(res=>{
			console.log(res.data.data)
			commit({
				type:'houseMesGet',
				res:res.data.data
			
			})
		})
	},
	houseMeschange({commit},payload){
		let url=Rooturl.Rooturl+"project/houseType/update";
		$http.post(url,qs.stringify({
			...payload
		})).then(res=>{
			if(res.data.code==200){
				commit({
					type:'HousechangeState',
					res:200
				})
			}else{
				commit({
					type:'HousechangeState',
					res:400,
					msg:res.data.msg	
				})
			}
		})
	}
}

export default{
	state,
	mutations,
	actions
}
