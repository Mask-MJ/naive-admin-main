<script setup lang="ts">
  import { map } from 'lodash-es';
  import { useTable } from '@/components/Table';
  import { useForm } from '@/components/Form';
  import { columns, schemas } from './data';
  import { getAuthRole, setAutoRole } from '@/api/modules/system/user';

  const props = defineProps({
    id: { type: String },
  });

  const router = useRouter();
  const { removeTab } = useMultipleTabStore();
  const [registerForm, { setPathsValue }] = useForm({
    labelWidth: 100,
    schemas,
  });
  const [registerTable, { getRawTableData, setSelectedRowKeys, getSelectedRowKeys }] = useTable({
    api: getAuthRole,
    columns,
    searchInfo: { userId: props.id },
    bordered: true,
    rowKey: (rowData) => rowData.roleId,
    fetchSetting: { listField: 'roles' },
    pagination: false,
    afterFetch: (T) => {
      let result = getRawTableData();
      setPathsValue(result.user);
      setSelectedRowKeys(map(result.user.roles, 'roleId'));
      return T;
    },
  });

  const handleSubmit = async () => {
    const roleIds = getSelectedRowKeys();
    if (roleIds.length === 0) {
      window.$message.error('请选择要分配的用户');
    } else {
      const params = `?userId=${props.id}&roleIds=${roleIds.join(',')}`;
      await setAutoRole(params);
      window.$message.success('分配成功');
      handleClose();
    }
  };
  const handleClose = async () => {
    await removeTab(router.currentRoute.value.fullPath);
    router.push('/system/user');
  };
</script>

<template>
  <PageWrapper>
    <Form @register="registerForm" />
    <Table @register="registerTable">
      <template #toolbar>
        <n-button type="primary" class="mr-2" @click="handleSubmit">提交</n-button>
        <n-button type="error" @click="handleClose">关闭</n-button>
      </template>
    </Table>
  </PageWrapper>
</template>

<style scoped></style>
