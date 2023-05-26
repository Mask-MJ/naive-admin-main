<script setup lang="ts">
  import { useForm } from '@/components/Form';
  import { updatePwd } from '@/api/modules/system/user';
  import { formSchema } from '../data';

  const [register, { validate, resetPaths, getPathsValue }] = useForm({
    size: 'large',
    labelWidth: 100,
    schemas: formSchema,
  });

  const handleSubmit = async () => {
    await validate();
    const result = getPathsValue();
    const { oldPassword, newPassword } = result;
    const userStore = useUserStore();
    const params = `?oldPassword=${oldPassword}&newPassword=${newPassword}`;
    await updatePwd(params);
    userStore.logout();
  };
</script>

<template>
  <div class="p-8">
    <div class="text-2xl font-bold mb-4">修改当前用户密码</div>
    <div class="text-lg mb-4">修改成功后会自动退出当前登录！</div>
    <Form @register="register" />
    <div class="flex justify-center">
      <n-button @click="resetPaths"> 重置 </n-button>
      <n-button class="!ml-4" type="primary" @click="handleSubmit"> 确认 </n-button>
    </div>
  </div>
</template>

<style scoped></style>
