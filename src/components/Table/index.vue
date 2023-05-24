<script setup lang="ts">
  import type { DataTableProps } from 'naive-ui';
  import type { BasicTableProps, TableActionType, TableSize } from './types';
  import Toolbars from './components/Toolbars.vue';
  import { basicProps } from './props';
  import {
    useLoading,
    useDataSource,
    usePagination,
    useColumns,
    useRowSelection,
    useTableForm,
  } from './hooks';

  import { useForm } from '@/components/Form';

  const slots = useSlots();
  // const attrs = useAttrs();
  const props = defineProps(basicProps);
  const emits = defineEmits(['change', 'register', 'fetch-success', 'fetch-error'] as string[]);

  const innerPropsRef = ref<Partial<BasicTableProps>>();
  const tableData = ref<Recordable[]>([]);
  const [registerForm, formActions] = useForm();

  // // 集成表单搜索
  // const formActions = {
  //   getFieldsValue: (): Recordable => [],
  // };

  // 表格 DOM 元素
  const tableElRef = ref<DataTableProps>();

  // setTimeout(() => {
  // console.log(tableElRef.value);
  // tableElRef.value?.doCheckAll(true);
  // }, 3000);

  const getProps = computed(() => ({ ...props, ...unref(innerPropsRef) } as BasicTableProps));
  const getBindValues = computed(() => {
    return {
      ...unref(getProps),
      data: getTableData(),
      loading: unref(getLoading),
      rowKey: unref(getRowKey),
      columns: toRaw(unref(getViewColumns)),
      pagination: getPagination(),
      checkedRowKeys: getSelectedRowKeys(),
      onUpdateCheckedRowKeys: setSelectedRowKeys,
    } as unknown as BasicTableProps;
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
    fetch,
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
      getPathsValue: formActions.getPathsValue,
      clearSelectedRowKeys,
    },
    emits,
  );
  //页码切换
  const updatePage = (page: number) => {
    setPagination({ page: page });
    reload();
  };

  //分页数量切换
  const updatePageSize = (size: number) => {
    setPagination({ page: 1, pageSize: size });
    reload();
  };

  function setProps(props: Partial<BasicTableProps>) {
    innerPropsRef.value = { ...unref(innerPropsRef), ...props };
  }

  const toolbarsAction = (data: { type: string; value: string }) => {
    if (data.type === 'reload') {
      reload();
    } else if (data.type === 'striped') {
      setProps({ striped: data.value === 'true' ? true : false });
    } else if (data.type === 'size') {
      setProps({ size: data.value as TableSize });
    }
  };

  const { getFormProps, replaceFormSlotKey, getFormSlotKeys, handleSearchInfoChange } =
    useTableForm(getProps, slots, fetch, getLoading);

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
  <div class="h-full flex flex-col">
    <!-- 搜索表单 -->
    <dark-mode-container
      v-if="getBindValues.useSearchForm"
      class="p-2"
      :class="getProps.outermost ? 'rounded-lg shadow-xl mb-4' : ''"
    >
      <Form
        ref="formRef"
        submit-on-reset
        v-bind="getFormProps"
        :show-action-button-group="true"
        :is-auto-collapsed="true"
        :table-action="tableAction"
        @register="registerForm"
        @submit="handleSearchInfoChange"
      >
        <template v-for="item in getFormSlotKeys" #[replaceFormSlotKey(item)]="data">
          <slot :name="item" v-bind="data || {}"></slot>
        </template>
      </Form>
    </dark-mode-container>
    <!-- 表格内容 card -->
    <dark-mode-container
      class="p-2 flex-1"
      :class="getProps.outermost ? 'rounded-lg shadow-xl mb-4' : ''"
    >
      <!-- 表格头部 操作按钮 -->
      <div class="flex-between mb-2">
        <div>
          <slot name="toolbar" />
        </div>
        <Toolbars v-if="showToolbars" v-bind="getProps" @table-action="toolbarsAction" />
      </div>
      <!-- 表格主体 -->
      <n-data-table
        ref="tableElRef"
        class="n-data-table"
        v-bind="getBindValues"
        @update:page="updatePage"
        @update:page-size="updatePageSize"
        @update:checked-row-keys="setSelectedRowKeys"
      >
        <template v-for="item in Object.keys($slots)" #[item]="data" :key="item">
          <slot :name="item" v-bind="data || {}"></slot>
        </template>
      </n-data-table>
    </dark-mode-container>
  </div>
</template>

<style lang="scss" scoped>
  .n-data-table {
    height: calc(100% - 48px);
  }
</style>
