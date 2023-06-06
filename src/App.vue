<script setup lang="ts">
  import { dateZhCN, zhCN } from 'naive-ui';
  import subscribeThemeStore from '@/settings/theme/subscribeTheme';
  import { getAppEnvConfig } from '@/utils';

  const { VITE_GLOB_APP_TITLE } = getAppEnvConfig();
  useHead({ title: VITE_GLOB_APP_TITLE });

  const theme = useThemeStore();

  subscribeThemeStore();
</script>

<template>
  <n-config-provider
    :theme="theme.naiveTheme"
    :theme-overrides="theme.naiveThemeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
    class="h-full"
  >
    <naive-provider>
      <router-view />
    </naive-provider>
  </n-config-provider>
</template>
