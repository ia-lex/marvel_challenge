import Vue from 'vue';
import vueResource from 'vue-resource';
import vueRouter from 'vue-router';
import filters from './filters.js';
import routes from './routes.js';
import App from '../components/app.vue';

Vue.use(vueResource);
Vue.use(vueRouter);

Vue.filter('imageFullPath', filters.image_path);

const router = new vueRouter({
	mode: 'history',
	routes
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
