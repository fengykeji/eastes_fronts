const state={
	project_id:''
}
const mutations={
	addDynamicList(state,payload){
		state.project_id=payload
	}
}

export default{
	state,
	mutations
}
