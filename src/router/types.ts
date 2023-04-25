import 'vue-router';
import type { RouteMeta } from 'vue-router';
import type { VNodeChild } from 'vue';

declare module 'vue-router' {
  interface RouteMeta {
    // 路由标题
    title: string;
    /** 缓存页面 */
    keepAlive?: boolean;
    // 图标
    icon: string;
    // 是否展示
    show: boolean;
    // 外链
    href?: string;
    // 路由顺序
    order: number;
    // 父级名称
    parentName?: string;
    // 是否固定 不可关闭
    affix?: boolean;
  }
}

export interface Menu {
  key: string;
  label: string | (() => VNodeChild);
  orderNo?: number;
  icon: () => VNodeChild;
  meta?: Partial<RouteMeta>;
  show: boolean;
  children?: Menu[];
}
