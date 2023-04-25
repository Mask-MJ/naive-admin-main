<script setup lang="ts" name="SettingDrawer">
  import {
    DarkMode,
    LayoutMode,
    PageFunc,
    PageView,
    ThemeColorSelect,
    ThemeConfig,
  } from './components';

  const app = useAppStore();
</script>

<template>
  <n-drawer
    :show="app.settingDrawerVisible"
    display-directive="show"
    :width="330"
    @mask-click="app.closeSettingDrawer()"
  >
    <n-drawer-content title="主题配置" :native-scrollbar="false">
      <DarkMode />
      <LayoutMode />
      <ThemeColorSelect />
      <PageFunc />
      <PageView />
      <ThemeConfig />
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped></style>
