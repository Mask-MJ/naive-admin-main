<script setup lang="ts">
  const a = ref('');
  const routerStore = useRouterStore();
  const menuOptions = computed(() => routerStore.menuList);
  // onMounted(() => {
  //   console.log('menuOptions', menuOptions.value)
  // })
</script>

<template>
  <PageWrapper>
    <n-input v-model:value="a" />
    <n-menu :options="menuOptions" />
  </PageWrapper>
</template>

<style scoped></style>
