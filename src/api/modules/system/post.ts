import type { PostList, PostParams, PostSearchParams } from './types/post';
import { defHttp } from '@/api';
enum Api {
  GetPostList = '/system/post/list', // 获取岗位列表
  SetPost = '/system/post', //岗位新增
  DeletePost = '/system/post/', //删除岗位
  ControlPost = '/system/post/',
  Export = '/system/post/export',
}
// 获取岗位列表
export const getPostList = (params: PostSearchParams) =>
  defHttp.get<PostList>({ url: Api.GetPostList, params });
// 删除岗位
export const deletePost = (params: string) => defHttp.delete({ url: Api.DeletePost + params });
// 获取设置的 Post
export const getPost = (params: string) => defHttp.get<PostList>({ url: Api.ControlPost + params });
// 新增岗位
export const addPost = (params: PostParams) => defHttp.post({ url: Api.SetPost, params });
// 修改岗位
export const setPost = (params: PostParams) => defHttp.put({ url: Api.SetPost, params });
