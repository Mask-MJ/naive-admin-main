<script setup lang="ts">
  import { useModalInner } from '@/components/Modal';
  import { useForm } from '@/components/Form';
  import { addApp, updateApp } from '@/api/modules/cooperation/application';
  import { schemas } from './data';

  const emits = defineEmits(['success', 'register']);
  const [registerForm, { validate, getPathsValue, setPathsValue }] = useForm({
    labelWidth: 80,
    schemas,
  });

  const [registerModal, { closeModal, setModalProps }] = useModalInner(async (data) => {
    const hasData = Object.keys(data).length !== 0;
    // wtf 实习生的接口写得真的是
    // 抹平接口不规范
    data.name = data.appName;
    setModalProps({ title: hasData ? '修改应用' : '新增应用' });
    hasData && (await setPathsValue(data));
  });

  const handleSubmit = async () => {
    try {
      await validate();
      const result = getPathsValue();
      await (result.id ? updateApp(result) : addApp(result));
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
