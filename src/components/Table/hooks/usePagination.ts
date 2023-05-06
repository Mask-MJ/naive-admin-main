import type { ComputedRef } from 'vue';
import type { PaginationProps } from 'naive-ui';
import type { BasicTableProps } from '../types';

import { isBoolean } from 'lodash-es';
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from '../constants';

export function usePagination(refProps: ComputedRef<BasicTableProps>) {
  const configRef = ref();
  const show = ref(true);

  watch(
    () => unref(refProps).pagination,
    (pagination) => {
      if (!isBoolean(pagination) && pagination) {
        configRef.value = { ...unref(configRef), ...(pagination ?? {}) };
      }
    },
  );

  const getPaginationInfo = computed((): PaginationProps | boolean => {
    const { pagination } = unref(refProps);
    if (!unref(show) || (isBoolean(pagination) && !pagination)) {
      return false;
    }
    return {
      pageSize: PAGE_SIZE,
      pageSizes: PAGE_SIZE_OPTIONS,
      showSizePicker: true,
      showQuickJumper: true,
      ...(isBoolean(pagination) ? {} : pagination),
      ...unref(configRef),
    };
  });
  /** 获取分页配置信息 */
  const getPagination = () => unref(getPaginationInfo);
  /** 设置分页配置信息 */
  const setPagination = (info: Partial<PaginationProps> | boolean) => {
    const paginationInfo = unref(getPaginationInfo);
    if (isBoolean(info)) {
      show.value = info;
    } else {
      configRef.value = { ...(!isBoolean(paginationInfo) ? paginationInfo : {}), ...info };
    }
  };
  /** 是否展示分页 */
  const getShowPagination = () => unref(show);
  /** 设置分页是否展示 */
  const setShowPagination = async (flag: boolean) => (show.value = flag);

  return { getPagination, setPagination, getShowPagination, setShowPagination };
}
