import home from '../components/home.vue';

const routes = [
    {
        path: '/',
        name: 'main',
        component: home
    },
    {
        path: '/characters/page/:pageNumber',
        name: 'characters-all',
        component: home
    }
]

export default routes