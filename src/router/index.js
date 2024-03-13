import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/dashboard/Dashboard.vue";
import CreateBarang from "../views/dashboard/CreateBarang.vue";
import EditBarang from "../views/dashboard/EditBarang.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/create-barang",
      name: "createbarang",
      component: CreateBarang,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/edit-barang/:id",
      name: "editbarang",
      component: EditBarang,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !localStorage.getItem("token")) {
    return { name: "login" };
  }
});

export default router;
