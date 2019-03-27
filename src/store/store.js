import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		// 相当于组件中的data,用来存储数据
		conut:0
	}
})

export default store