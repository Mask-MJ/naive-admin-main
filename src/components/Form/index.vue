<script setup lang="ts">
  import type { BasicFormProps, FormSchema, FormActionType } from './types';
  import type { ComponentType } from './component';
  import { merge } from 'lodash';
  import { dateUtil } from '@/utils';
  import { basicProps } from './props';
  import { useFormEvents } from './hooks/useFormEvents';
  import { useFormValues } from './hooks/useFormValues';
  import { NFormItemGi } from 'naive-ui';
  import { upperFirst, isFunction, isBoolean } from 'lodash-es';
  import { componentMap } from './componentMap';

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
  const propsRef = ref<Partial<BasicFormProps>>({
    formGrid: {
      collapsed: true,
    },
  });

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
    if (!formAction.submitButtonOptions.autoSubmitOnEnter) return;
    if (e.key === 'Enter' && e.target && e.target instanceof HTMLElement) {
      const target: HTMLElement = e.target as HTMLElement;
      if (target && target.tagName && target.tagName.toUpperCase() == 'INPUT') {
        handleSubmit();
      }
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

  const { t } = useI18n();
  // 获取需要展示的 schema
  const schemas = computed(() => getSchema.value.filter((item) => getShow(item).isIfShow));
  // 获取绑定到 n-grid 上的值
  const getBindGridValue = computed(() => getProps.value.formGrid);
  // 获取绑定到 form-item-gi 上的值
  const getBindItemValue = (item: FormSchema) => {
    return merge(getProps.value.formItem, item);
  };
  // 获取表单的值
  const getValues = (item: FormSchema) => {
    const { mergeDynamicData } = getProps.value;
    return {
      path: item.path,
      model: formModel,
      values: { ...mergeDynamicData, ...defaultValueRef.value, ...formModel } as Recordable<any>,
      schema: item,
    };
  };

  // 生成placeholder
  function createPlaceholderMessage(component: ComponentType, type?: string) {
    if (['NInput', 'Complete'].includes(component)) {
      return t('components.form.inputText');
    }
    if (['NSelect', 'NCascader', 'NCheckbox', 'NRadioGroup', 'NSwitch'].includes(component)) {
      return t('components.form.chooseText');
    }
    if (['NDatePicker'].includes(component)) {
      if (type === 'start') {
        return t('components.form.startTime');
      } else if (type === 'end') {
        return t('components.form.endTime');
      } else {
        return t('components.form.chooseText');
      }
    }
    return '';
  }

  // 获取组件的 props
  const getComponentsProps = (item: FormSchema): any => {
    let { componentProps = {} } = item;
    if (isFunction(componentProps)) {
      componentProps = componentProps({ item, formModel, formActionType }) ?? {};
    }
    if (item.component === 'NDivider') {
      componentProps = Object.assign({ titlePlacement: 'left' }, componentProps);
    }
    return componentProps;
  };
  // 判断组件是否展示
  function getShow(item: FormSchema): { isShow: boolean; isIfShow: boolean } {
    const { show, ifShow } = item;
    let isShow = true;
    let isIfShow = true;

    if (isBoolean(show)) {
      isShow = show;
    }
    if (isBoolean(ifShow)) {
      isIfShow = ifShow;
    }
    if (isFunction(show)) {
      isShow = show(getValues(item));
    }
    if (isFunction(ifShow)) {
      isIfShow = ifShow(getValues(item));
    }
    isShow = isShow;
    return { isShow, isIfShow };
  }
  // 获取需要绑定到组件上的值
  function getBindComponentValue(item: FormSchema) {
    const { path, component, changeEvent = 'update:value' } = item;
    const isCheck = component && ['NSwitch', 'NCheckbox'].includes(component);
    const isTree = component && ['ApiTree', 'NTree'].includes(component);
    const isDate = component && ['NDatePicker'].includes(component);

    const eventKey = `on${upperFirst(changeEvent)}`;
    const on = {
      [eventKey]: (...args: Nullable<Recordable<any>>[]) => {
        const [e] = args;
        if (propsData[eventKey]) {
          propsData[eventKey](...args);
        }
        const target = e ? e.target : null;
        const value = target ? (isCheck ? target.checked : target.value) : e;
        setFormModel(path, value);
      },
    };
    const { autoSetPlaceHolder } = getProps.value;
    //  构建需要绑定到 commponent 的值, 全部默认添加清空功能
    const propsData: Recordable<any> = { clearable: true, ...getComponentsProps(item) };
    // 生成placeholder
    if (autoSetPlaceHolder && component) {
      // 正则判断 type 是否是 'range' 结尾
      const isRange = /range$/.test(propsData.type);
      if (component === 'NDatePicker' && isRange) {
        // 数组类型的时间选择框
        propsData.startPlaceholder =
          getComponentsProps(item).startPlaceholder || createPlaceholderMessage(component, 'start');
        propsData.endPlaceholder =
          getComponentsProps(item).endPlaceholder || createPlaceholderMessage(component, 'end');
      } else {
        propsData.placeholder =
          getComponentsProps(item).placeholder || createPlaceholderMessage(component);
      }
    }
    propsData.formValues = getValues(item);

    const value = isCheck
      ? 'checked'
      : isTree
      ? 'checkedKeys'
      : isDate
      ? 'formattedValue'
      : 'value';

    const bindValue = {
      [value]: formModel[item.path],
    };

    return { ...propsData, ...on, ...bindValue };
  }
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
      // emits('reset');
    } else if (type === 'submit') {
      handleSubmit();
      // emits('submit');
    } else if (type === 'toggle') {
      const { formGrid } = getProps.value;
      propsRef.value = merge(unref(propsRef) || {}, {
        formGrid: {
          collapsed: !formGrid.collapsed,
        },
      });
    }
  };
</script>

<template>
  <n-form
    ref="formElRef"
    v-bind="getBindValue"
    :model="formModel"
    @keypress.enter="handleEnterPress"
  >
    <n-grid v-bind="getBindGridValue">
      <NFormItemGi
        v-for="item in schemas"
        v-show="getShow(item).isShow"
        :key="item.path"
        v-bind="getBindItemValue(item)"
      >
        <component
          :is="componentMap.get(item.component)"
          v-bind="getBindComponentValue(item)"
        ></component>
      </NFormItemGi>
      <NFormItemGi v-if="getProps.formAction.show" suffix v-bind="getProps.formAction.actionGi">
        <FormAction v-bind="getBindActionValue" @action="action" />
      </NFormItemGi>
    </n-grid>
  </n-form>
</template>

<style scoped></style>
