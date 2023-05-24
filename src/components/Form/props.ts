import type { GridProps, FormItemGiProps } from 'naive-ui';
import type { LabelPlacement, LabelAlign } from 'naive-ui/es/form/src/interface';
import type { FormSchema, PathMapToTime, FormAction } from './types';

import { PropType } from 'vue';

// 表单配置
export const basicProps = {
  /** 自动设置 placeholder */
  autoSetPlaceHolder: { type: Boolean, default: true },
  /** 表单配置规则 */
  schemas: { type: Array as PropType<FormSchema[]>, default: () => [] },
  /** 额外传递到子组件的参数 values */
  mergeDynamicData: { type: Object as PropType<Recordable>, default: null },
  /** 用于将表单内时间区域的应设成 2 个字段 */
  pathMapToTime: { type: Array as PropType<PathMapToTime>, default: () => [] },
  /** 时间转换函数 */
  transformDateFunc: {
    type: Function as PropType<Fn>,
    default: (date: any) => date?.format?.('yyyy-MM-dd HH:mm:ss') ?? date,
  },
  /** 标签显示的位置 */
  labelPlacement: { type: String as PropType<LabelPlacement>, default: 'left' },
  /** 标签的文本对齐方式 */
  labelAlign: { type: String as PropType<LabelAlign>, default: 'right' },
  /** 必填项是否展示星号 */
  showRequireMark: { type: Boolean, default: true },
  /** 表格方法选项 */
  // tableAction: { type: Object as PropType<TableActionType> },
  /** 表单布局方式 */
  formGrid: {
    type: Object as PropType<Partial<GridProps>>,
    default: () => ({
      /** 显示的栅格数量 */
      cols: 24,
      /** 是否开启折叠 */
      collapsed: false,
      /** 当开启折叠时,超过 3 行折叠 */
      collapsedRows: 3,
      /** 横向间隔槽 */
      xGap: 0,
      /** 纵向间隔槽 */
      yGap: 0,
    }),
  },
  /** 表单子选项配置 */
  formItem: {
    type: Object as PropType<Partial<FormItemGiProps>>,
    default: () => ({
      /** 表单项栅格配置 */
      span: 24,
      /** 表单项 label 宽度 */
      labelWidth: 100,
    }),
  },
  /** 表单操作栏配置 */
  formAction: {
    type: Object as PropType<Partial<FormAction>>,
    default: () => ({
      /** 是否显示操作按钮组 */
      show: false,
      /** 操作按钮组栅格配置 */
      actionGi: { span: 8 },
      /** 重置按钮属性 */
      resetButtonOptions: { show: true, label: '重置' },
      /** 提交按钮属性 */
      submitButtonOptions: { show: true, label: '提交' },
      /** 当开启折叠时,是否显示收起展开按钮 */
      showAdvancedButton: true,
    }),
  },
};
