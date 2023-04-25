<script setup lang="ts">
  const a = ref('');
  const routerStore = useRouterStore();
  const menuOptions = computed(() => routerStore.menuList);
  // onMounted(() => {
  //   console.log('menuOptions', menuOptions.value)
  // })
</script>

<template>
  <div>
    <n-input v-model:value="a" />
    <n-menu :options="menuOptions" />
  </div>
</template>

<style scoped></style>
