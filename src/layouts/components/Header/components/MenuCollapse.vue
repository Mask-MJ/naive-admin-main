<script setup lang="ts" name="MenuCollapse">
  const app = useAppStore();
  const theme = useThemeStore();
  function toggleSiderCollapse() {
    app.setSiderCollapse(!app.siderCollapse);
  }
</script>

<template>
  <hover-container
    class="w-40px h-full"
    :inverted="theme.header.inverted"
    @click="toggleSiderCollapse"
  >
    <div v-if="app.siderCollapse" class="text-16px i-line-md:menu-fold-right" />
    <div v-else class="text-16px i-line-md:menu-fold-left" />
  </hover-container>
</template>

<style scoped></style>
