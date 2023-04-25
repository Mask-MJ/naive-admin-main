<script setup lang="ts" name="LayoutHeader">
  import {
    Breadcrumb,
    FullScreen,
    HeaderMenu,
    MenuCollapse,
    SettingButton,
    SystemMessage,
    ThemeMode,
    UserAvatar,
  } from './components';
  import { Logo } from '@/layouts/components';
  import { useBasicLayout } from '@/layouts/hooks';

  defineProps({
    showLogo: { type: Boolean },
    showHeaderMenu: { type: Boolean },
    showMenuCollapse: { type: Boolean },
  });
  const theme = useThemeStore();
  const { isMobile } = useBasicLayout();
  const header = computed(() => {
    return theme.header;
  });

  const height = computed(() => `${header.value.height}px`);
</script>

<template>
  <dark-mode-container
    class="flex-y-center h-full border-b-1 border-gray-200 dark:border-gray-700"
    :style="{ height }"
    :inverted="header.inverted"
  >
    <Logo
      v-if="showLogo"
      :show-title="true"
      class="h-full"
      :style="{ width: `${theme.sider.width}px` }"
    />
    <div v-if="!showHeaderMenu" class="flex-1 overflow-hidden flex-y-center h-full">
      <MenuCollapse v-if="showMenuCollapse || isMobile" />
      <Breadcrumb v-if="header.crumb.visible && !isMobile" />
    </div>
    <HeaderMenu v-else />
    <div class="flex justify-end h-full">
      <FullScreen />
      <ThemeMode />
      <SystemMessage />
      <UserAvatar />
      <SettingButton />
    </div>
  </dark-mode-container>
</template>

<style scoped>
  .global-header {
    box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
  }
</style>
