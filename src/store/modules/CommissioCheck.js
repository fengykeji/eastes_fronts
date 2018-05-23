const state={
	project_id:'',
	sels:[]
}
const mutations={
	CommissioCheck(state,payload){
		state.sels=payload
	}
}

export default{
	state,
	mutations
}
