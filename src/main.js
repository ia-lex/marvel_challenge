import Vue from 'vue';
import vueResource from 'vue-resource';
import vueRouter from 'vue-router';
import routes from './routes.js';
import App from './components/App.vue';

Vue.use(vueResource);
Vue.use(vueRouter);

var router = new vueRouter({
	mode: 'history',
	routes
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
