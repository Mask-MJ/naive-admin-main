export interface CompanySearchParams {
  name: string;
  partner: boolean;
}

export interface CompanyList {
  createBy: string;
  createTime: string;
  id: string;
  name: string;
  partner: boolean;
  updateTime: string;
}

export interface SetCompanyParams {
  id?: string;
  name?: string;
  partner: boolean;
}
