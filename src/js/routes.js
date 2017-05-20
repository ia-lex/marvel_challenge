import home from '../components/home.vue';
import comics from '../components/comics.vue';

var routeNames = {
    character: 'characters',
    comics: 'comics'
};

const routes = [
    {
        path: '/',
        name: 'main',
        component: home
    },
    {
        path: '/character/:name/page/:pageNumber',
        name: routeNames.character,
        component: home
    },
    {
        path: '/character/:id/comics',
        name: routeNames.comics,
        component: comics
    }
];


export default {
    routes: routes,
    routeNames: routeNames
}