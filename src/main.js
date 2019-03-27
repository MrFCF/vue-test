// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import api from './config/axios.js'
import store from './store/store.js'

Vue.config.productionTip = false
// 全局引用$api
Vue.prototype.$api = api
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,  //只要挂在VM实例上,任何组件都能存储数据
	components: {
		App
	},
	template: '<App/>'
})

// const route = new VueRouter()
// route.beforeEach((to,form,next) =>{
// 	// if()
// })
