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
]
const
    router = new VueRouter({
        routes
    })
export default router;