<script setup lang="ts" name="LayoutContent">
  interface Props {
    /** 显示padding */
    showPadding?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    showPadding: true,
  });

  const app = useAppStore();
  const themeStore = useThemeStore();
  const tabStore = useMultipleTabStore();
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="themeStore.pageAnimateMode" mode="out-in" :appear="true">
      <keep-alive :include="tabStore.getCacheTabList">
        <component
          :is="Component"
          v-if="app.reloadFlag"
          :key="route.name"
          class="p-4 flex-grow bg-#f6f9f8 dark:bg-#101014 transition duration-300 ease-in-out"
        />
      </keep-alive>
    </transition>
  </router-view>
</template>

<style scoped></style>
