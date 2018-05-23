const state={
	ele:"待审核"
}
const mutations={
	changeBrokersHeader(state,payload){
		state.ele=payload;	
	}
}

export default{
	state,
	mutations
}
