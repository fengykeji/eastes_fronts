import $http from 'axios'
import Rooturl from '../../../static/Rooturl'
import qs from 'qs'


const state={
	sels:[],
	id:'',
	house_type_name:''
}

const mutations={
	PhoAddSels(state,payload){
		state.sels=payload
	},
	PhoAddId(state,payload){
		state.id=payload
	},
	PhoHouseTypeName(state,payload){
		state.house_type_name.payload
	}
}


const actions={
	
}


export default{
	state,
	mutations,
	actions
}
