import { useRouter } from 'vue-router';
import type { RouteLocationRaw } from 'vue-router';
import { router as globalRouter } from './index';

/**
 * 路由跳转
 * @param inSetup - 是否在vue页面/组件的setup里面调用，在axios里面无法使用useRouter和useRoute
 */
export function useRouterPush(inSetup = true) {
  const router = inSetup ? useRouter() : globalRouter;
  const route = globalRouter.currentRoute;

  /**
   * 路由跳转
   * @param to - 需要跳转的路由
   * @param newTab - 是否在新的浏览器Tab标签打开
   */
  const routerPush = (to: RouteLocationRaw, newTab = false) =>
    newTab ? window.open(router.resolve(to).href, '_blank') : router.push(to);

  /** 返回上一级路由 */
  const routerBack = () => router.go(-1);

  /**
   * 跳转首页
   * @param newTab - 在新的浏览器标签打开
   */
  const toHome = (newTab = false) => routerPush({ name: 'Root' }, newTab);
  /**
   * 跳转登录页面
   * @param redirectUrl - 重定向地址(登录成功后跳转的地址),默认undefined表示取当前地址为重定向地址
   */
  const toLogin = (redirectUrl?: string) => {
    const routeLocation: RouteLocationRaw = {
      name: 'Login',
    };
    const redirect = redirectUrl || route.value.fullPath;
    Object.assign(routeLocation, { query: { redirect } });
    routerPush(routeLocation);
  };
  /**
   * 登录成功后跳转重定向的地址
   */
  const toLoginRedirect = () => {
    const { query } = route.value;
    if (query?.redirect) routerPush(query.redirect as string);
    else toHome();
  };
  return {
    routerPush,
    routerBack,
    toHome,
    toLogin,
    toLoginRedirect,
  };
}
