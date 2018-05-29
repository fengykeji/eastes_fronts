import Router from 'vue-router'
import Vue from 'vue'


import login from '@/components/user/login'
import forgetPassword from '@/components/user/forgetPassword'
import projectInfo from '@/components/buildingdictionary/projectinfo'
import ChangeDynamicList from '@/components/buildingdictionary/ChangeDynamicList'
import BuildingDetail from '@/components/buildingdictionary/BuildingDetail'
import AddDynamicList from '@/components/buildingdictionary/AddDynamicList'
import autoLoaction from '@/components/buildingdictionary/autoLoaction'
import palnPho from '@/components/buildingdictionary/palnPho'
import generalLayout from '@/components/buildingdictionary/generalLayout'
import AddInfo from '@/components/buildingdictionary/AddInfo'
import effectPic from '@/components/buildingdictionary/effectPic'
import thressDPic from '@/components/buildingdictionary/thressDPic'
import LivePic from '@/components/buildingdictionary/LivePic'
import checkInfo from '@/components/buildingdictionary/checkInfo'
import projectImg from '@/components/buildingdictionary/projectImg'
import categoryImg from '@/components/buildingdictionary/categoryImg'
import apartmentInfo from '@/components/buildingdictionary/apartmentInfo'
import checkApartment from '@/components/buildingdictionary/checkApartment'
import proAnaly from '@/components/buildingdictionary/proAnaly'
import dynamicList from '@/components/buildingdictionary/dynamicList'
import allCustomer from '@/components/customerManagement/allCustomer'
import beConfirmed from '@/components/customerManagement/beConfirmed'
import ckBeConfirmed from '@/components/customerManagement/ckBeConfirmed'
import effective from '@/components/customerManagement/effective'
import ckEffective from '@/components/customerManagement/ckEffective'
import invalid from '@/components/customerManagement/invalid'
import ckInvalid from '@/components/customerManagement/ckInvalid'
import dealed from '@/components/customerManagement/dealed'
import ckDeal from '@/components/customerManagement/ckDeal'
import register from '@/components/user/register'
import secRegister from '@/components/user/secRegister'
import index from '@/components/index/index'
import examine from '@/components/companymanagement/examine'
import examinePass from '@/components/companymanagement/examinePass'
import examineNotPass from '@/components/companymanagement/examineNotPass'
import examineCheck from '@/components/companymanagement/examineCheck'
import Commissio from '@/components/rulemaid/Commissio'
import CommissioCheck from '@/components/rulemaid/CommissioCheck'
import AddTotalRule from '@/components/rulemaid/AddTotalRule'
import AddCompanyRule from '@/components/rulemaid/AddCompanyRule'
import CheckCompanyRule from '@/components/rulemaid/CheckCompanyRule'
import choseCompany from '@/components/rulemaid/choseCompany'
import SetRule from '@/components/rulemaid/SetRule'
import CheckJumpPointRule from '@/components/rulemaid/CheckJumpPointRule'
import endContract from '@/components/rulemaid/endContract'
import CheckPersonRule from '@/components/rulemaid/CheckPersonRule'
import AddPersonDealRule from '@/components/rulemaid/AddPersonDealRule'
import AddPersonVisitRule from '@/components/rulemaid/AddPersonVisitRule'
import CheckTotalRule from '@/components/rulemaid/CheckTotalRule'
import EndTotalRule from '@/components/rulemaid/EndTotalRule'
import RecomposeTotalRule from '@/components/rulemaid/RecomposeTotalRule'
import PersonCommission from '@/components/CommissionManagement/PersonCommission'
import CompanyCommission from '@/components/CommissionManagement/CompanyCommission'
import CkAndCgComDealRule from '@/components/rulemaid/CkAndCgComDealRule'
import CkPayCommission from '@/components/CommissionManagement/CkPayCommission'
import CkPayCommissonDetail from '@/components/CommissionManagement/CkPayCommissonDetail'
import AddApply from '@/components/CommissionManagement/AddApply'
import SubApplyCount from '@/components/CommissionManagement/SubApplyCount'
import PayApplyCheck from '@/components/CommissionManagement/PayApplyCheck'
import CheckPayCheckPayment from '@/components/CommissionManagement/CheckPayCheckPayment'
import PersonPaymentCheck from '@/components/CommissionManagement/PersonPaymentCheck'
import PersonCheckAddView from '@/components/CommissionManagement/PersonCheckAddView'
import PersonCheckAddApplyView from '@/components/CommissionManagement/PersonCheckAddApplyView'
import PersonCheckCheckSubView from '@/components/CommissionManagement/PersonCheckCheckSubView'
import PersonCheckPayApplyView from '@/components/CommissionManagement/PersonCheckPayApplyView'
import PersonCheckPayCheckView from '@/components/CommissionManagement/PersonCheckPayCheckView'
import PerCheckOncePayCheckView from '@/components/CommissionManagement/PerCheckOncePayCheckView'
import PersonCheckPayFaild from '@/components/CommissionManagement/PersonCheckPayFaild'
import PersonAccessoryAddCheckChange from '@/components/CommissionManagement/PersonAccessoryAddCheckChange'
import ToBeComfirmed from '@/components/BrokersManagement/ToBeComfirmed'
import VerifiedPerson from '@/components/BrokersManagement/VerifiedPerson'
import AuditFailure from '@/components/BrokersManagement/AuditFailure'
import ToBeConfirmCheck from '@/components/BrokersManagement/ToBeConfirmCheck'
import ToBeConfilmAudit from '@/components/BrokersManagement/ToBeConfilmAudit'
import addHouseInfo from '@/components/buildingdictionary/addHouseInfo'
import CheckCompanypPayRule from '@/components/rulemaid/CheckCompanypPayRule'
import AddJumpPointRule from '@/components/rulemaid/AddJumpPointRule'
import AddPersonRule from '@/components/rulemaid/AddPersonRule'
import SetPersonRule from '@/components/rulemaid/SetPersonRule'











