<script setup lang="ts">
  import { useModalInner } from '@/components/Modal';
  import { useForm } from '@/components/Form';
  import { getConfig, addConfig, updateConfig } from '@/api/modules/system/config';
  import { schemas } from './data';

  const emits = defineEmits(['success', 'register']);
  const [registerForm, { validate, getPathsValue, setPathsValue }] = useForm({
    labelWidth: 80,
    schemas,
  });

  const [registerModal, { closeModal, setModalProps }] = useModalInner(async (data) => {
    setModalProps({ title: data.configId ? '修改参数' : '新增参数' });
    if (data.configId) {
      const result = await getConfig(data.configId);
      await setPathsValue(result);
    }
  });
  const handleSubmit = async () => {
    try {
      await validate();
      const result = getPathsValue();
      await (result.configId ? updateConfig(result) : addConfig(result));
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
