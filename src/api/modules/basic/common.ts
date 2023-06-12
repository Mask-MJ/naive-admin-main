import type { UploadFileParams } from '@/api/request/types';
import { defHttp } from '@/api';
import { getAppEnvConfig } from '@/utils';

const { VITE_GLOB_UPLOAD_URL = '' } = getAppEnvConfig();

export const uploadApi = (params: UploadFileParams) =>
  defHttp.uploadFile({ url: VITE_GLOB_UPLOAD_URL }, params);
