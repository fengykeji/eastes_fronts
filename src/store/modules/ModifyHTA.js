const state={
	profile:''
}

const mutations={
	changeHTAProfile(state,profile){
		state.profile=profile
	}
}
const actions={
    HTAProfileChange({commit},profile){
        return commit('changeHTAProfile',profile)
    }
}
export default{
	state,
	mutations,
	actions
}