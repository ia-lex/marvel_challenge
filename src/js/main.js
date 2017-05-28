import Vue from 'vue';
import vueResource from 'vue-resource';
import vueRouter from 'vue-router';
import filters from './filters.js';
import routes from './routes.js';
import App from '../components/app.vue';
import helper from './helper.js';

// This is to create an static *.scss file that will be called on webpack sass loader
// but at this time it doesnt work, it keeps saying "you need an apropiate loader to handle this file"
// import css from '../styles/style.scss';
// require('../styles/style.scss');

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
        helper.methods.setStorage('backRouteParams', backRouteParams);
    }
    next();
});

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
