<script setup lang="ts">
  import type { DropdownItem } from '@/components/Table';
  import type { RuleList } from '@/api/modules/operation/types/rule';

  import { Action, useTable } from '@/components/Table';
  import { useModal } from '@/components/Modal';
  import { columns, schemas } from './data';
  import {
    getRuleList,
    deleteManage,
    getFatherGroup,
    runJob,
    applyManage,
    auditRule,
  } from '@/api/modules/operation/rule';
  import setModal from './modal/setModal.vue';
  import detailModal from './modal/detailModal.vue';
  import historyModal from './modal/historyModal.vue';

  const searchValue = ref('');
  const searchInfo = reactive<Recordable>({});
  const data = ref();

  const [registerSetModal, { openModal: openSetModel }] = useModal();
  const [registerDetailModal, { openModal: openDetailModel }] = useModal();
  const [registerHistoryModal, { openModal: openHistoryModel }] = useModal();

  const [registerTable, { reload }] = useTable({
    api: getRuleList,
    columns,
    useSearchForm: true,
    formConfig: { labelWidth: 100, schemas },
    searchInfo,
    bordered: true,
    actionColumn: {
      width: 200,
      title: '操作',
      flag: 'ACTION',
      key: 'ACTION',
      render: (row: RuleList) =>
        h(Action, {
          actions: [
            { type: 'edit', onClick: () => openSetModel(true, row) },
            {
              icon: 'i-ant-design:cloud-download-outlined',
              buttonProps: { type: 'warning' },
              popConfirmProps: {
                content: `确认要立即执行一次"${row.ruleName}"任务吗`,
                onPositiveClick: async () => {
                  await runJob(row.id);
                  window.$message.success('下发成功');
                  await reload();
                },
              },
            },
            {
              type: 'del',
              onClick: async () => {
                await deleteManage(row.id);
                await reload();
              },
            },
          ],
          dropDownActions: dropDownActions(row),
        }),
    },
    rowKey: (rowData) => rowData.userId,
  });

  const dropDownActions = (row: RuleList): DropdownItem[] => [
    {
      label: '详情',
      props: {
        icon: 'i-ant-design:eye-outlined',
        onClick: () => openDetailModel(true, row),
      },
    },
    {
      label: '历史记录',
      props: {
        icon: 'i-ant-design:history-outlined',
        onClick: () => openHistoryModel(true, { id: row.id }),
      },
    },
    {
      label: '提交申请',
      show: Boolean(row.status === 0),
      props: {
        icon: 'i-ant-design:cloud-upload-outlined',
        onClick: async () => {
          try {
            await applyManage(row.id);
            window.$message.success('提交申请成功');
            await reload();
          } catch (error) {}
        },
      },
    },
    {
      label: '审核',
      show: Boolean(row.status === 1),
      props: {
        icon: 'i-ant-design:export-outlined',
        onClick: () => {
          window.$dialog.success({
            title: `审核规则${row.ruleName}`,
            positiveText: '通过',
            negativeText: '驳回',
            onPositiveClick: async () => {
              await auditRule({ id: row.id, status: 2 });
              window.$message.success('通过申请成功');
              await reload();
            },
            onNegativeClick: async () => {
              await auditRule({ id: row.id, status: 3 });
              window.$message.error('驳回申请成功');
              await reload();
            },
          });
        },
      },
    },
  ];

  const handleAdd = () => {
    openSetModel(true);
  };

  /** 更新表格数据 */
  const handleSelect = (groupId: string[]) => {
    searchInfo.groupIdStr = groupId.join(',');
    reload();
  };

  onMounted(async () => {
    data.value = await getFatherGroup();
  });
</script>

<template>
  <div class="flex h-full">
    <div class="w-1/4 xl:w-1/5 mr-4">
      <n-input v-model:value="searchValue" placeholder="搜索" />
      <n-tree
        :show-irrelevant-nodes="false"
        :pattern="searchValue"
        :data="data"
        block-line
        checkable
        key-field="id"
        label-field="groupName"
        @update-checked-keys="handleSelect"
      />
    </div>
    <div class="w-3/4 xl:w-4/5">
      <Table @register="registerTable">
        <template #toolbar>
          <n-button class="mr-2" type="primary" @click="handleAdd"> 新增 </n-button>
        </template>
      </Table>
    </div>
    <setModal @register="registerSetModal" @success="reload()" />
    <detailModal @register="registerDetailModal" />
    <historyModal @register="registerHistoryModal" />
  </div>
</template>
