import Vue from 'vue';
import VueRouter from 'vue-router';
import Firebase from 'firebase';
import Home from '@/views/Home.vue';
import Add from '@/views/Add.vue';
import Search from '@/views/Search.vue';
import Admin from '../views/Admin.vue';

Vue.use(VueRouter)

const routes = [{
        name: 'Home',
        path: '/',
        component: Home,
        meta: { requiresAuth: false }
    },
    // {
    //     path: '*',
    //     redirect: '/login'
    // },
    // {
    //     path: '/login',
    //     redirect: '/login'
    // },
    // {
    //     path: '/login',
    //     name: 'Login',
    //     component: Login
    // },
    // {
    //     path: '/signup',
    //     name: 'Signup',
    //     component: Signup
    // },

    {
        name: 'Add',
        path: '/add',
        component: Add
    },
    {
        name: 'ViewAll',
        path: '/search',
        component: Search
    },
    {
        name: 'Admin',
        path: '/admin',
        component: Admin
    }
]
const
    router = new VueRouter({
        routes
    })
    // router.beforeEach((to, from, next) => {
    //     const currentUser = Firebase.auth().currentUser;
    //     const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    //     if (requiresAuth && !currentUser) next('/login');
    //     else if (!requiresAuth && currentUser) next('/home');
    //     else next();
    // });
export default router;