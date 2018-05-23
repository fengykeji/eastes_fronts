const state={
	sels:[]
}


const mutations={
	AddSetRule(state,payload){
		state.sels=payload
	}
}



export default{
	state,
	mutations
}
