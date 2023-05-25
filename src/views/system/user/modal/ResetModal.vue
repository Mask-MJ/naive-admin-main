<script setup lang="ts">
  import { useModalInner } from '@/components/Modal';
  import { useForm } from '@/components/Form';
  import { resetSchemas } from './data';
  import { resetPwd } from '@/api/modules/system/user';

  const [registerForm, { validate, getPathsValue, setPathsValue }] = useForm({
    labelWidth: 100,
    schemas: resetSchemas,
  });
  const [registerModal, { closeModal }] = useModalInner(async (data) => {
    setPathsValue(data);
  });

  const handleSubmit = async () => {
    try {
      await validate();
      const result = getPathsValue();
      await resetPwd(result);
      window.$message.success(`修改成功，新密码是：${result.password}`);
      closeModal();
    } catch {}
  };
</script>

<template>
  <Modal title="重置密码" @register="registerModal" @positive-click="handleSubmit">
    <Form @register="registerForm" />
  </Modal>
</template>

<style scoped></style>
