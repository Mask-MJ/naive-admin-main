<script setup lang="ts">
  const theme = useThemeStore();
</script>

<template>
  <hover-container class="w-40px h-full" :inverted="theme.header.inverted">
    <i class="text-16px i-line-md:bell" />
  </hover-container>
</template>

<style scoped></style>
