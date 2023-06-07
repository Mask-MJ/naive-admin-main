export interface SearchBrandListParams {
  name: string;
}

export interface BrandList {
  createBy: string;
  createTime: string;
  id: string;
  name: string;
  updateTime: string;
}

export interface BrandListParams {
  id: string;
  name: string;
}
