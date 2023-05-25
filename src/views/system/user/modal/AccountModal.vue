<script setup lang="ts">
  import { useModalInner } from '@/components/Modal';
  import { schemas } from './data';
  import { useForm } from '@/components/Form';
  import { getUserInfo, addUserInfo, setUserInfo } from '@/api/modules/system/user';

  const emits = defineEmits(['success', 'register']);
  const [registerForm, { validate, getPathsValue, setPathsValue, updateSchema }] = useForm({
    labelWidth: 100,
    schemas,
  });

  const [registerModal, { closeModal, setModalProps }] = useModalInner(async (data) => {
    setModalProps({ title: data.userId ? '编辑账号' : '新增账号' });
    const result = (await getUserInfo(data.userId || '')).data;
    if (data.userId) {
      result.data.postIds = result.postIds;
      result.data.roleIds = result.roleIds;
      setPathsValue(result.data);
    }
    updateSchema([
      { path: 'deptId', componentProps: { options: data.treeData } },
      { path: 'postIds', componentProps: { options: result.posts } },
      { path: 'roleIds', componentProps: { options: result.roles } },
    ]);
  });

  const handleSubmit = async () => {
    try {
      await validate();
      const result = getPathsValue();
      result.userId ? await setUserInfo({ ...result }) : await addUserInfo(result);
      emits('success');
      closeModal();
    } catch (error) {}
  };
</script>

<template>
  <Modal class="!w-200" @register="registerModal" @positive-click="handleSubmit">
    <Form @register="registerForm" />
  </Modal>
</template>

<style scoped></style>
