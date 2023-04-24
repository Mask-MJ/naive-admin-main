<script setup lang="ts">
  import { getAppEnvConfig, getRgbOfColor } from '@/utils';
  import { defaultThemeSetting } from '@/settings';

  const { VITE_GLOB_APP_TITLE } = getAppEnvConfig();
  const lodingClasses = [
    'left-0 top-0',
    'left-0 bottom-0 animate-delay-500',
    'right-0 top-0 animate-delay-1000',
    'right-0 bottom-0 animate-delay-1500',
  ];

  function addThemeColorCssVars() {
    const themeColor = useStorage('themeColor', defaultThemeSetting.themeColor);
    const { r, g, b } = getRgbOfColor(themeColor.value);
    const cssVars = `--primary-color: ${r},${g},${b}`;
    document.documentElement.style.cssText = cssVars;
  }

  addThemeColorCssVars();
</script>

<template>
  <div class="fixed-center flex-col">
    <img class="text-128px text-primary" src="/images/logo.png" alt="" />
    <div class="w-56px h-56px my-36px">
      <div class="relative h-full animate-spin">
        <div
          v-for="(item, index) in lodingClasses"
          :key="index"
          class="absolute w-16px h-16px bg-primary rounded-8px animate-pulse"
          :class="item"
        />
      </div>
    </div>
    <h2 class="text-28px font-500 text-#646464">
      {{ VITE_GLOB_APP_TITLE }}
    </h2>
  </div>
</template>

<style scoped></style>
