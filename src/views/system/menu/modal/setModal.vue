<script setup lang="ts">
  import { useModalInner } from '@/components/Modal';
  import { useForm } from '@/components/Form';
  import { addMenu, setMenu } from '@/api/modules/system/menu';
  import { schemas } from './data';

  const emits = defineEmits(['success', 'register']);
  const [registerForm, { validate, getPathsValue, setPathsValue }] = useForm({
    labelWidth: 80,
    schemas,
  });

  const [registerModal, { closeModal, setModalProps }] = useModalInner(async (data) => {
    const title = Object.keys(data).length ? '编辑菜单' : '新增菜单';
    if (Object.keys(data).length) {
      setPathsValue(data);
      setModalProps({ title });
    }
  });
  const handleSubmit = async () => {
    try {
      await validate();
      const result = getPathsValue();
      await (result.menuId ? setMenu(result) : addMenu(result));
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
