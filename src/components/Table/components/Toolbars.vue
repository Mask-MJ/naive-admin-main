<script setup lang="ts">
  import { ACTION_SETTINGS } from '../constants';

  const emits = defineEmits(['tableAction']);
  const props = defineProps({
    striped: { type: Boolean },
    size: { type: String },
  });

  const isStriped = computed(() => String(props.striped));
  const reload = () => emits('tableAction', { type: 'reload' });
  const stripedSelect = (e: any) => {
    emits('tableAction', { type: 'striped', value: Boolean(e) });
  };
  const densitySelect = (e: any) => {
    emits('tableAction', { type: 'size', value: e });
  };
</script>

<template>
  <div class="flex">
    <!--刷新-->
    <n-tooltip trigger="hover">
      <template #trigger>
        <div class="cursor-pointer">
          <n-icon size="18" @click="reload"> <i class="i-ant-design:reload-outlined"></i> </n-icon>
        </div>
      </template>
      <span>刷新</span>
    </n-tooltip>
    <n-divider vertical />
    <!--斑马纹-->
    <n-tooltip trigger="hover">
      <template #trigger>
        <div class="cursor-pointer">
          <n-dropdown
            :value="isStriped"
            trigger="click"
            :options="ACTION_SETTINGS.STRIPED"
            @select="stripedSelect"
          >
            <n-icon size="18"> <i class="i-ant-design:pic-center-outlined"></i> </n-icon>
          </n-dropdown>
        </div>
      </template>
      <span>表格斑马纹</span>
    </n-tooltip>
    <n-divider vertical />
    <!--密度-->
    <n-tooltip trigger="hover">
      <template #trigger>
        <div class="cursor-pointer">
          <n-dropdown
            :value="size"
            trigger="click"
            :options="ACTION_SETTINGS.DENSITY"
            @select="densitySelect"
          >
            <n-icon size="18"><i class="i-ant-design:column-height-outlined"></i> </n-icon>
          </n-dropdown>
        </div>
      </template>
      <span>密度</span>
    </n-tooltip>
  </div>
</template>

<style scoped></style>
