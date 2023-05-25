<script setup lang="ts">
  import { useModalInner } from '@/components/Modal';
  import { useForm, type FormSchema } from '@/components/Form';
  import { depSchemas } from './data';
  import { getRole, setDataScope } from '@/api/modules/system/role';

  const emits = defineEmits(['success', 'register']);
  const roleId = ref();
  const [registerForm, { validate, getPathsValue, setPathsValue, updateSchema }] = useForm({
    labelWidth: 80,
    schemas: depSchemas,
  });
  const [registerModal, { closeModal }] = useModalInner(async (data) => {
    roleId.value = data.roleId;
    await updateSchema({
      path: 'deptIds',
      component: 'ApiTree',
      componentProps: { immediate: true, params: { id: data.roleId } },
    } as FormSchema);
    const result = await getRole(data.roleId);
    await setPathsValue(result);
  });

  const handleSubmit = async () => {
    try {
      await validate();
      const result = getPathsValue();
      await setDataScope({ ...result, roleId: roleId.value });
      emits('success');
      closeModal();
    } catch (error) {}
  };
</script>

<template>
  <Modal title="分配数据权限" @register="registerModal" @positive-click="handleSubmit">
    <Form @register="registerForm" />
  </Modal>
</template>

<style scoped></style>
