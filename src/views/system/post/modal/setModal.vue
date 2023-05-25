<script setup lang="ts">
  import { useModalInner } from '@/components/Modal';
  import { useForm } from '@/components/Form';
  import { getPost, addPost, setPost } from '@/api/modules/system/post';
  import { schemas } from './data';

  const emits = defineEmits(['success', 'register']);
  const [registerForm, { validate, getPathsValue, setPathsValue }] = useForm({
    labelWidth: 80,
    schemas,
  });

  const [registerModal, { closeModal, setModalProps }] = useModalInner(async (data) => {
    setModalProps({ title: data.postId ? '修改岗位' : '新增岗位' });
    if (data.postId) {
      const result = await getPost(data.postId);
      await setPathsValue(result);
    }
  });
  const handleSubmit = async () => {
    try {
      await validate();
      const result = getPathsValue();
      await (result.postId ? setPost(result) : addPost(result));
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
