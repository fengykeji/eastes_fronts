import $http from 'axios'
import Rooturl from '../../../static/Rooturl'

const state={
	project_id:'',
	build_id:'',
	YsBuild:{},
	builds:[],
	totalData:''
}
const mutations={
	generalLayout(state,payload){
		state.build_id=payload
	},
	addProId(state,payload){	
		state.project_id=payload
	},
	getYsBuild(state,payload){
		state.YsBuild=payload.res
	},
	getBindBuild(state,payload){
		state.builds=payload.res;
		state.totalData=payload.totalData
	}
}
const actions={
	getYsBuild({commit}){
		let url=Rooturl.Rooturl+"project/build/ys/build";
		$http.get(url,{
			params:{
				project_id:1
			}
		}).then(res=>{
			commit({
				type:'getYsBuild',
				res:res.data.data
			})
		})
	},
	getBindBuild({commit}){
  	 	let url=Rooturl.Rooturl+'project/build/list';
  	 	$http.get(url,{
  	 		params:{
  	 			project_id:1
  	 		}
  	 	}).then(res=>{
  	 		console.log(res.data.data)
  	 		commit({
  	 			type:'getBindBuild',
  	 			res:res.data.data.data,
  	 			totalData:res.data
  	 		})
  	 	})
  	 }
}
export default{
	state,
	mutations,
	actions
}
