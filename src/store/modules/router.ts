import type { RouteRecordRaw } from 'vue-router';
import { defineStore } from 'pinia';
import type { RouterState } from '../types';
import { flatMapRoutes, transformRouteToMenu } from '../helper/routers-helper';
import type { Menu } from '@/router/types';

import { i18n } from '@/locales';
import { getMenuList } from '@/api/modules/basic/user';

export const useRouterStore = defineStore('router-store', {
  state: (): RouterState => ({
    isDynamicAddedRoute: false,
    menuList: [],
    cacheRoutes: [],
  }),
  actions: {
    setMenuList(list: Menu[]) {
      this.menuList = list;
    },
    setCacheRoutes(list: string[]) {
      this.cacheRoutes = list;
    },
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },
    resetState(): void {
      this.isDynamicAddedRoute = false;
      this.menuList = [];
    },
    // 构建路由
    async buildRoutesAction(): Promise<RouteRecordRaw[]> {
      const { t } = i18n.global;
      // 多语言文件是异步加载, 监听加载完成再调用
      watchEffect(() => {
        Object.keys(i18n.global.messages.value).length &&
          window.$message.loading(t('app.menuLoading'));
      });
      // 获取后台路由
      const routeList = await getMenuList();
      // 后台路由列表转前端路由
      const newRoutes = flatMapRoutes(routeList);
      // 路由列表转换菜单列表
      this.menuList = transformRouteToMenu(routeList, newRoutes);
      return newRoutes;
    },
  },
});
