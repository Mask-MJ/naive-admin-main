<script setup lang="ts">
  import type { CompanyList } from '@/api/modules/cooperation/types/company';
  import { useModalInner } from '@/components/Modal';
  import { schema } from './data';

  const detailData = ref();
  const [registerModal] = useModalInner(async (data: CompanyList) => {
    detailData.value = data;
  });
</script>

<template>
  <Modal title="充电桩详情" class="!w-200" positive-text="" @register="registerModal">
    <Descriptions class="mb-4" :schema="schema" :data="detailData" />
  </Modal>
</template>
