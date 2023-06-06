<script setup lang="ts">
  import { useTable } from '@/components/Table';
  import { getAlarmList } from '@/api/modules/maintenance/alarmlog';
  import { columns, schemas } from './data';

  const [registerTable] = useTable({
    api: getAlarmList,
    columns,
    useSearchForm: true,
    showIndexColumn: false,
    formConfig: { schemas },
    bordered: true,
    rowKey: (rowData) => rowData.id,
  });
</script>

<template>
  <Table @register="registerTable" />
</template>
