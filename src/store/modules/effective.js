const state={
	project_id:''
}
const mutations={
	addEffectiveId(state,payload){
		state.project_id=payload
	}
}

export default{
	state,
	mutations
}
