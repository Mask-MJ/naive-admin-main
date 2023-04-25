<script setup lang="ts" name="LayoutLogo">
  import { PageEnum } from '@/router/pageEnum';

  defineProps<Props>();
  const { t } = useI18n();
  interface Props {
    /** 显示名字 */
    showTitle: boolean;
  }
</script>

<template>
  <router-link
    :to="PageEnum.BASE_HOME"
    class="flex-center w-full whitespace-nowrap overflow-hidden"
  >
    <n-image width="40" src="/images/logo.png" />
    <h2
      v-show="showTitle"
      class="pl-8px text-20px font-bold text-primary transition duration-300 ease-in-out"
    >
      {{ t('app.name') }}
    </h2>
  </router-link>
</template>

<style scoped></style>
