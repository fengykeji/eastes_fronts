const state={
	ele:"公司佣金"
}
const mutations={
	changeCommissionManage(state,payload){
		state.ele=payload;	
	}
}

export default{
	state,
	mutations
}
