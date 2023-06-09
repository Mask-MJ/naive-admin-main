import type { IAxiosRetryConfig } from 'axios-retry';

export interface RequestOptions {
  // Splicing request parameters to url
  joinParamsToUrl?: boolean;
  // Format request parameter time
  formatDate?: boolean;
  // Whether to process the request result
  isTransformResponse?: boolean;
  // Whether to return native response headers
  isReturnNativeResponse?: boolean;
  // Whether to join url
  joinPrefix?: boolean;
  // Interface address, use the default apiUrl if you leave it blank
  apiUrl?: string;
  // 请求拼接路径
  urlPrefix?: string;
  // Whether to add a timestamp
  joinTime?: boolean;
  ignoreCancelToken?: boolean;
  withToken?: boolean;
  // 请求重试机制
  retryRequest?: IAxiosRetryConfig;
}

// 请求响应参数（不包含data）
export interface BasicResult {
  code: number;
  msg: string;
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends BasicResult {
  data: T;
}

// 分页请求参数
export interface ReqPage {
  pageNum: number;
  pageSize: number;
}

// 分页响应参数
export interface ResPage<T = any> extends BasicResult {
  rows: T[];
  currentPage: number;
  total: number;
  totalPage: number;
}

export type Result<T = any> = BasicResult | ResultData<T> | ResPage<T>;

export interface UploadFileParams {
  // Other parameters
  data?: Recordable;
  // File parameter interface field name
  name?: string;
  // file name
  file?: File | null;
  // file name
  filename?: string;
  [key: string]: any;
}
