<script setup lang="ts">
  import { dateZhCN, zhCN } from 'naive-ui';
  import subscribeThemeStore from '@/settings/theme/subscribeTheme';
  import { getPictureCode, loginApi } from '@/api/modules/basic/user';
  import { getAppEnvConfig } from '@/utils';

  const { VITE_GLOB_APP_TITLE } = getAppEnvConfig();
  useHead({ title: VITE_GLOB_APP_TITLE });

  const theme = useThemeStore();

  subscribeThemeStore();

  onMounted(async () => {
    await getPictureCode();
    await loginApi({
      username: 'admin',
      password: 'admin123',
      code: '1',
      uuid: 'e34b77db035e4fa3a367166d0f341956',
    });
  });
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
