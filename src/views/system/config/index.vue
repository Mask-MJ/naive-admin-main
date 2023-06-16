<script setup lang="ts">
  import type { ConfigList } from '@/api/modules/system/types/config';
  import { useModal } from '@/components/Modal';
  import { Action, useTable } from '@/components/Table';
  import { getConfigList, delConfig, refreshCache } from '@/api/modules/system/config';
  import { columns, schemas } from './data';
  import setModal from './modal/setModal.vue';

  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: getConfigList,
    columns,
    useSearchForm: true,
    formConfig: { labelWidth: 100, schemas },
    bordered: true,
    showIndexColumn: false,
    actionColumn: {
      width: 150,
      key: 'ACTION',
      render: (row: ConfigList) =>
        h(Action, {
          actions: [
            {
              type: 'edit',
              onClick: () => openModal(true, { configId: row.configId }),
            },
            {
              type: 'del',
              onClick: async () => {
                await delConfig(row.configId);
                await reload();
              },
            },
          ],
        }),
    },
    rowKey: (rowData) => rowData.configId,
  });

  const handleAdd = () => {
    openModal(true);
  };

  const handleRefresh = async () => {
    await refreshCache();
    await reload();
  };
</script>

<template>
  <PageWrapper>
    <Table @register="registerTable">
      <template #toolbar>
        <n-button class="mr-2" type="primary" @click="handleAdd"> 新增参数 </n-button>
        <n-button type="error" @click="handleRefresh"> 刷新缓存 </n-button>
      </template>
    </Table>
    <setModal @register="registerModal" @success="reload()" />
  </PageWrapper>
</template>

<style scoped></style>
