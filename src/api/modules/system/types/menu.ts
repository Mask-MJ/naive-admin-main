export interface MenuList {
  menuId: string;
}

export interface MenuSearchParams {
  menuName?: string;
  status?: string;
}

export interface MenuParams {
  menuType: string;
  menuName: string;
  orderNum: number;
  path: string;
  icon: string;
}
