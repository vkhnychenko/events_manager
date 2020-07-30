import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store/index'

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    meta: { layout: "empty" },
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: { layout: "empty" },
    component: () => import("@/views/Register.vue"),
  },
  {
    path: "/",
    name: "create",
    meta: { layout: "main", auth: true },
    component: () => import("@/views/Create.vue"),
  },
  {
    path: '/list',
    name: 'list',
    meta: { layout: "main", auth: true },
    component: ()=> import ('../views/List.vue')
  },
  {
    path: '/event/:id',
    name: 'event',
    meta: { layout: "main", auth: true },
    component: ()=> import ('../views/Event.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requireAuth = (to.matched.some((r) => r.meta.auth) &&  store.getters.isAuthenticated) ||
   !to.matched.some(r => r.meta.auth);
   console.log(requireAuth)
  if (requireAuth) {
    next();
  } else {
    next("/login");
  }
});

export default router;
