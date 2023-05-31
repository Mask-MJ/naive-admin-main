<script setup lang="ts">
  import type { CompanyList } from '@/api/modules/cooperation/types/company';

  import { Action, useTable } from '@/components/Table';
  import { getCompanyList, deleteCompany } from '@/api/modules/cooperation/company';
  import { columns, schemas } from './data';
  import { useModal } from '@/components/Modal';
  import setModal from './modal/setModal.vue';

  const router = useRouter();
  const [registerSetModal, { openModal: openSetModel }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: getCompanyList,
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
              icon: 'i-carbon:user-admin',
              tooltipProps: { content: '详情' },
              buttonProps: {
                type: 'warning',
                onClick: () => {
                  router.push(`/cooperation/companyDetail/${row.id}`);
                },
              },
            },
            {
              type: 'del',
              onClick: async () => {
                await deleteCompany(row.id);
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
      <n-button type="primary" @click="openSetModel(true)"> 新增 </n-button>
    </template>
  </Table>
  <setModal @register="registerSetModal" @success="reload()" />
</template>
