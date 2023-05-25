<script setup lang="ts">
  import { useModalInner } from '@/components/Modal';
  import { useTable } from '@/components/Table';
  import { getUnAllocatedList, selectUser } from '@/api/modules/system/assign';
  import { columns, schemas } from '../data';

  const emits = defineEmits(['success', 'register']);
  const roleId = ref();

  const [registerModal, { closeModal }] = useModalInner(async (data) => {
    roleId.value = data.roleId;
  });

  const [registerTable, { getSelectedRowKeys }] = useTable({
    api: getUnAllocatedList,
    columns,
    useSearchForm: true,
    formConfig: { labelWidth: 100, schemas },
    bordered: true,
    searchInfo: { roleId: roleId.value },
    flexHeight: true,
    rowKey: (rowData) => rowData.userId,
  });

  const handleSubmit = async () => {
    try {
      const userIds = getSelectedRowKeys();
      if (userIds.length === 0) {
        window.$message.error('请选择要分配的用户');
      } else {
        let params = {
          roleId: Number(roleId.value),
          userIds: userIds.join(','),
        };
        await selectUser(params);
        emits('success');
        closeModal();
      }
    } catch (error) {}
  };
</script>

<template>
  <Modal
    title="选择用户"
    :style="{ width: '1200px' }"
    @register="registerModal"
    @positive-click="handleSubmit"
  >
    <Table class="h-100" @register="registerTable" />
  </Modal>
</template>

<style scoped></style>
