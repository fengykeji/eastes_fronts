import $http from 'axios'
import Rooturl from '../../../static/Rooturl'
import Baseurl from '../../../static/Baseurl'
import qs from 'qs'


const state={
	type_id:'',
	ImgList:[]
	
}


const mutations={
	AddImgTypeId(state,payload){
		state.type_id=payload
	},
	AddImgList(state,payload){
		state.ImgList=payload.res
	}
}


const actions={
	AddImgList({commit},payload){
		let url=Baseurl.Baseurl+"project/img/getOneTypeImgList";
		console.log(payload)
		$http.get(url,{
			params:{
				type_id:payload
			}
		}).then(res=>{
			console.log(res.data.data.data);
			commit({
				type:'AddImgList',
				res:res.data.data.data
			})
		})
	}
	
}


export default{
	state,
	mutations,
	actions
}
