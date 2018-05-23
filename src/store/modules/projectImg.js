import $http from 'axios'
import Rooturl from '../../../static/Rooturl'
import qs from 'qs'


const state={	
	ImgCount:[],
	sels:[]
}


const mutations={
	addImgs(state,payload){
		state.ImgCount=payload.res
	},
	AddProSels(state,payload){
		state.sels=payload
	}
}

const actions={
	addImgs({commit},payload){
		let url=Rooturl.Rooturl+"project/img/getTypeListCount";
		$http.get(url).then(res=>{
			console.log(res.data.data);
			commit({
				type:'addImgs',
				res:res.data.data
			})
		})
	},
	getImgList({commit},payload){
		let url=Rooturl.Rooturl+"project/housetype/getList";
		$http.get(url,{
			params:{
				img_type:'1'
			}
		}).then(res=>{
			console.log(res.data);
		})
	}
	
	
}


export default{
	state,
	mutations,
	actions
}
