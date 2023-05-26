<script setup lang="ts">
  import type { DictList } from '@/api/system/types/dict';
  import { useModal } from '@/components/Modal';
  import { TableAction, useTable } from '@/components/Table';
  import { columns, schemas } from './data';
  import { getDictDataList, deleteDictDataList } from '@/api/system/dict';
  import { useGo } from '@/hooks/usePage';
  import { find } from 'lodash';
  import setModal from './modal/setModal.vue';

  const props = defineProps({ id: { type: String } });

  const go = useGo();
  const router = useRouter();
  const { removeTab } = useMultipleTabStore();
  const getSchemas = () => {
    const data = find(schemas, ['path', 'dictType']);
    data!.defaultValue = props.id;
    return schemas;
  };

  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: getDictDataList,
    columns,
    showIndexColumn: false,
    searchInfo: { isAsc: 'asc', orderByColumn: 'dictSort' },
    useSearchForm: true,
    formConfig: { labelWidth: 100, schemas: getSchemas() },
    bordered: true,
    rowKey: (rowData) => rowData.dictCode,
    actionColumn: {
      width: 150,
      title: '操作',
      flag: 'ACTION',
      key: 'ACTION',
      render: (rowData: DictList) =>
        h(TableAction, {
          actions: [
            {
              type: 'primary',
              icon: 'i-ant-design:form-outlined',
              tooltip: '编辑',
              onClick: () => {
                openModal(true, { isUpdate: true, rowData });
              },
            },
            {
              type: 'error',
              icon: 'i-ant-design:delete-outlined',
              label: '是否确认删除',
              popConfirm: {
                showIcon: false,
                positiveButtonProps: { type: 'error' },
                onPositiveClick: async () => {
                  await deleteDictDataList(rowData.dictCode);
                  window.$message.success('删除成功');
                  await reload();
                },
              },
            },
          ],
        }),
    },
  });

  const handleAdd = () => {
    openModal(true, { isUpdate: false, dictType: props.id });
  };
  const handleClose = async () => {
    await removeTab(router.currentRoute.value.fullPath);
    go('/system/dict');
  };
</script>

<template>
  <Table @register="registerTable">
    <template #toolbar>
      <n-button class="mr-2" type="primary" @click="handleAdd"> 新增 </n-button>
      <n-button type="error" @click="handleClose">关闭</n-button>
    </template>
  </Table>
  <setModal @register="registerModal" @success="reload()" />
</template>

<style scoped></style>
