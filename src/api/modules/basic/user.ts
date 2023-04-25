import type {
  GetPictureModel,
  GetUserInfoModel,
  LoginParams,
  LoginResultModel,
  RouteList,
} from './types/user';
import { defHttp } from '@/api';

enum Api {
  Login = 'system/token/login',
  GetPictureCode = 'code',
  Logout = 'system/token/logout',
  GetUserInfo = 'system/user/getInfo',
  GetMenuList = 'system/menu/getRouters',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams) {
  return defHttp.post<LoginResultModel>({ url: Api.Login, params });
}

/**
 * @description: getPictureCode
 */
export function getPictureCode() {
  return defHttp.get<GetPictureModel>({ url: Api.GetPictureCode });
}
/**
 * @description: getUserInfo
 */
export function getUserInfoAsync() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo });
}

export function getMenuList() {
  return defHttp.get<RouteList[]>({ url: Api.GetMenuList });
}

export function doLogout() {
  return defHttp.delete({ url: Api.Logout });
}
