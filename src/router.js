import { createRouter, createWebHistory } from "vue-router"

import List from './components/ListComponent.vue'
import Save from './components/SaveComponent.vue'

const routes = [
    {
        name:'list',
        path:'/', 
        component: List
    },
    {
        name:'save',
        path:'/save/:id?', 
        component: Save
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router