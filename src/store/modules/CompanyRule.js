import $http from 'axios'
import Rooturl from '../../../static/Rooturl'
import qs from 'qs'


const state={
	rule_id:'',
	state:'',
	companyData:[]
	
}


const mutations={
	
	
}

const actions={
	getCompanyList({commit},payload){
		let url=Rooturl.Rooturl+''
	}

}


export default{
	state,
	mutations,
	actions
}
