<script setup lang="ts">
  import type { CompanyList } from '@/api/modules/cooperation/types/company';
  import { useModalInner } from '@/components/Modal';
  import { DescItemSchemas } from './data';

  const detailData = ref();
  const imgUrl = computed(() => detailData.value?.icon);
  const [registerModal] = useModalInner(async (data: CompanyList) => {
    detailData.value = data;
  });
</script>

<template>
  <Modal title="公众号应用详情" class="!w-200" positive-text="" @register="registerModal">
    <Descriptions class="mb-4" :schema="DescItemSchemas" :data="detailData" />
    <n-image :width="300" :src="imgUrl" preview-disabled />
  </Modal>
</template>
