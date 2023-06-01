<script setup lang="ts">
  import type {
    unrelatedUserItem,
    unrelatedPileItem,
  } from '@/api/modules/cooperation/types/companyDetail';
  import { useModalInner } from '@/components/Modal';
  import {
    getUnrelatedUserList,
    saveUser,
    savePile,
    getUnrelatedPileList,
  } from '@/api/modules/cooperation/companyDetail';

  const radioMaps = [
    [
      { label: '根据登录名称搜索', value: 'userName' },
      { label: '根据用户名称搜索', value: 'nickName' },
    ],
    [
      { label: '根据桩名称搜索', value: 'name' },
      { label: '根据桩编号搜索', value: 'code' },
    ],
  ] as const;

  const emits = defineEmits(['success', 'register']);
  const propsData = ref({ id: '', type: 0 });
  const value = ref<string[]>([]);
  const radioValue = ref('userName');
  const dataSource = ref<(unrelatedUserItem | unrelatedPileItem)[]>([]);
  const [registerModal, { closeModal }] = useModalInner(async (data) => {
    // 初始化数据
    propsData.value = data;
    value.value = [];
    radioValue.value = data.type ? 'name' : 'userName';
    dataSource.value = data.type
      ? (await getUnrelatedPileList({ pageNum: 1, pageSize: 1000 })).rows
      : (await getUnrelatedUserList({ pageNum: 1, pageSize: 1000 })).rows;
  });

  const options = computed(() => {
    return dataSource.value.map((item) => ({
      label: item[radioValue.value as keyof typeof item],
      value: item.id,
    }));
  });

  const handleSubmit = async () => {
    try {
      propsData.value.type
        ? await savePile({ companyId: propsData.value.id, pileId: unref(value) })
        : await saveUser({ companyId: propsData.value.id, userId: unref(value) });
      emits('success');
      closeModal();
    } catch (error) {}
  };
</script>

<template>
  <Modal title="添加用户" class="!w-200" @register="registerModal" @positive-click="handleSubmit">
    <n-radio-group v-model:value="radioValue" class="my-4" name="radiogroup">
      <n-space>
        <template v-for="item in radioMaps[propsData.type]" :key="item.value">
          <n-radio :value="item.value"> {{ item.label }} </n-radio>
        </template>
      </n-space>
    </n-radio-group>
    <n-transfer
      ref="transfer"
      v-model:value="value"
      virtual-scroll
      :options="options"
      source-filterable
    />
  </Modal>
</template>
