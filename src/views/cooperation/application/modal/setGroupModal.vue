<script setup lang="ts">
  import type { DynamicTagsOption } from 'naive-ui';
  import { NTag, NDynamicTags } from 'naive-ui';
  import { useModalInner } from '@/components/Modal';
  import { getGroupList, addGroup, deleteGroup } from '@/api/modules/cooperation/application';

  const emits = defineEmits(['success', 'register']);
  const value = ref();
  const [registerModal] = useModalInner(async () => {});

  const onCreate: any = async (val: string) => {
    const valArray = val.split('-');
    if (valArray.length === 2) {
      await addGroup({ name: valArray[0], sort: Number(valArray[1]) });
    } else {
      window.$message.error('请输入正确的分组名称: 格式为 >> 分组名称-排序');
    }
    await getList();
  };

  const renderTag = (tag: DynamicTagsOption, index: number) => {
    return h(
      NTag,
      {
        closable: true,
        onClose: () => {
          tag.value && deleteGroup(tag.value);
          value.value.splice(index, 1);
        },
      },
      { default: () => tag.label },
    );
  };

  const getList = async () => {
    const res = await getGroupList();
    value.value = res.rows.map((item) => {
      return { label: `${item.name}-${item.sort}`, value: item.id };
    });
  };

  onMounted(async () => {
    getList();
  });
</script>

<template>
  <Modal
    title="分组管理"
    positive-text=""
    @register="registerModal"
    @after-leave="emits('success')"
  >
    <NDynamicTags v-model:value="value" :render-tag="renderTag" @create="onCreate" />
  </Modal>
</template>

<style scoped></style>
