<script setup lang="ts">
  import type { MenuList } from '@/api/modules/system/types/menu';
  import { useModal } from '@/components/Modal';
  import { Action, useTable } from '@/components/Table';
  import { getMenuList, deleteMenu } from '@/api/modules/system/menu';
  import { columns, schemas } from './data';
  import setModal from './modal/setModal.vue';

  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: getMenuList,
    columns,
    useSearchForm: true,
    formConfig: { labelWidth: 100, schemas },
    bordered: true,
    fetchSetting: { listField: 'data' },
    showIndexColumn: false,
    pagination: false,
    rowKey: (rowData) => rowData.menuId,
    actionColumn: {
      width: 150,
      title: '操作',
      flag: 'ACTION',
      key: 'ACTION',
      render: (rowData: MenuList) =>
        h(Action, {
          actions: [
            {
              type: 'edit',
              onClick: () => openModal(true, rowData),
            },
            {
              type: 'del',
              onClick: async () => {
                await deleteMenu(rowData.menuId);
                await reload();
              },
            },
          ],
        }),
    },
  });
  const handleAdd = () => {
    openModal(true);
  };
</script>

<template>
  <PageWrapper>
    <Table @register="registerTable">
      <template #toolbar>
        <n-button class="mr-2" type="primary" @click="handleAdd"> 新增菜单 </n-button>
      </template>
    </Table>
    <setModal @register="registerModal" @success="reload()" />
  </PageWrapper>
</template>

<style scoped></style>
