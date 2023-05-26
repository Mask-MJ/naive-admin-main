<script setup lang="ts">
  import { find } from 'lodash-es';
  import BaseSetting from './components/BaseSetting.vue';
  import SecureSetting from './components/SecureSetting.vue';
  // import AccountBind from './components/AccountBind.vue';

  const activeKey = ref('1');
  const menuOptions = [
    { label: '基本设置', key: '1', component: BaseSetting },
    { label: '安全设置', key: '2', component: SecureSetting },
    // { label: '账号绑定', key: '3', component: AccountBind },
  ];

  const getComponents = computed(() => {
    return find(menuOptions, ['key', activeKey.value])!.component;
  });
</script>

<template>
  <DarkModeContainer class="flex">
    <n-menu v-model:value="activeKey" class="w-1/5" :options="menuOptions" />
    <component :is="getComponents" />
  </DarkModeContainer>
</template>

<style scoped></style>
