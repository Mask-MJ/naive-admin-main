<script setup lang="ts">
  import type { UserAppList } from '@/api/modules/cooperation/types/appPermission';

  import { map } from 'lodash-es';
  import { useModalInner } from '@/components/Modal';
  import { useTable } from '@/components/Table';
  import { columns } from './data';
  import {
    getListByUserID,
    getUserList,
    updateUserPermission,
  } from '@/api/modules/cooperation/appPermission';

  const emits = defineEmits(['success', 'register']);
  const selectId = ref<string>('');
  const [registerTable, { reload, getSelectedRowKeys, setSelectedRowKeys }] = useTable({
    api: getListByUserID,
    outermost: false,
    showToolbars: false,
    columns,
    useSearchForm: true,
    rowKey: (rowData) => rowData.id,
    formConfig: {
      schemas: [
        {
          path: 'userId',
          label: '用户',
          component: 'ApiSelect',
          span: 16,
          componentProps: {
            api: getUserList,
            resultField: 'rows',
            labelField: 'userName',
            valueField: 'userId',
            allOptions: true,
            onUpdateValue: (val: string) => {
              selectId.value = val;
              reload({ searchInfo: { userId: val } });
            },
          },
        },
      ],
    },
    afterFetch: (data: UserAppList[]) => {
      setSelectedRowKeys(
        map(
          data.filter((item) => item.flag),
          'id',
        ),
      );
    },
  });
  const [registerModal, { closeModal }] = useModalInner();

  const handleSubmit = async () => {
    try {
      const keys = getSelectedRowKeys();
      updateUserPermission({
        id: selectId.value,
        appIds: keys as string[],
      });
      emits('success');
      closeModal();
    } catch (error) {}
  };
</script>

<template>
  <Modal
    title="用户权限编辑"
    class="!w-150"
    @register="registerModal"
    @positive-click="handleSubmit"
  >
    <Table @register="registerTable" />
  </Modal>
</template>
