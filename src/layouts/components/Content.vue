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
  // const tabStore = useMultipleTabStore()
  // const routerStore = useRouterStore();
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="themeStore.pageAnimateMode" mode="out-in" :appear="true">
      <keep-alive :include="['dashboard-WorkTable']">
        <component :is="Component" v-if="app.reloadFlag" :key="route.name" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<style scoped></style>
