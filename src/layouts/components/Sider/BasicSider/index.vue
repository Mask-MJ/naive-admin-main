<script setup lang="ts" name="BasicSider">
  import Logo from '../../Logo.vue';
  import BasicMenu from './BasicMenu.vue';

  const app = useAppStore();
  const theme = useThemeStore();
  const isHorizontalMix = computed(() => theme.layout.mode === 'horizontal-mix');
  const showTitle = computed(() => !app.siderCollapse && theme.layout.mode !== 'vertical-mix');
</script>

<template>
  <dark-mode-container class="flex flex-col items-stretch h-full" :inverted="theme.sider.inverted">
    <Logo
      v-if="!isHorizontalMix"
      :show-title="showTitle"
      :style="{ height: `${theme.header.height}px` }"
    />
    <BasicMenu class="flex-1 overflow-hidden" />
  </dark-mode-container>
</template>

<style scoped></style>