import AIOLogin from '../components/AllInOneManagement/AIOLogin.vue'
import AIOSetting from '../components/AllInOneManagement/AIOSetting.vue'
import AddNav from '../components/AllInOneManagement/AddNav.vue'
import ModifyNav from '../components/AllInOneManagement/ModifyNav.vue'
import AIOEditSecondary from '../components/AllInOneManagement/AIOEditSecondary.vue'
import AddNavTwo from '../components/AllInOneManagement/AddNavTwo.vue'

import AIOPropertyConsultant from '../components/AllInOneManagement/AIOPropertyConsultant.vue'
import AddPC from '../components/AllInOneManagement/AddPC.vue'
import ModifyPC from '../components/AllInOneManagement/ModifyPC.vue'
import HouseTypeAppreciation from "../components/AllInOneManagement/HouseTypeAppreciation.vue";
import addHTA from '../components/AllInOneManagement/AddHTA.vue'
import modifyHTA from '../components/AllInOneManagement/ModifyHTA.vue'
Vue.use(Router)


export default new Router({
  routes: [
      {
    path: '/',
    redirect: '/login'
  },
   {
    path: '/login',
    name: 'login',
    component: login
  }, {

    path: '/forgetPassword',
    component: forgetPassword

  }, {
    path: '/register',
    component: register
  }, {
    path: '/secRegister',
    component: secRegister
  }, {
    path: '/index',
    name: 'index',
    component: index,
    children: [{
        path: '/',
        redirect: '/index/projectinfo'
      }, {
        path: '/index/examine',
        component: examine
      }, {
        path: '/index/examinepass',
        component: examinePass
      }, {
        path: '/index/examinenotpass',
        component: examineNotPass
      }, {
        path: '/index/examinecheck',
        component: examineCheck
      }, {
        path: '/index/projectinfo',
        component: projectInfo
      }, {
        path: '/index/generalLayout',
        component: generalLayout
      }, {
        path: '/index/checkInfo',
        component: checkInfo
      }, {
        path: '/index/projectImg',
        component: projectImg
      }, {
        path: '/index/categoryImg',
        component: categoryImg
      }, {
        path: '/index/apartmentInfo',
        component: apartmentInfo
      }, {
        path: '/index/checkApartment',
        component: checkApartment
      }, {
        path: '/index/proAnaly',
        component: proAnaly
      }, {
        path: '/index/dynamicList',
        component: dynamicList
      }, {
        path: '/index/allCustomer',
        component: allCustomer
      }, {
        path: '/index/beConfirmed',
        component: beConfirmed
      }, {
        path: '/index/effective',
        component: effective
      }, {
        path: '/index/invalid',
        component: invalid
      }, {
        path: '/index/dealed',
        component: dealed
      }, {
        path: '/index/ckBeConfirmed',
        component: ckBeConfirmed
      }, {
        path: '/index/ckEffective',
        component: ckEffective
      }, {
        path: '/index/ckInvalid',
        component: ckInvalid
      }, {
        path: '/index/ckInvalid',
        component: ckInvalid
      }, {
        path: '/index/ckDeal',
        component: ckDeal
      },
      {
        path: "/index/CommissioCheck",
        component: CommissioCheck
      },
      {
        path: '/index/AddTotalRule',
        component: AddTotalRule
      },
      {
        path: '/index/CheckCompanyRule',
        component: CheckCompanyRule
      },
      {
        path: '/index/choseCompany',
        component: choseCompany
      },
      {
        path: '/index/SetRule',
        component: SetRule
      }, {
        path: '/index/CheckJumpPointRule',
        component: CheckJumpPointRule
      },
      {
        path: '/index/endContract',
        component: endContract
      },
      {
        path: '/index/CheckPersonRule',
        component: CheckPersonRule
      },
      {
        path: '/index/AddPersonDealRule',
        component: AddPersonDealRule
      },
      {
        path: '/index/AddPersonVisitRule',
        component: AddPersonVisitRule
      },
      {
        path: '/index/CheckTotalRule',
        component: CheckTotalRule
      },
      {
        path: '/index/EndTotalRule',
        component: EndTotalRule
      },
      {
        path: '/index/RecomposeTotalRule',
        component: RecomposeTotalRule
      },
      {
        path: '/index/PersonCommission',
        component: PersonCommission
      },
      {
        path: '/index/CompanyCommission',
        component: CompanyCommission

      },
      {
        path: '/index/AddDynamicList',
        component: AddDynamicList

      },
      {
        path: '/index/ChangeDynamicList',
        component: ChangeDynamicList
      },
      {
        path: '/index/CkAndCgComDealRule',
        component: CkAndCgComDealRule
      },
      {
        path: '/index/BuildingDetail',
        component: BuildingDetail
      },
      {
        path: '/index/AddInfo',
        component: AddInfo,
        name: 'AddInfo'
      },
      {
        path: '/index/autoLoaction',
        component: autoLoaction
      },
      {
        path: '/index/CkPayCommission',
        component: CkPayCommission
      },
      {
        path: '/index/CkPayCommissonDetail',
        component: CkPayCommissonDetail
      },
      {

        path: '/index/AddApply',
        component: AddApply
      },
      {
        path: '/index/SubApplyCount',
        component: SubApplyCount
      },
      {
        path: '/index/PayApplyCheck',
        component: PayApplyCheck
      },
      {
        path: '/index/CheckPayCheckPayment',
        component: CheckPayCheckPayment
      },
      {
        path: '/index/PersonPaymentCheck',
        component: PersonPaymentCheck
      },
      {
        path: '/index/PersonCheckAddView',
        component: PersonCheckAddView
      },
      {
        path: '/index/PersonCheckCheckSubView',
        component: PersonCheckCheckSubView
      },
      {
        path: '/index/PersonCheckAddApplyView',
        component: PersonCheckAddApplyView
      },
      {
        path: '/index/PersonCheckPayApplyView',
        component: PersonCheckPayApplyView
      },
      {

        path: '/index/PersonCheckPayCheckView',
        component: PersonCheckPayCheckView
      },
      {
        path: '/index/PerCheckOncePayCheckView',
        component: PerCheckOncePayCheckView
      },
      {
        path: '/index/PersonCheckPayFaild',
        component: PersonCheckPayFaild
      },
      {
        path: '/index/PersonAccessoryAddCheckChange',
        component: PersonAccessoryAddCheckChange
      },
      {
        path: '/index/ToBeComfirmed',
        component: ToBeComfirmed
      },
      {
        path: '/index/VerifiedPerson',
        component: VerifiedPerson
      },
      {
        path: '/index/AuditFailure',
        component: AuditFailure
      },
      {
        path: '/index/ToBeConfirmCheck',
        component: ToBeConfirmCheck
      },
      {
        path: '/index/ToBeConfilmAudit',
        component: ToBeConfilmAudit
      },
      {
        path: "/index/ToBeConfirmCheck",
        component: ToBeConfirmCheck
      },
      {
        path: "/index/ToBeConfilmAudit",
        component: ToBeConfilmAudit
      },
      {
        path: "/index/addHouseInfo",
        component: addHouseInfo
      },
      {
        path: '/index/AddCompanyRule',
        component: AddCompanyRule
      },
      {
        path: '/index/CheckCompanypPayRule',
        component: CheckCompanypPayRule
      },
      {
        path: '/index/AddJumpPointRule',
        component: AddJumpPointRule
      },
      {
        path: '/index/AddPersonRule',
        component: AddPersonRule
      },
      {
        path: '/index/SetPersonRule',
        component: SetPersonRule
      },
      {
        path:'/index/AIOSetting',
        name:'AIOSetting',
        component:AIOSetting
       },
       {
         path:'/index/addNav',
         name:'addNav',
         component:AddNav
       },
       {
        path:'/index/modifyNav',
        name:'modifyNav',
        component:ModifyNav
       },
       {
         path:'/index/editsecondary/:id',
         name:'editsecondary',
         component:AIOEditSecondary
       },
       {
         path:'/index/addNavTwo/:id',
         name:'addnavtwo',
         component:AddNavTwo
       },
       {
         path:'/index/propertyconsultant/:id',
         name:'propertyconsultant',
         component:AIOPropertyConsultant
       },
       {
         path:'/index/addPC/:id',
         name:'addpc',
         component:AddPC
       },
       {
         path:'/index/modifyPC',
         name:'modifypc',
         component:ModifyPC
       },
       {
         path:'/index/houseTypeAppreciation/:navid',
         name:'housetypeappreciation',
         component:HouseTypeAppreciation
       },
       {
         path:'/index/addHouseTypeAppreciation/:navid',
         name:'addhta',
         component:addHTA
       },
       {
         path:'/index/modifyHTA',
         name:'modifyhta',
         component:modifyHTA
       }
    ]
  }
 ]
})
