import Vue from 'vue'
import VueRouter from 'vue-router'
import Guard from '../services/middleware';
import HomeView from '../views/HomeView.vue'
import HomePageView from "@/views/HomePageView";
import PageNotFound from "@/views/PageNotFound";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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
    path: '/homepage',
    name: 'homepage',
    component: HomePageView,
    beforeEnter: Guard.auth,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "homepageview" */ '../views/HomePageView.vue')
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
