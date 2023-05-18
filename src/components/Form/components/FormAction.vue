<script setup lang="ts">
  import type { GridProps, FormItemGiProps } from 'naive-ui';
  import type { FormSchema, ResetButtonOptions, SubmitButtonOptions } from '../types';

  const { t } = useI18n();
  const emits = defineEmits(['action']);
  const props = defineProps({
    schemas: { type: Array as PropType<FormSchema[]>, default: () => [] },
    formGrid: { type: Object as PropType<GridProps>, default: () => ({}) },
    formItem: { type: Object as PropType<FormItemGiProps>, default: () => ({}) },
    showAdvancedButton: { type: Boolean, default: true },
    resetButtonOptions: {
      type: Object as PropType<Partial<ResetButtonOptions>>,
      default: () => ({}),
    },
    submitButtonOptions: {
      type: Object as PropType<Partial<SubmitButtonOptions>>,
      default: () => ({}),
    },
  });
  const getResetBtnOptions = computed(() =>
    Object.assign({ label: t('components.form.resetText') }, props.resetButtonOptions),
  );
  const getSubmitBtnOptions = computed(() =>
    Object.assign({ label: t('components.form.queryText') }, props.submitButtonOptions),
  );
  // 当小于搜索临界值时，不显示收起按钮
  const isShowAdvanced = computed(() => {
    const total = props.schemas.reduce(
      (prev, next) => prev + (Number(next.span) || Number(props.formItem.span)),
      0,
    );
    return Number(props.formGrid.collapsedRows) * Number(props.formGrid.cols) >= total
      ? false
      : props.showAdvancedButton;
  });
  /** 重置 */
  const resetAction = () => emits('action', 'reset');
  /** 提交 */
  const submitAction = () => emits('action', 'submit');
  /** 更改收起状态 */
  const toggleAdvanced = () => emits('action', 'toggle');
</script>

<template>
  <n-space class="w-full" justify="end">
    <n-button v-if="resetButtonOptions.show" v-bind="getResetBtnOptions" @click="resetAction">
      {{ getResetBtnOptions.label }}
    </n-button>
    <n-button
      v-if="submitButtonOptions.show"
      v-bind="getSubmitBtnOptions"
      type="primary"
      @click="submitAction"
    >
      {{ getSubmitBtnOptions.label }}
    </n-button>
    <n-button v-if="isShowAdvanced" quaternary @click="toggleAdvanced">
      {{ formGrid.collapsed ? t('components.form.unfold') : t('components.form.putAway') }}
      <template #icon>
        <i :class="formGrid.collapsed ? 'i-carbon:chevron-down' : 'i-carbon:chevron-up'"></i>
      </template>
    </n-button>
  </n-space>
</template>

<style scoped></style>
