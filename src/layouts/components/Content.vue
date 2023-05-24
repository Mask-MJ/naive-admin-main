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
    <transition :name="themeStore.pageAnimateMode" mode="out-in" appear>
      <keep-alive :include="tabStore.getCacheTabList">
        <div
          v-if="app.reloadFlag"
          :key="(route.name as string)"
          class="p-4 h-full flex-grow bg-#f6f9f8 dark:bg-#101014"
        >
          <component :is="Component" />
        </div>
      </keep-alive>
    </transition>
  </router-view>
</template>

<style scoped></style>
