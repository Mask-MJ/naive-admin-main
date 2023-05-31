export interface PostList {
  status: string;
  postId: string;
  postSort: number;
  postCode: string;
  postName: string;
  createTime: string;
}

export interface PostSearchParams {
  postCode?: string;
  postName?: string;
  status?: string;
}

export interface PostParams {
  postName: string;
  postCode: string;
}
