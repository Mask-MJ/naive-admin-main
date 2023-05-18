<script setup lang="ts">
  import Table from '@/components/Table/index.vue';
  import { BasicColumn } from '@/components/Table/types';
  import { schemas } from './data';
  import { useForm } from '@/components/Form/hooks/useForm';

  const columns: BasicColumn[] = [
    { type: 'selection' },
    { title: 'Name', key: 'name' },
    { title: 'Age', key: 'age' },
    { title: 'Address', key: 'address' },
  ];
  const data = [
    { id: 0, name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
    { id: 1, name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
    { id: 2, name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park' },
  ];

  const [registerForm] = useForm({
    labelWidth: 80,
    schemas: schemas,
  });
</script>

<template>
  <div>
    <Form @register="registerForm" />
    <Table :columns="columns" :data="data" :bordered="false" />
  </div>
</template>

<style scoped></style>

<route lang="yaml">
# meta:
# layout: users
</route>
