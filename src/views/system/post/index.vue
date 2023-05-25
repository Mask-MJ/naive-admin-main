<script setup lang="ts">
  import type { PostList } from '@/api/modules/system/types/post';

  import { useTable, Action } from '@/components/Table';
  import { useModal } from '@/components/Modal';
  import { columns, schemas } from './data';
  import { getPostList, deletePost } from '@/api/modules/system/post';
  import setModal from './modal/setModal.vue';

  const [registerSetModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: getPostList,
    columns,
    useSearchForm: true,
    formConfig: { labelWidth: 80, schemas },
    rowKey: (rowData) => rowData.roleId,
    actionColumn: {
      width: 150,
      key: 'ACTION',
      render: (row: PostList) =>
        h(Action, {
          actions: [
            {
              icon: 'i-carbon:edit',
              tooltipProps: { content: '编辑' },
              buttonProps: {
                type: 'primary',
                onClick: () => openModal(true, { postId: row.postId }),
              },
            },
            {
              icon: 'i-carbon:delete',
              tooltipProps: { content: '删除' },
              buttonProps: { type: 'error' },
              popConfirmProps: {
                content: '是否确认删除',
                onPositiveClick: async () => {
                  await deletePost(row.postId);
                  window.$message.success('删除成功');
                  await reload();
                },
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
      <n-button type="primary" @click="openModal(true)"> 新增 </n-button>
    </template>
  </Table>
  <setModal @register="registerSetModal" @success="reload()" />
</template>

<style scoped></style>
