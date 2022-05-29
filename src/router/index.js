import Vue from 'vue'
import VueRouter from 'vue-router'
import Guard from '../services/middleware';
import HomePageView from "@/views/HomePageView";
import LoginView from "@/views/LoginView";
import ODebit from "@/components/organisms/ODebit";
import PageNotFound from "@/views/PageNotFound";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/homepage',
    name: 'home',
    component: HomePageView,
    beforeEnter: Guard.auth
  },
  {
    path: '/debit',
    name: 'debit',
    component: ODebit
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/:catchAll(.*)*',
    name: 'PageNotFound',
    component: PageNotFound
  },
]

const router = new VueRouter({
  routes
})

export default router
