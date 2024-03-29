import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "@/firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "inicio",
    component: () =>
      import(/* webpackChunkName: "inicio" */ "../views/Inicio.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/editar/:id",
    name: "editar",
    component: () =>
      import(/* webpackChunkName: "editar" */ "../views/Editar.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/agregar",
    name: "agregar",
    component: () =>
      import(/* webpackChunkName: "agregar" */ "../views/Agregar.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/registro",
    name: "registro",
    component: () =>
      import(/* webpackChunkName: "registro" */ "../views/Registro.vue"),
  },
  {
    path: "/acceso",
    name: "acceso",
    component: () =>
      import(/* webpackChunkName: "acceso" */ "../views/Acceso.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const usuario = auth.currentUser;
    if (!usuario) {
      next({ path: "/acceso" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
