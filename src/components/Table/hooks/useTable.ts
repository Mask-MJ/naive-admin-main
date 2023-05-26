import type { BasicTableProps, TableActionType, FetchParams, BasicColumn } from '../types';
import type { PaginationProps } from 'naive-ui';
import type { DynamicProps } from '#/utils';
import type { FormActionType } from '@/components/Form';
import type { WatchStopHandle } from 'vue';
import { getDynamicProps } from '@/utils/tools';
import { ref, onUnmounted, unref, watch, toRaw } from 'vue';
import { isProdMode } from '@/utils/env';

type Props = Partial<DynamicProps<BasicTableProps>>;

interface UseTableMethod extends TableActionType {
  getForm: () => FormActionType;
}

export function useTable(tableProps?: Props): [
  (instance: TableActionType, formInstance: UseTableMethod) => void,
  TableActionType & {
    getForm: () => FormActionType;
  },
] {
  const tableRef = ref<Nullable<TableActionType>>(null);
  const loadedRef = ref<Nullable<boolean>>(false);
  const formRef = ref<Nullable<UseTableMethod>>(null);
  let stopWatch: WatchStopHandle;

  function register(instance: TableActionType, formInstance: UseTableMethod) {
    isProdMode() &&
      onUnmounted(() => {
        tableRef.value = null;
        loadedRef.value = null;
      });

    if (unref(loadedRef) && isProdMode() && instance === unref(tableRef)) return;

    tableRef.value = instance;
    formRef.value = formInstance;
    tableProps && instance.setProps(getDynamicProps(tableProps));
    loadedRef.value = true;
    stopWatch?.();

    stopWatch = watch(
      () => tableProps,
      () => {
        tableProps && instance.setProps(getDynamicProps(tableProps));
      },
      { immediate: true, deep: true },
    );
  }

  function getTableInstance(): TableActionType {
    const table = unref(tableRef);
    if (!table) {
      console.error(
        'The table instance has not been obtained yet, please make sure the table is presented when performing the table operation!',
      );
    }
    return table as TableActionType;
  }

  const methods: UseTableMethod = {
    reload: async (opt?: FetchParams) => {
      return await getTableInstance().reload(opt);
    },
    setProps: (props: Partial<BasicTableProps>) => {
      getTableInstance().setProps(props);
    },
    setLoading: (loading: boolean) => {
      getTableInstance().setLoading(loading);
    },
    getSelectedRows: () => {
      return toRaw(getTableInstance().getSelectedRows());
    },
    getTableData: () => {
      return getTableInstance().getTableData();
    },
    getRawTableData: () => {
      return getTableInstance().getRawTableData();
    },
    getColumns: () => {
      const columns = getTableInstance().getColumns() || [];
      return toRaw(columns);
    },
    setColumns: (columns: BasicColumn[] | string[]) => {
      getTableInstance().setColumns(columns);
    },
    setTableData: (values: any[]) => {
      return getTableInstance().setTableData(values);
    },
    setPagination: (info: Partial<PaginationProps> | boolean) => {
      return getTableInstance().setPagination(info);
    },
    getSelectedRowKeys: () => {
      return toRaw(getTableInstance().getSelectedRowKeys());
    },
    clearSelectedRowKeys: () => {
      getTableInstance().clearSelectedRowKeys();
    },
    setSelectedRowKeys: (keys: (string | number)[]) => {
      getTableInstance().setSelectedRowKeys(keys);
    },
    getPagination: () => {
      return getTableInstance().getPagination();
    },
    updateTableData: (index: number, key: string, value: any) => {
      return getTableInstance().updateTableData(index, key, value);
    },
    deleteTableDataRecord: (rowKey: string | number | string[] | number[]) => {
      return getTableInstance().deleteTableDataRecord(rowKey);
    },
    insertTableDataRecord: (record: Recordable | Recordable[], index?: number) => {
      return getTableInstance().insertTableDataRecord(record, index);
    },
    updateTableDataRecord: (rowKey: string | number, record: Recordable) => {
      return getTableInstance().updateTableDataRecord(rowKey, record);
    },
    // getRowSelection: () => {
    //   return toRaw(getTableInstance().getRowSelection());
    // },
    getCacheColumns: () => {
      return toRaw(getTableInstance().getCacheColumns());
    },
    getForm: () => {
      return unref(formRef) as unknown as FormActionType;
    },
    // expandAll: () => {
    //   getTableInstance().expandAll();
    // },
    // collapseAll: () => {
    //   getTableInstance().collapseAll();
    // },
  };

  return [register, methods];
}
