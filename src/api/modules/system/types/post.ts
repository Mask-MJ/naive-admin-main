export interface PostList {
  status: string;
  postId: string;
  postSort: number;
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
