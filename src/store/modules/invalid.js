const state={
	project_id:'',
	data:''
}

const mutations={
	addproid(state,payload){
		state.project_id=payload
	}
}
const actions={
	getData({commit},payload){
		let url=this.Rooturl+"project/client/disabled";
		this.$http.get(url)
		  .then(res=>{commit({
				res:res  	
		  })})
	},
	sendData(){
		
	}
}
export default{
	state,
	mutations,
	actions
}
