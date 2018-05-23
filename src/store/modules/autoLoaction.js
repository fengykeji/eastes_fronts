const state={
	district:"",
	city:"",
	province:"",
	street:"",
	address:'',
	cityName:''
}

const mutations={
	addAdressDetail(sate,payload){
		state.district=payload.district;
		state.city=payload.city;
		state.province=payload.province;
		state.street=payload.street+payload.streetNumber;
	},
	addAddress(sate,payload){
		state.address=payload;
	},
	sencityName(sate,payload){
		state.cityName=payload;
	}
}

export default{
  		state,
  		mutations
}
