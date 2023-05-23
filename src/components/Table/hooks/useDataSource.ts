import type { ComputedRef } from 'vue';
import type { PaginationProps } from 'naive-ui';
import type { BasicTableProps, FetchParams } from '../types';

import { isFunction, isBoolean, get, merge, isObject } from 'lodash-es';
import { useTimeoutFn } from '@/hooks/useTimeout';
import { FETCH_SETTING, PAGE_SIZE } from '../constants';

interface ActionType {
  tableData: Ref<Recordable[]>;
  getPagination: () => boolean | PaginationProps;
  setPagination: (info: Partial<PaginationProps>) => void;
  setLoading: (loading: boolean) => void;
  getPathsValue: () => Recordable;
  clearSelectedRowKeys: () => void;
}

export function useDataSource(
  propsRef: ComputedRef<BasicTableProps>,
  {
    tableData,
    getPagination,
    setPagination,
    setLoading,
    getPathsValue,
    clearSelectedRowKeys,
  }: ActionType,
  emits: EmitType,
) {
  // 本地数据源
  const dataSourceRef = ref();
  // 远程数据源
  const rawDataSourceRef = ref<Recordable>({});

  watchEffect(() => {
    tableData.value = unref(dataSourceRef);
  });
  watch(
    () => unref(propsRef).data,
    () => {
      const { data, api } = unref(propsRef);
      !api && data && (dataSourceRef.value = data);
    },
    { immediate: true },
  );

  // 分页变化,清空选中项
  function handleTableChange(pagination: PaginationProps) {
    const { clearSelectOnPageChange } = unref(propsRef);
    if (clearSelectOnPageChange) {
      clearSelectedRowKeys();
    }
    setPagination(pagination);
    fetch({});
  }
  // 获取数据的id
  const getRowKey = computed(() => propsRef.value.rowKey);
  // 获取数据源
  const getDataSourceRef = computed(() => unref(dataSourceRef));
  // 更新某条数据
  async function updateTableData(index: number, key: string, value: any) {
    const record = dataSourceRef.value[index];
    if (record) {
      record[key] = value;
    }
    return record;
  }
  // 根据唯一的 rowKey 更新指定行的数据.可用于不刷新整个表格而局部更新数据
  function updateTableDataRecord(
    rowKey: string | number,
    record: Recordable,
  ): Recordable | undefined {
    const row = findTableDataRecord(rowKey);
    if (row) {
      for (const field in row) {
        if (Reflect.has(record, field)) row[field] = record[field];
      }
      return row;
    }
  }
  /** 根据唯一的rowKey 动态删除指定行的数据.可用于不刷新整个表格而局部更新数据 */
  function deleteTableDataRecord(rowKey: string | number | string[] | number[]) {
    if (!dataSourceRef.value || dataSourceRef.value.length == 0) return;
    const rowKeyName = unref(getRowKey);
    if (!rowKeyName) return;
    const rowKeys = !Array.isArray(rowKey) ? [rowKey] : rowKey;

    function deleteRow(data: any, key: string | number) {
      const row: { index: number; data: [] } = findRow(data, key);
      if (row === null || row.index === -1) {
        return;
      }
      row.data.splice(row.index, 1);

      function findRow(data: any, key: string | number): any {
        if (data === null || data === undefined) {
          return null;
        }
        for (let i = 0; i < data.length; i++) {
          const row = data[i];
          let targetKeyName: any = rowKeyName;
          if (isFunction(rowKeyName)) {
            targetKeyName = rowKeyName(row);
          }
          if (row[targetKeyName] === key) {
            return { index: i, data };
          }
          if (row.children?.length > 0) {
            const result = findRow(row.children, key);
            if (result != null) {
              return result;
            }
          }
        }
        return null;
      }
    }

    for (const key of rowKeys) {
      deleteRow(dataSourceRef.value, key);
      deleteRow(unref(propsRef).data, key);
    }
    setPagination({ itemCount: unref(propsRef).data?.length });
  }

  /** 可根据传入的 index 值决定插入数据行的位置，不传则是顺序插入，可用于不刷新整个表格而局部更新数据 */
  function insertTableDataRecord(
    record: Recordable | Recordable[],
    index?: number,
  ): Recordable[] | undefined {
    index = index ?? dataSourceRef.value?.length;
    const _record = isObject(record) ? [record as Recordable] : (record as Recordable[]);
    unref(dataSourceRef).splice(index, 0, ..._record);
    return unref(dataSourceRef);
  }

  const findTableDataRecord = (rowKey: string | number) => {
    if (!dataSourceRef.value || dataSourceRef.value.length == 0) return;

    const rowKeyName = unref(getRowKey) as unknown as string;
    if (!rowKeyName) return;

    const { childrenKey = 'children' } = unref(propsRef);

    const findRow = (array: any[]) => {
      let ret;
      array.some(function iter(r) {
        if (Reflect.has(r, rowKeyName) && r[rowKeyName] === rowKey) {
          ret = r;
          return true;
        }
        return r[childrenKey] && r[childrenKey].some(iter);
      });
      return ret as any;
    };

    return findRow(dataSourceRef.value);
  };

  const fetch = async (opt?: FetchParams): Promise<any> => {
    const { api, searchInfo, fetchSetting, beforeFetch, afterFetch, useSearchForm, pagination } =
      unref(propsRef);
    if (!api || !isFunction(api)) return;
    try {
      setLoading(true);
      const { pageField, sizeField, listField, totalField } = Object.assign(
        {},
        FETCH_SETTING,
        fetchSetting,
      );
      let pageParams: Recordable = {};

      const { page = 1, pageSize = PAGE_SIZE } = unref(getPagination()) as PaginationProps;

      if ((isBoolean(pagination) && !pagination) || isBoolean(getPagination())) {
        pageParams = {};
      } else {
        pageParams[pageField] = (opt && opt.page) || page;
        pageParams[sizeField] = pageSize;
      }

      let params: Recordable = merge(
        pageParams,
        useSearchForm ? getPathsValue() : {},
        searchInfo,
        opt?.searchInfo ?? {},
      );
      if (beforeFetch && isFunction(beforeFetch)) {
        params = (await beforeFetch(params)) || params;
      }

      const res = await api(params);
      rawDataSourceRef.value = res;

      const isArrayResult = Array.isArray(res);

      let resultItems: Recordable[] = isArrayResult ? res : get(res, listField);
      const resultPageCount: number = isArrayResult ? res.length : get(res, totalField);
      // 假如数据变少，导致总页数变少并小于当前选中页码，通过getPaginationRef获取到的页码是不正确的，需获取正确的页码再次执行
      if (Number(resultPageCount)) {
        const pageTotal = Math.ceil(resultPageCount / pageSize);
        if (page > pageTotal) {
          setPagination({ page: pageTotal });
          return await fetch(opt);
        }
      }

      if (afterFetch && isFunction(afterFetch)) {
        resultItems = (await afterFetch(resultItems)) || resultItems;
      }
      dataSourceRef.value = resultItems;
      setPagination({ itemCount: resultPageCount || 0 });
      if (opt && opt.page) {
        setPagination({ page: opt.page || 1 });
      }
      emits('fetch-success', {
        items: unref(resultItems),
        itemCount: resultPageCount,
      });
      return resultItems;
    } catch (error) {
      emits('fetch-error', error);
      dataSourceRef.value = [];
      setPagination({ itemCount: 0 });
    } finally {
      setLoading(false);
    }
  };

  const setTableData = <T = Recordable>(values: T[]) => {
    dataSourceRef.value = values;
  };
  /**
   * @description: 获取表格数据
   */
  const getTableData = <T = Recordable>() => getDataSourceRef.value as T[];

  const getRawTableData = <T = Recordable>() => rawDataSourceRef.value as T;

  const reload = async (opt?: FetchParams) => await fetch(opt);

  onMounted(() => {
    useTimeoutFn(() => {
      unref(propsRef).immediate && fetch();
    }, 16);
  });
  return {
    getDataSourceRef,
    getTableData,
    getRawTableData,
    getRowKey,
    setTableData,
    fetch,
    reload,
    updateTableData,
    updateTableDataRecord,
    deleteTableDataRecord,
    insertTableDataRecord,
    findTableDataRecord,
    handleTableChange,
  };
}
