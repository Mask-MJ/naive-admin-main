<script setup lang="ts">
  import type { RuleList } from '@/api/modules/operation/types/rule';
  import { useModalInner } from '@/components/Modal';
  import { detailData, options } from './detailData';
  import { filter } from 'lodash-es';
  import SelectPicker from '@/components/Form/components/SelectPicker.vue';
  import { getHistoryListDetails } from '@/api/modules/operation/rule';

  const rowData = ref<RuleList>();

  const getValues = computed(() => rowData.value?.times || {});

  const getData = computed(() =>
    rowData.value?.ruleModel === 0
      ? filter(detailData, (e) => e.id != 6)
      : filter(detailData, (e) => e.id != 5),
  );

  const [registerModal, { setModalProps }] = useModalInner(async (data) => {
    setModalProps({ title: data.isHistory ? '历史计费规则详情' : '计费规则详情' });
    if (data.isHistory) {
      const result = await getHistoryListDetails(data.id);
      rowData.value = result;
    } else {
      rowData.value = data;
    }
  });
</script>

<template>
  <Modal title="计费规则详情" class="!w-250" positive-text="" @register="registerModal">
    <template v-for="item in getData" :key="item.id">
      <Descriptions class="mb-4" v-bind="item" :data="rowData" />
      <div v-if="item.id === 6 && rowData?.times" class="">
        <SelectPicker :options="options" :value="getValues" :readonly="true" first-checked="" />
      </div>
    </template>
  </Modal>
</template>
