import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './plugins/compositionApi';
import './plugins/vueSignPad';
import './assets/style/_variables.scss';
import './utils/directives/index';
import CKEditor from 'ckeditor4-vue';

Vue.use(CKEditor);
import Axios from 'axios';
const localToken = localStorage.getItem('auth._token.local');
Vue.config.productionTip = false;
Axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
Axios.defaults.headers = { Authorization: `Bearer ${localToken}` };
new Vue({
	router,
	store,
	vuetify,
	render: h => h(App),
}).$mount('#app');
