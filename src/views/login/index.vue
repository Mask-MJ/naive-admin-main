<script setup lang="ts">
  const userStore = useUserStore();

  async function login() {
    // await loginApi({
    //   username: 'admin',
    //   password: 'admin123',
    //   code: '1',
    //   uuid: 'e34b77db035e4fa3a367166d0f341956',
    // })
    await userStore.login({
      username: 'admin',
      password: 'admin123',
      code: '1',
      uuid: 'e34b77db035e4fa3a367166d0f341956',
    });
  }
</script>

<template>
  <div class="relative h-full bg-black">
    <n-button type="primary" @click="login"> login </n-button>
  </div>
</template>

<style scoped></style>

<route lang="yaml">
meta:
  layout: login
  noAuth: true
</route>
