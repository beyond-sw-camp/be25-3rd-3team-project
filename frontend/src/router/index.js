import { createRouter, createWebHistory } from "vue-router"

import CardPage from "../views/CardPage.vue"
import OrderManagementPage from "../views/OrderManagementPage.vue"

const routes = [
    {
        path: "/cards",
        component: CardPage
    },
    {
        path: "/orders",
        component: OrderManagementPage,
        meta: { title: "주문 관리" }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
