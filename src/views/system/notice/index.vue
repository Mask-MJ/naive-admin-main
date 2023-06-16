<script setup lang="ts">
  import type { NoticeList } from '@/api/modules/system/types/notice';
  import { useModal } from '@/components/Modal';
  import { Action, useTable } from '@/components/Table';
  import { deleteNotice, getNoticeList } from '@/api/modules/system/notice';
  import { columns, schemas } from './data';
  import setModal from './modal/setModal.vue';

  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload, getSelectedRowKeys }] = useTable({
    api: getNoticeList,
    columns,
    useSearchForm: true,
    formConfig: { labelWidth: 100, schemas },
    bordered: true,
    showIndexColumn: false,
    actionColumn: {
      width: 150,
      title: '操作',
      flag: 'ACTION',
      key: 'ACTION',
      render: (row: NoticeList) =>
        h(Action, {
          actions: [
            {
              type: 'edit',
              onClick: () => openModal(true, { noticeId: row.noticeId }),
            },
            {
              type: 'del',
              onClick: async () => {
                await deleteNotice(row.noticeId);
                await reload();
              },
            },
          ],
        }),
    },
    rowKey: (rowData) => rowData.noticeId,
  });

  const handleAdd = () => {
    openModal(true);
  };

  const handleDelete = async () => {
    const keys = getSelectedRowKeys().join(',');
    window.$dialog.warning({
      title: '系统提示',
      content: `是否确认删除公告编号为 ${keys} 的数据项?`,
      onPositiveClick: async () => {
        await deleteNotice(keys);
        window.$message.success('删除成功');
        await reload();
      },
    });
  };
</script>

<template>
  <PageWrapper>
    <Table @register="registerTable">
      <template #toolbar>
        <n-button class="mr-2" type="primary" @click="handleAdd"> 新增公告 </n-button>
        <n-button type="error" @click="handleDelete"> 批量删除 </n-button>
      </template>
    </Table>
    <setModal @register="registerModal" @success="reload()" />
  </PageWrapper>
</template>

<style scoped></style>
