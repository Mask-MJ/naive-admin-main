import { i18n } from '@/locales';

export function checkStatus(status: number, msg: string): string {
  const { t } = i18n.global;
  let errMessage = '';

  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;
    case 401:
      errMessage = msg || t('api.errMsg401');
      break;
    case 403:
      errMessage = t('api.errMsg403');
      break;
    // 404请求不存在
    case 404:
      errMessage = t('api.errMsg404');
      break;
    case 405:
      errMessage = t('api.errMsg405');
      break;
    case 408:
      errMessage = t('api.errMsg408');
      break;
    case 500:
      errMessage = t('api.errMsg500');
      break;
    case 501:
      errMessage = t('api.errMsg501');
      break;
    case 502:
      errMessage = t('api.errMsg502');
      break;
    case 503:
      errMessage = t('api.errMsg503');
      break;
    case 504:
      errMessage = t('api.errMsg504');
      break;
    case 505:
      errMessage = t('api.errMsg505');
      break;
    default:
      errMessage = t('api.errMsg');
  }

  return errMessage || '';
}
