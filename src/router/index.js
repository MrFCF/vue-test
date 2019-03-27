import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Regis from '@/views/Regis'


Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'Login',
			component: Login
		},
		{
			path: '/Regis',
			name: 'Regis',
			component: Regis
		}
	]
})
