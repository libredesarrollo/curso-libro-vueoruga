import { createRouter, createWebHistory } from "vue-router"

import List from './components/ListComponent.vue'
import Save from './components/SaveComponent.vue' //chan components

const routes = [
    {
        name:'list',
        path:'/', //change
        component: List
    },
    {
        name:'save',
        path:'/save/:slug?', //change
        component: Save
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router