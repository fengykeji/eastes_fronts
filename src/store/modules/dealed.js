const state={
	project_id:''
}
const mutations={
	addDealedId(state,payload){
		state.project_id=payload
	}
}

export default{
	state,
	mutations
}
