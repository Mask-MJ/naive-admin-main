import type { ComputedRef, Slots } from 'vue';
import type { BasicTableProps, FetchParams } from '../types';
import type { BasicFormProps } from '@/components/Form';
import { isFunction } from 'lodash-es';

export function useTableForm(
  propsRef: ComputedRef<BasicTableProps>,
  slots: Slots,
  fetch: (opt?: FetchParams | undefined) => Promise<void>,
  getLoading: ComputedRef<boolean | undefined>,
) {
  const getFormProps = computed((): Partial<BasicFormProps> => {
    const { formConfig } = unref(propsRef);
    return {
      formAction: {
        /** 是否显示操作按钮组 */
        show: true,
        /** 操作按钮组栅格配置 */
        actionGi: { span: 8 },
        /** 重置按钮属性 */
        resetButtonOptions: { show: true, label: '重置' },
        /** 提交按钮属性 */
        submitButtonOptions: { loading: unref(getLoading), show: true, label: '提交' },
        /** 当开启折叠时,是否显示收起展开按钮 */
        showAdvancedButton: true,
      },
      formGrid: { collapsed: true, collapsedRows: 2 },
      ...formConfig,
    };
  });

  const getFormSlotKeys: ComputedRef<string[]> = computed(() => {
    const keys = Object.keys(slots);
    return keys
      .map((item) => (item.startsWith('form-') ? item : null))
      .filter((item) => !!item) as string[];
  });

  function replaceFormSlotKey(key: string) {
    if (!key) return '';
    return key?.replace?.(/form\-/, '') ?? '';
  }

  function handleSearchInfoChange(info: Recordable) {
    const { handleSearchInfoFn } = unref(propsRef);
    if (handleSearchInfoFn && isFunction(handleSearchInfoFn)) {
      info = handleSearchInfoFn(info) || info;
    }
    fetch({ searchInfo: info, page: 1 });
  }

  return {
    getFormProps: getFormProps as any,
    replaceFormSlotKey,
    getFormSlotKeys,
    handleSearchInfoChange,
  };
}
