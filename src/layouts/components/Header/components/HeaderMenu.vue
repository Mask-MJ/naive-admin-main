<script setup lang="ts" name="HeaderMenu">
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const routerStore = useRouterStore();
  const theme = useThemeStore();
  // const permissionStore = usePermissionStore();

  const menus = computed(() => routerStore.menuList);
  const activeKey = computed(
    () => (route.meta?.activeMenu ? route.meta.activeMenu : route.name) as string,
  );
</script>

<template>
  <div class="flex-1-hidden h-full px-10px">
    <n-scrollbar :x-scrollable="true" class="flex-1-hidden h-full" content-class="h-full">
      <div class="flex-y-center h-full" :style="{ justifyContent: theme.menu.horizontalPosition }">
        <n-menu
          :value="activeKey"
          mode="horizontal"
          :options="menus"
          :inverted="theme.header.inverted"
        />
      </div>
    </n-scrollbar>
  </div>
</template>

<style scoped>
  :deep(.n-menu-item-content-header) {
    overflow: inherit !important;
  }
</style>
