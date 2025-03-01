import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Index",
    component: () => import("../layout/index.vue"),
    children: [
      {
        path: "",
        redirect: "/fu",
      },
      {
        path: "fu",
        name: "FastUpload",
        component: () => import("../view/fu/index.vue"),
      },
      {
        path: "cm",
        name: "Casemanagement",
        component: () => import("../view/cm/index.vue"),
      },
      {
        path: "dd",
        name: "Diseasediagnosis",
        component: () => import("../view/dd/index.vue"),
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;