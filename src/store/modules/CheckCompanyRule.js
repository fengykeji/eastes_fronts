import $http from 'axios'
import Rooturl from '../../../static/Rooturl'
import qs from 'qs'

const state={
	project_id:'',
	ComRules:{},
	clear:''
}
const mutations={
	addComRule(state,payload){
		state.project_id=payload
	},
	AddComRules(state,payload){
		state.clear=payload.res
	},
	GetComRules(state,payload){
		state.ComRules=payload.res
	}
}
const actions={
	AddComRules({commit},payload){
		let url=Rooturl.Rooturl+"project/ruleCompany/create";
		$http.post(url,qs.stringify({
			...payload
		})).then(res=>{
			if(res.data.code==200){
				alert("成功");	
			}else{
				alert(res.data.msg)
			}
			commit({
					type:"AddComRules",
					res:res.data.code
			})
		})
	},
	GetComRules({commit},payload){
			let url=Rooturl.Rooturl+"project/ruleCompany/getDetail";
			$http.get(url,{
				params:{
					rule_id:payload
				}
			}).then(res=>{
				commit({
					type:'GetComRules',
					res:res.data
				})
			})
	},
	ChangeComRule({commit},payload){
		let url=Rooturl.Rooturl+"project/ruleCompany/update";
		$http.post(url,qs.stringify({...payload}))
			.then(res=>{
				if(res.data.code==200){
					alert(res.data.msg)
				}else{
					alert(res.data.msg)
				}
			})
	}
}
export default{
	state,
	mutations
}
