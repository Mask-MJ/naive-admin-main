<script setup lang="ts" name="SettingButton">
  const app = useAppStore();
  const theme = useThemeStore();
</script>

<template>
  <hover-container
    class="w-40px h-full"
    tooltip-content="主题配置"
    :inverted="theme.header.inverted"
    @click="app.toggleSettingDrawerVisible()"
  >
    <i class="text-20px i-carbon:settings" />
  </hover-container>
</template>

<style scoped></style>
