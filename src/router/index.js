import { createRouter, createWebHistory } from 'vue-router';
import Log from '../components/Log.vue'

const routes = [
    {
        path: "/",
        name: "login",
        component: Log, 
    },
    {
        path: "/rate",
        name: "rater",
        component: () => import('../components/Rate.vue'), 
    },
    {
        path: "/ratings",
        name: "rating",
        component: () => import('../components/CallRatings.vue'), 
    }, 
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router