<script setup lang="ts">
  import type { DataTableProps } from 'naive-ui';
  import type { BasicTableProps, TableActionType } from './types';
  import Toolbars from './components/Toolbars.vue';
  import { basicProps } from './props';
  import { useLoading, useDataSource, usePagination, useColumns, useRowSelection } from './hooks';

  const attrs = useAttrs();
  const props = defineProps(basicProps);
  const emits = defineEmits(['change', 'register', 'fetch-success', 'fetch-error'] as string[]);

  const innerPropsRef = ref<Partial<BasicTableProps>>();
  const tableData = ref<Recordable[]>([]);

  // 集成表单搜索
  const formActions = {
    getFieldsValue: (): Recordable => [],
  };

  // 表格 DOM 元素
  const tableElRef = ref<DataTableProps>();

  // setTimeout(() => {
  // console.log(tableElRef.value);
  // tableElRef.value?.doCheckAll(true);
  // }, 3000);

  const getProps = computed(() => ({ ...props, ...unref(innerPropsRef) } as BasicTableProps));

  const getBindValues = computed(() => {
    return {
      ...attrs,
      ...unref(getProps),
      data: getTableData(),
      loading: unref(getLoading),
      rowKey: (tableData) => tableData[getRowKey.value],
      columns: toRaw(unref(getViewColumns)),
      pagination: getPagination(),
      checkedRowKeys: getSelectedRowKeys(),
      onUpdateCheckedRowKeys: setSelectedRowKeys,
    } as DataTableProps;
  });

  // loading hooks
  const { getLoading, setLoading } = useLoading(getProps);

  // pagination hooks
  const { getPagination, setPagination } = usePagination(getProps);
  // columns hooks
  const { getViewColumns, getColumns, setColumns, getCacheColumns } = useColumns(
    getProps,
    getPagination,
  );
  // checked hooks
  const { getSelectedRows, getSelectedRowKeys, setSelectedRowKeys, clearSelectedRowKeys } =
    useRowSelection(getProps);
  // data hooks
  const {
    getTableData,
    getRawTableData,
    getRowKey,
    setTableData,
    // fetch,
    reload,
    updateTableData,
    updateTableDataRecord,
    deleteTableDataRecord,
    insertTableDataRecord,
  } = useDataSource(
    getProps,
    {
      tableData,
      getPagination,
      setPagination,
      setLoading,
      getFieldsValue: formActions.getFieldsValue,
      clearSelectedRowKeys,
    },
    emits,
  );

  function setProps(props: Partial<BasicTableProps>) {
    innerPropsRef.value = { ...unref(innerPropsRef), ...props };
  }

  const toolbarsAction = (type: string) => {
    if (type === 'reload') {
    } else if (type === 'striped') {
    } else if (type === 'size') {
    }
  };

  const tableAction: TableActionType = {
    // 选择栏
    getSelectedRows,
    getSelectedRowKeys,
    setSelectedRowKeys,
    clearSelectedRowKeys,
    // 分页
    getPagination,
    setPagination,
    // 表格配置
    setProps,
    reload,
    setLoading,
    // expandAll,
    // collapseAll,
    emits,
    // 数据操作
    getTableData,
    setTableData,
    updateTableData,
    getRawTableData,
    getColumns,
    setColumns,
    updateTableDataRecord,
    deleteTableDataRecord,
    insertTableDataRecord,
    getCacheColumns,
  };

  defineExpose(tableAction);

  emits('register', tableAction, formActions);
</script>

<template>
  <!-- 表格内容 card -->
  <div class="basic-table">
    <!-- 表格头部 操作按钮 -->
    <div class="flex-between">
      <div class="mt-2">
        <slot name="toolbar" />
      </div>
      <Toolbars v-if="showToolbars" @table-action="toolbarsAction" />
    </div>
    <!-- 表格主体 -->
    <n-data-table ref="tableElRef" v-bind="getBindValues">
      <template v-for="item in Object.keys($slots)" #[item]="data" :key="item">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </n-data-table>
  </div>
  <!-- 列设置 -->
  <div> </div>
</template>

<style lang="scss" scoped>
  .basic-table {
    box-shadow: var(--n-box-shadow);
  }
</style>
