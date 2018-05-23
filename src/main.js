import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import httpinfo from '@/components/shared/http.js'
import store from './store'
import md5 from 'js-md5'; //导入md5加密
// import SIdentify from "./components/shared/identify.vue";
// Vue.use(SIdentify)

Vue.use(ElementUI);

Vue.prototype.MD5 = md5
Vue.prototype.$http = axios
Vue.prototype.URL = httpinfo.httpurl
Vue.prototype.HEAD = httpinfo.httphead
Vue.prototype.Rooturl ='http://192.168.0.154/hs_agent/public/index.php/' //'http://120.27.21.136:2798/'
Vue.prototype.Lanurl='http://120.27.21.136:2798/'
Vue.prototype.HOST = '/api'
Vue.prototype.webservicexml = httpinfo.webservicexml
Vue.prototype.returndata = httpinfo.returndata

	

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})