<script setup lang="ts">
  import type { DeptList } from '@/api/modules/system/types/dept';
  import { useModal } from '@/components/Modal';
  import { Action, useTable } from '@/components/Table';
  import { getDeptList, deleteDept } from '@/api/modules/system/dept';
  import { columns, schemas } from './data';
  import setModal from './modal/setModal.vue';

  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: getDeptList,
    columns,
    useSearchForm: true,
    formConfig: { labelWidth: 100, schemas },
    bordered: true,
    fetchSetting: { listField: 'data' },
    showIndexColumn: false,
    actionColumn: {
      width: 150,
      key: 'ACTION',
      render: (row: DeptList) =>
        h(Action, {
          actions: [
            {
              type: 'edit',
              onClick: () => openModal(true, { deptId: row.deptId }),
            },
            {
              type: 'del',
              onClick: async () => {
                await deleteDept(row.deptId);
                await reload();
              },
            },
          ],
        }),
    },
    rowKey: (rowData) => rowData.deptId,
  });
  const handleAdd = () => {
    openModal(true);
  };
</script>

<template>
  <PageWrapper>
    <Table @register="registerTable">
      <template #toolbar>
        <n-button class="mr-2" type="primary" @click="handleAdd"> 新增部门 </n-button>
      </template>
    </Table>
    <setModal @register="registerModal" @success="reload()" />
  </PageWrapper>
</template>

<style scoped></style>
