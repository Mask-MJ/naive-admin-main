<script setup lang="ts">
  import type { GroupList } from '@/api/modules/operation/types/group';

  import { Action, useTable } from '@/components/Table';
  import { getGroupList, deleteGroup } from '@/api/modules/operation/group';
  import { useModal } from '@/components/Modal';
  import { columns, schemas } from './data';
  import setModal from './modal/setModal.vue';

  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: getGroupList,
    columns,
    useSearchForm: true,
    formConfig: { schemas },
    bordered: true,
    rowKey: (rowData) => rowData.id,
    actionColumn: {
      width: 100,
      key: 'ACTION',
      render: (row: GroupList) =>
        h(Action, {
          actions: [
            { type: 'edit', onClick: () => openModal(true, row) },
            {
              type: 'del',
              onClick: async () => {
                await deleteGroup(row.id);
                await reload();
              },
            },
          ],
        }),
    },
  });
</script>

<template>
  <PageWrapper>
    <Table @register="registerTable">
      <template #toolbar>
        <n-button class="mr-2" type="primary" @click="openModal(true)"> 新增 </n-button>
      </template>
    </Table>
    <setModal @register="registerModal" @success="reload()" />
  </PageWrapper>
</template>
