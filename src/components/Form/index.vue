<script setup lang="ts">
  import type { BasicFormProps, FormSchema, FormActionType } from './types';

  import { basicProps } from './props';
  import { useFormEvents } from './hooks/useFormEvents';
  import { useFormValues } from './hooks/useFormValues';

  import { NFormItemGi } from 'naive-ui';
  import { isFunction, isBoolean, merge } from 'lodash-es';
  import { dateUtil } from '@/utils';

  import FormItemComponent from './components/FormItemComponent.vue';
  import FormAction from './components/FormAction.vue';

  const attrs = useAttrs();
  const props = defineProps(basicProps);
  const emits = defineEmits(['reset', 'submit', 'register', 'pathValueChange'] as string[]);

  // 表单数据
  const formModel = reactive<any>({});
  // 表单选项默认值
  const defaultValueRef = ref<Recordable>({});
  // 存放 schema
  const schemaRef = ref<Nullable<FormSchema[]>>(null);
  // 存放表单实例
  const formElRef = ref<Nullable<FormActionType>>();
  // 判断表单实例是否初始化
  const isInitedDefaultRef = ref(false);
  // 通过 setProps 注入的值
  const propsRef = ref<Partial<BasicFormProps>>({});

  // 获取最初传入的 props 和通过 setProps 事件传入的 props 合集
  const getProps = computed(() => merge({ ...(props as BasicFormProps) }, propsRef.value));
  // 获取在调用实例上绑定的值, 传递到 n-from 上
  const getBindValue = computed(() => ({ ...attrs, ...props, ...unref(getProps) }));
  // 获取传入的 schema 并处理
  const getSchema = computed((): FormSchema[] => {
    const schemas: FormSchema[] = unref(schemaRef) || (unref(getProps).schemas as any);
    for (const schema of schemas) {
      const { defaultValue, component } = schema;
      // 处理时间相关组件的默认值
      if (defaultValue && ['NDatePicker', 'NTimePicker'].includes(component)) {
        if (!Array.isArray(defaultValue)) {
          schema.defaultValue = dateUtil(defaultValue);
        } else {
          const def: any[] = [];
          defaultValue.forEach((item) => {
            def.push(dateUtil(item));
          });
          schema.defaultValue = def;
        }
      }
    }
    if (unref(getProps).formAction.showAdvancedButton) {
      return schemas.filter((schema) => schema.component !== 'NDivider');
    } else {
      return schemas;
    }
  });

  // 获取需要展示的 schema
  const schemas = computed(() => getSchema.value.filter((item) => getShow(item).isIfShow));
  // 获取绑定到 n-grid 上的值
  const getBindGridValue = computed(() => getProps.value.formGrid);

  const { handleFormValues, initDefault } = useFormValues({
    getProps,
    defaultValueRef,
    getSchema,
    formModel,
  });

  const {
    resetPaths,
    handleSubmit,
    restoreValidation,
    validate,
    getPathsValue,
    updateSchema,
    resetSchema,
    appendSchemaByPath,
    removeSchemaByPath,
    setPathsValue,
  } = useFormEvents({
    emits,
    getProps,
    formModel,
    getSchema,
    defaultValueRef,
    formElRef: formElRef as Ref<FormActionType>,
    schemaRef: schemaRef as Ref<FormSchema[]>,
    handleFormValues,
  });

  const setProps = async (formProps: Partial<BasicFormProps>) => {
    propsRef.value = merge(unref(propsRef) || {}, formProps);
  };

  const setFormModel = (key: string, value: any) => {
    formModel[key] = value;
    // validate();
    emits('pathValueChange', key, value);
  };

  /** 按下回车键提交表单 */
  const handleEnterPress = (e: KeyboardEvent) => {
    const { formAction } = unref(getProps);
    if (!formAction!.submitButtonOptions!.autoSubmitOnEnter) return;
    if (e.key === 'Enter' && e.target && e.target instanceof HTMLElement) {
      const target: HTMLElement = e.target as HTMLElement;
      if (target && target.tagName && target.tagName.toUpperCase() == 'INPUT') {
        handleSubmit();
      }
    }
  };
  // 获取绑定到 form-item-gi 上的值
  const getBindItemValue = (item: FormSchema) => {
    if (item.required && !item.rule) {
      item.rule = { required: true, message: `${item.label}为必填项` };
    }
    return { ...(getProps.value.formItem as any), ...item };
  };
  // 判断组件是否展示
  function getShow(item: FormSchema): { isShow: boolean; isIfShow: boolean } {
    const { show, ifShow } = item;
    const { mergeDynamicData } = getProps.value;
    const itemArgs = {
      path: item.path,
      model: formModel,
      values: { ...mergeDynamicData, ...defaultValueRef.value, ...formModel } as Recordable<any>,
      schema: item,
    };

    let isShow = true;
    let isIfShow = true;

    if (isBoolean(show)) {
      isShow = show;
    }
    if (isBoolean(ifShow)) {
      isIfShow = ifShow;
    }
    if (isFunction(show)) {
      isShow = show(itemArgs);
    }
    if (isFunction(ifShow)) {
      isIfShow = ifShow(itemArgs);
    }
    isShow = isShow;
    return { isShow, isIfShow };
  }
  // 获取需要绑定到组件上的值
  const getBindComponentValue = computed(() => {
    return {
      getProps: unref(getProps),
      defaultValueRef: unref(defaultValueRef),
      formModel,
      formActionType,
    };
  });
  // 获取需要绑定到操作栏上的值
  const getBindActionValue = computed(() => {
    const { formAction, formGrid, formItem } = getProps.value;
    const { showAdvancedButton, resetButtonOptions, submitButtonOptions } = formAction;
    return {
      schemas: schemas.value,
      formGrid,
      formItem,
      showAdvancedButton,
      resetButtonOptions,
      submitButtonOptions,
    };
  });

  // 操作栏点击事件
  const action = (type: string) => {
    if (type === 'reset') {
      resetPaths();
    } else if (type === 'submit') {
      handleSubmit();
    } else if (type === 'toggle') {
      const { formGrid } = getProps.value;
      propsRef.value = merge(unref(propsRef) || {}, {
        formGrid: { collapsed: !formGrid.collapsed },
      });
    }
  };

  const formActionType: FormActionType = {
    submit: handleSubmit,
    getPathsValue,
    setPathsValue,
    resetPaths,
    updateSchema,
    resetSchema,
    setProps,
    removeSchemaByPath,
    appendSchemaByPath,
    restoreValidation,
    validate,
  };

  // 监听表项中收集到的值的对象
  watch(
    () => unref(getProps).model,
    () => {
      const { model } = unref(getProps);
      if (!model) return;
      setPathsValue(model);
    },
    { immediate: true, deep: true },
  );

  watch(
    () => unref(getProps).schemas,
    (schemas) => {
      resetSchema(schemas ?? []);
    },
    { immediate: true, deep: true },
  );

  watch(
    () => getSchema.value,
    (schema) => {
      if (unref(isInitedDefaultRef)) {
        return;
      }
      if (schema?.length) {
        initDefault();
        isInitedDefaultRef.value = true;
      }
    },
  );

  onMounted(() => {
    initDefault();
    emits('register', formActionType);
  });
</script>

<template>
  <n-form
    ref="formElRef"
    v-bind="getBindValue"
    :model="formModel"
    @keypress.enter="handleEnterPress"
  >
    <n-grid v-bind="getBindGridValue">
      <template v-for="item in schemas" :key="item.path">
        <NFormItemGi v-show="getShow(item).isShow" v-bind="{ ...getBindItemValue(item) }">
          <FormItemComponent
            :schema="item"
            v-bind="getBindComponentValue"
            @path-value-change="setFormModel"
          >
            <template v-for="item in Object.keys($slots)" #[item]="data">
              <slot :name="item" v-bind="data || {}"></slot>
            </template>
          </FormItemComponent>
        </NFormItemGi>
      </template>
      <NFormItemGi v-if="getProps.formAction.show" suffix v-bind="getProps.formAction.actionGi">
        <FormAction v-bind="getBindActionValue" @action="action" />
      </NFormItemGi>
    </n-grid>
  </n-form>
</template>
