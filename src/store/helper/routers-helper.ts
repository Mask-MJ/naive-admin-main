import type { RouteRecordRaw } from 'vue-router';
import type { Menu } from '@/router/types';
import type { RouteList } from '@/api/modules/basic/types/user';

import { find, filter, map, uniq } from 'lodash-es';
import { RouterLink } from 'vue-router';
import pages from '~pages';

function getFlatData(data: RouteList[], parentTree?: RouteList) {
  const flatData: Omit<RouteList, 'children'>[] = [];
  data.map((item) => {
    const { children, path, meta, ...node } = item;
    const newRoute = {
      path: (parentTree ? `${parentTree.path}/${item.path}` : path).toLowerCase(),
      meta: { id: node.id, parentId: node.parentId, ...meta },
      ...node,
    };
    flatData.push(newRoute, ...(children ? getFlatData(children, item) : []));
  });
  return flatData;
}

function treeShaking(treeData: RouteList[], ids: string[]) {
  return filter(treeData, (value) => ids.includes(value.id)).map((item) => {
    item.children && item.children.length && (item.children = treeShaking(item.children, ids));
    return item;
  });
}

// 扁平化路由 并且和文件路由匹配
export function flatMapRoutes(RouteList: RouteList[]) {
  const result = getFlatData(RouteList);
  return pages.filter((item) => find(result, (n) => n.path === item.path && (item.meta = n.meta)));
}
// 把路由对象转换为菜单对象
export function transformRouteToMenu(RouteList: RouteList[], newRoutes: RouteRecordRaw[]): Menu[] {
  // 提取出所有的父级id 和 id, 并去重
  const ids = uniq(map(newRoutes, 'meta.parentId').concat(map(newRoutes, 'meta.id')));
  const filterTree = treeShaking(RouteList, ids);
  const menuList: Menu[] = [];
  // 判断后台返回的路由对象是否在文件路由中存在
  function getLabel(route: RouteList) {
    // 获取拼接的 route.name 来和 真实文件路由列表对比
    if (route.children && route.children.length) {
      return route.meta.title ?? route.name;
    } else if (route.meta.link) {
      return () => h('a', { href: route.meta.link, target: '_blank' }, route.meta.title);
    } else {
      const path = route.path.toLocaleLowerCase();
      const hasRoute = find(newRoutes, (n) => n.path === path);
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
      parentTree && (route.path = `${parentTree.key}/${route.path}`.toLocaleLowerCase());
      const menu: Menu = {
        label: getLabel(route),
        key: route.path,
        show: !route.hidden,
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
  recursionRoutes(filterTree);
  return menuList;
}
