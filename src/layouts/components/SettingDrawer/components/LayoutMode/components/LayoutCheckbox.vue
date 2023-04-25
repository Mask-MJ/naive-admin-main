<script setup lang="ts" name="LayoutCheckbox">
  import type { PopoverPlacement } from 'naive-ui';
  import type { EnumThemeLayoutMode, ThemeLayoutMode } from '@/settings/theme';

  interface Props {
    /** 布局模式 */
    mode: ThemeLayoutMode;
    /** 布局模式文本 */
    label: EnumThemeLayoutMode;
    /** 选中状态 */
    checked: boolean;
  }

  const props = defineProps<Props>();

  type LayoutConfig = Record<
    ThemeLayoutMode,
    {
      placement: PopoverPlacement;
      menuClass: string;
      mainClass: string;
    }
  >;

  const layoutConfig: LayoutConfig = {
    vertical: {
      placement: 'bottom-start',
      menuClass: 'w-1/3 h-full',
      mainClass: 'w-2/3 h-3/4',
    },
    'vertical-mix': {
      placement: 'bottom',
      menuClass: 'w-1/4 h-full',
      mainClass: 'w-2/3 h-3/4',
    },
    horizontal: {
      placement: 'bottom',
      menuClass: 'w-full h-1/4',
      mainClass: 'w-full h-3/4',
    },
    'horizontal-mix': {
      placement: 'bottom-end',
      menuClass: 'w-full h-1/4',
      mainClass: 'w-2/3 h-3/4',
    },
  };

  const activeConfig = computed(() => layoutConfig[props.mode]);
</script>

<template>
  <div
    class="border-2px rounded-6px cursor-pointer hover:border-primary"
    :class="[checked ? 'border-primary' : 'border-transparent']"
  >
    <n-tooltip :placement="activeConfig.placement" trigger="hover">
      <template #trigger>
        <div
          class="layout-checkbox__shadow relative w-56px h-48px bg-white rounded-4px overflow-hidden"
        >
          <div class="absolute-lt bg-[#273352]" :class="activeConfig.menuClass" />
          <div class="absolute-rb bg-[#f0f2f5]" :class="activeConfig.mainClass" />
        </div>
      </template>
      <span>{{ label }}</span>
    </n-tooltip>
  </div>
</template>

<style scoped>
  .layout-checkbox__shadow {
    box-shadow: 0 1px 2.5px rgba(0, 0, 0, 0.18);
  }
</style>
