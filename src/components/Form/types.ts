import type {
  ButtonProps,
  FormItemGiProps,
  GridItemProps,
  GridProps,
  FormItemRule,
  FormProps,
  FormInst,
} from 'naive-ui';
import type { LabelPlacement, LabelAlign } from 'naive-ui/es/form/src/interface';
import type { ComponentMap } from './component';

// 按钮配置
export interface ButtonOptions extends ButtonProps {
  show: boolean;
  label: string;
}
export type ResetButtonOptions = Partial<ButtonOptions> & {
  // 自定义提交函数
  resetFunc: () => Promise<void>;
};
export type SubmitButtonOptions = Partial<ButtonOptions> & {
  // 回车自动提交
  autoSubmitOnEnter: Boolean;
  // 提交表单后是否重置表单
  submitOnReset: Boolean;
  // 自定义提交函数
  submitFunc: () => Promise<void>;
};
// 时间结构
export type PathMapToTime = [string, [string, string], (string | [string, string])?][];

// 渲染回调参数
export interface RenderCallbackParams {
  schema: FormSchema;
  values: Recordable;
  model: Recordable;
  path: string;
}

export interface FormAction {
  /** 是否显示操作按钮组 */
  show: boolean;
  /** 操作按钮组栅格配置 */
  actionGi: Partial<GridItemProps>;
  /** 重置按钮属性 */
  resetButtonOptions: Partial<ResetButtonOptions>;
  /** 提交按钮属性 */
  submitButtonOptions: Partial<SubmitButtonOptions>;
  /** 当开启折叠时,是否显示收起展开按钮 */
  showAdvancedButton: boolean;
}

// 表单子项配置
export type FormSchema = ComponentMap &
  FormItemGiProps & {
    path: string;
    suffix?: string | number | ((values: RenderCallbackParams) => string | number); // 组件后面插槽
    changeEvent?: string; // 表单更新事件名称
    // giProps?: Partial<GridItemProps>;
    defaultValue?: any; // 所渲渲染组件的初始值
    show?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);
    ifShow?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean); // 动态判断当前组件是否显示，js 控制，会删除 dom
    render?: (renderCallbackParams: RenderCallbackParams) => VNode | VNode[] | string; // 自定义渲染组件
    renderComponentContent?:
      | ((renderCallbackParams: RenderCallbackParams) => any)
      | VNode
      | VNode[]
      | string; // 自定义渲染组内部的 slot
    slot?: string; // 自定义 slot，渲染组件
    dynamicDisabled?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean); // 动态判断当前组件是否禁用
    dynamicRules?: (renderCallbackParams: RenderCallbackParams) => FormItemRule[]; // 动态判返当前组件的校验规则
  };

// 扩展form组件配置
export interface BasicFormProps extends FormProps {
  /** 自动设置 placeholder */
  autoSetPlaceHolder?: boolean;
  /** 表单配置规则 */
  schemas?: FormSchema[];
  /** 额外传递到子组件的参数 values */
  mergeDynamicData?: Recordable;
  /** 用于将表单内时间区域的应设成 2 个字段 */
  pathMapToTime?: PathMapToTime;
  /** 时间转换函数 */
  transformDateFunc?: (date: any) => string;
  /** label 默认位置 */
  labelPlacement?: LabelPlacement;
  /** labelAlign 默认位置 */
  labelAlign?: LabelAlign;
  // 表单布局方式
  formGrid: GridProps;
  /** 表单子选项配置 */
  formItem: FormItemGiProps;
  // 表单操作栏配置
  formAction: FormAction;
}

// 表单操作事件
export interface FormActionType extends FormInst {
  submit: (e?: Event | undefined) => Promise<void>; // 提交表单
  resetPaths: () => Promise<void>; // 重置表单值
  getPathsValue: () => Recordable; // 获取表单值
  setPathsValue: (values: Record<string, any>) => Promise<void>; // 设置表单字段值
  updateSchema: (data: Partial<FormSchema> | Partial<FormSchema>[]) => Promise<void>; // 更新表单的 schema, 只更新函数所传的参数
  resetSchema: (data: Partial<FormSchema> | Partial<FormSchema>[]) => Promise<void>; // 重置表单 schema
  setProps: (formProps: Partial<FormProps>) => Promise<void>; // 设置表单 Props
  removeSchemaByPath: (path: string | string[]) => Promise<void>; // 根据 path 删除 Schema
  appendSchemaByPath: (
    schema: FormSchema,
    prefixPath: string | undefined,
    first?: boolean | undefined,
  ) => Promise<void>; //  插入到指定 Path 后面，如果没传指定 Path，则插入到最后,当 first = true 时插入到第一个位置
}

export type RegisterFn = (formInstance: FormActionType) => void;
export type UseFormReturnType = [RegisterFn, FormActionType];
