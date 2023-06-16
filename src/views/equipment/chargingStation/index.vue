<script setup lang="ts">
  import type { StationList } from '@/api/modules/equipment/types/chargingStation';
  import { Action, useTable } from '@/components/Table';
  import { useModal } from '@/components/Modal';
  import { columns, schemas } from './data';
  import { getStationList, deleteStation } from '@/api/modules/equipment/chargingStation';

  import setModal from './modal/setModal.vue';
  import detailModal from './modal/detailModal.vue';
  import operateModal from './modal/operateModal.vue';

  const [registerSetModal, { openModal: openSetModel }] = useModal();
  const [registerDetailModal, { openModal: openDetailModel }] = useModal();
  const [registerOperateModal, { openModal: openOperateModel }] = useModal();

  const [registerTable, { reload }] = useTable({
    api: getStationList,
    columns,
    useSearchForm: true,
    formConfig: { labelWidth: 100, schemas },
    bordered: true,
    actionColumn: {
      width: 220,
      key: 'ACTION',
      render: (row: StationList) =>
        h(Action, {
          actions: [
            { type: 'edit', onClick: () => openSetModel(true, row) },
            {
              icon: 'i-carbon:view',
              tooltipProps: { content: '详情' },
              buttonProps: { type: 'success', onClick: () => openDetailModel(true, row) },
            },
            {
              icon: 'i-carbon:chat-operational',
              tooltipProps: { content: '运营设置' },
              buttonProps: { type: 'info', onClick: () => openOperateModel(true, row) },
            },
            {
              type: 'del',
              onClick: async () => {
                await deleteStation(row.id);
                await reload();
              },
            },
          ],
        }),
    },
    rowKey: (rowData) => rowData.userId,
  });
</script>

<template>
  <PageWrapper>
    <Table @register="registerTable">
      <template #toolbar>
        <n-button class="mr-2" type="primary" @click="openSetModel(true)"> 新增 </n-button>
      </template>
    </Table>
    <setModal @register="registerSetModal" @success="reload()" />
    <detailModal @register="registerDetailModal" />
    <operateModal @register="registerOperateModal" />
  </PageWrapper>
</template>
