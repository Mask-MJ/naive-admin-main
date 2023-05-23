import type { MenuList, MenuSearchParams, MenuParams } from './types/menu';

import { defHttp } from '@/api';

enum Api {
  GetMenuList = '/system/menu/getRouters',
  List = '/system/menu/list',
  Menu = '/system/menu/',
}

export const getMenuList = (params: MenuSearchParams) =>
  defHttp.get<MenuList[]>({ url: Api.List, params });

export const deleteMenu = (id: string) => defHttp.delete({ url: Api.Menu + id });
export const addMenu = (params: MenuParams) => defHttp.post({ url: Api.Menu, params });
export const setMenu = (params: MenuParams) => defHttp.put({ url: Api.Menu, params });
