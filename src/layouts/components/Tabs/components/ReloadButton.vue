<script setup lang="ts" name="ReloadButton">
  import useLoading from '@/hooks/useLoading';

  const app = useAppStore();
  const { loading, startLoading, endLoading } = useLoading();

  function handleRefresh() {
    startLoading();
    app.reloadPage();
    setTimeout(() => {
      endLoading();
    }, 1000);
  }
</script>

<template>
  <hover-container
    class="w-64px h-full"
    tooltip-content="重新加载"
    placement="bottom-end"
    @click="handleRefresh"
  >
    <i class="text-16px i-carbon:renew" :class="{ 'animate-spin': loading }" />
  </hover-container>
</template>

<style scoped></style>
