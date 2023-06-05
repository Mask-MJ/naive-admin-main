<script setup lang="ts">
  import type { CompanyList } from '@/api/modules/cooperation/types/company';

  import { Action, useTable } from '@/components/Table';
  import { getAppList, deleteApp } from '@/api/modules/cooperation/application';
  import { columns, schemas } from './data';
  import { useModal } from '@/components/Modal';
  import setModal from './modal/setModal.vue';
  import setGroupModal from './modal/setGroupModal.vue';
  import detailModal from './modal/detailModal.vue';

  const [registerSetModal, { openModal: openSetModel }] = useModal();
  const [registerDetailModal, { openModal: openDetailModel }] = useModal();
  const [registerGroupModal, { openModal: openGroupModel }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: getAppList,
    columns,
    useSearchForm: true,
    formConfig: { schemas },
    rowKey: (rowData) => rowData.id,
    actionColumn: {
      width: 200,
      key: 'ACTION',
      render: (row: CompanyList) =>
        h(Action, {
          actions: [
            { type: 'edit', onClick: () => openSetModel(true, row) },
            {
              icon: 'i-carbon:view',
              tooltipProps: { content: '详情' },
              buttonProps: {
                type: 'warning',
                onClick: () => openDetailModel(true, row),
              },
            },
            {
              type: 'del',
              onClick: async () => {
                await deleteApp(row.id);
                await reload();
              },
            },
          ],
        }),
    },
  });
</script>

<template>
  <Table @register="registerTable">
    <template #toolbar>
      <n-space>
        <n-button type="primary" @click="openSetModel(true)"> 新增 </n-button>
        <n-button type="success" @click="openGroupModel(true)"> 分组管理 </n-button>
      </n-space>
    </template>
  </Table>
  <setModal @register="registerSetModal" @success="reload()" />
  <setGroupModal @register="registerGroupModal" @success="reload()" />
  <detailModal @register="registerDetailModal" />
</template>
