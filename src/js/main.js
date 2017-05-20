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
    routes: routes.routes,
});

router.beforeEach((to, from, next) => {
    
 if (from.name == routes.routeNames.comics) {
     let backRouteParams = {
        pageNumber: to.params.pageNumber,
        name: to.params.name
     };
     localStorage.setItem('backRouteParams', JSON.stringify(backRouteParams));
 }
 next();
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
