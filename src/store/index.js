import Vue from 'vue'
import Vuex from 'vuex'
import $http from 'axios'

import allCustomer from './modules/allCustomer'
import beConfirmed from './modules/beConfirmed'
import invalid from './modules/invalid'
import dealed from './modules/dealed'
import effective from './modules/effective'
import CommissionManage from './modules/CommissionManage'
import dynamicList from './modules/dynamicList'
import CheckCompanyRule from './modules/CheckCompanyRule'
import generalLayout from './modules/generalLayout'
import autoLoaction from './modules/autoLoaction'
import CkPayCommissonDetail from './modules/CkPayCommissonDetail'
import AddApply from './modules/AddApply'
import CommissioCheck from './modules/CommissioCheck'
import BrokersHeader from './modules/BrokersHeader'
import apartmentInfo from './modules/apartmentInfo'
import checkInfo from './modules/checkInfo'
import AddInfo from './modules/AddInfo'
import categoryImg from './modules/categoryImg'
import projectImg from './modules/projectImg'
import palnPho from './modules/palnPho'
import addHouseInfo from  './modules/addHouseInfo'
import CheckCompanypPayRule from './modules/CheckCompanypPayRule'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
 		allCustomer,
 		beConfirmed,
 		invalid,
 		dealed,
 		effective,
 		CommissionManage,
 		dynamicList,
 		CheckCompanyRule,
 		generalLayout,
 		autoLoaction,
 		CkPayCommissonDetail,
 		AddApply,
 		CommissioCheck,
 		BrokersHeader,
 		apartmentInfo,
 		checkInfo,
 		AddInfo,
 		categoryImg,
 		projectImg,
 		palnPho,
 		addHouseInfo,
 		CheckCompanypPayRule
  }
})