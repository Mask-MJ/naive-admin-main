<script setup lang="ts">
  import { useModalInner } from '@/components/Modal';
  import { useForm } from '@/components/Form';
  import { getDictDetail, addDictList, editDictList } from '@/api/modules/system/dict';
  import { schemas } from './data';

  const emits = defineEmits(['success', 'register']);
  const [registerForm, { validate, getPathsValue, setPathsValue }] = useForm({
    labelWidth: 80,
    schemas,
  });

  const [registerModal, { closeModal, setModalProps }] = useModalInner(async (data) => {
    setModalProps({ title: data.dictId ? '修改字典' : '新增字典' });
    if (data.dictId) {
      const result = await getDictDetail(data.dictId);
      await setPathsValue(result);
    }
  });
  const handleSubmit = async () => {
    try {
      await validate();
      const result = getPathsValue();
      await (result.dictId ? editDictList(result) : addDictList(result));
      emits('success');
      closeModal();
    } catch (error) {}
  };
</script>

<template>
  <Modal @register="registerModal" @positive-click="handleSubmit">
    <Form @register="registerForm" />
  </Modal>
</template>

<style scoped></style>
