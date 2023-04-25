import type { RouteRecordRaw } from 'vue-router';
import { cloneDeep, find, isArray } from 'lodash-es';
import { RouterLink } from 'vue-router';
import type { Menu } from '@/router/types';
import type { RouteList } from '@/api/modules/basic/types/user';
import pages from '~pages';

// 把路由对象转换为菜单对象
export function transformRouteToMenu(routeList: RouteList[], newRoutes: RouteRecordRaw[]): Menu[] {
  const menuList: Menu[] = [];
  // 判断后台返回的路由对象是否在文件路由中存在
  function getLabel(route: RouteList) {
    // 获取拼接的 route.name 来和 真实文件路由列表对比
    if (route.children && route.children.length) {
      return route.meta.title ?? route.name;
    } else if (route.meta.link) {
      return () =>
        h('a', { href: route.meta.link, target: '_blank' }, route.meta.title ?? route.name);
    } else {
      const path = route.path;
      const hasRoute = find(
        newRoutes,
        (n) => n.path.toLocaleLowerCase() === path.toLocaleLowerCase(),
      );
      return () =>
        h(
          RouterLink,
          { to: { path: hasRoute ? hasRoute.path : '' } },
          { default: () => route.meta.title ?? route.name },
        );
    }
  }

  function recursionRoutes(routes: RouteList[], parentTree?: Menu) {
    routes.forEach((route) => {
      const menu: Menu = {
        label: getLabel(route),
        key: route.path.toLocaleLowerCase(),
        show: !route.meta.hidden,
        icon: () => h('i', { class: `i-${route.meta.icon}` }),
      };
      if (parentTree) {
        parentTree.children ? parentTree.children.push(menu) : (parentTree.children = [menu]);
      } else {
        menu.label = route.meta.title ?? route.name;
        menuList.push(menu);
      }
      route.children && recursionRoutes(route.children, menu);
    });
  }
  recursionRoutes(routeList);
  return menuList;
}

// 扁平化路由 并且和文件路由匹配
export function flatMapRoutes(RouteList: RouteList[]) {
  const routerStore = useRouterStore();
  const routes = cloneDeep(RouteList);
  const newRoutes: RouteRecordRaw[] = [];
  const cacheList: string[] = [];
  function deptRoutes(routes: RouteList[] = []) {
    routes.forEach((route) => {
      const newRoute = find(pages, (n) => n.path === route.path);
      if (newRoute) {
        newRoute.meta = route.meta;
        route.meta.keepAlive && cacheList.push(newRoute.name as string);
        newRoutes.push(newRoute);
      }
      isArray(route.children) && deptRoutes(route.children);
    });
  }
  deptRoutes(routes);
  routerStore.setCacheRoutes(cacheList);
  return newRoutes;
}
