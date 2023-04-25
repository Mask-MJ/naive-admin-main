import type { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';
import { filter } from 'lodash-es';
import routes from '~pages';

// 白名单 不需要登录的路由
const WHITE_NAME_LIST = setupLayouts(
  filter(routes, (route) => route.meta?.noAuth) as RouteRecordRaw[],
);
export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: WHITE_NAME_LIST,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export async function setupRouter(app: App) {
  app.use(router);
}
