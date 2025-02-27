import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("../layout/index.vue"),
    children: [
      {
        path: "", // 空路径
        redirect: "/fastupload", // 重定向到子路由
      },
      {
        path: "fastupload",
        name: "FastUpload",
        component: () => import("../view/fastupload/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
