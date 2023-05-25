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
              icon: 'i-carbon:edit',
              tooltipProps: { content: '编辑' },
              buttonProps: {
                type: 'primary',
                onClick: () => openModal(true, { configId: row.configId }),
              },
            },
            {
              icon: 'i-carbon:delete',
              tooltipProps: { content: '删除' },
              buttonProps: { type: 'error' },
              popConfirmProps: {
                content: '是否确认删除',
                onPositiveClick: async () => {
                  await delConfig(row.configId);
                  window.$message.success('删除成功');
                  await reload();
                },
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
  <Table @register="registerTable">
    <template #toolbar>
      <n-button class="mr-2" type="primary" @click="handleAdd"> 新增参数 </n-button>
      <n-button type="error" @click="handleRefresh"> 刷新缓存 </n-button>
    </template>
  </Table>
  <setModal @register="registerModal" @success="reload()" />
</template>

<style scoped></style>
