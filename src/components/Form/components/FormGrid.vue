<script setup lang="ts">
  import type { FormSchema, BasicFormProps, FormActionType } from '../types';
  import type { ComponentType } from '../component';
  import { NFormItemGi } from 'naive-ui';
  import { upperFirst, isFunction, isBoolean } from 'lodash-es';
  import { componentMap } from '../componentMap';

  const props = defineProps({
    // 表单 schemas
    schemas: { type: Array as PropType<FormSchema[]>, default: () => [] },
    // 表单 Props
    formProps: { type: Object as PropType<BasicFormProps>, default: () => ({}) },
    // 表单初始化默认值
    allDefaultValues: { type: Object as PropType<Recordable>, default: () => ({}) },
    // 表单实例的值
    formModel: { type: Object as PropType<Recordable>, default: () => ({}) },
    // 设置表单实例的值
    setFormModel: {
      type: Function as PropType<(key: string, value: any) => void>,
      default: null,
    },
    // 表格方法
    tableAction: { type: Object },
    // 表单方法
    formActionType: { type: Object as PropType<FormActionType> },
  });
  const { schemas } = toRefs(props);

  const { t } = useI18n();
  // 获取需要展示的 schema
  const schemas2 = computed(() => schemas.value.filter((item) => getShow(item).isIfShow));
  // 获取绑定到 n-grid 上的值
  const getBindGridValue = computed(() => props.formProps.formGrid);
  // 获取绑定到 form-item-gi 上的值
  const getBindItemValue = (item: FormSchema) => {
    const { isShow } = getShow(item);
    return { ...props.formProps.formItem, ...item, style: { display: isShow ? 'block' : 'none' } };
  };
  // 获取表单的值
  const getValues = (item: FormSchema) => {
    const { allDefaultValues, formModel } = props;
    const { mergeDynamicData } = props.formProps;
    return {
      path: item.path,
      model: formModel,
      values: { ...mergeDynamicData, ...allDefaultValues, ...formModel } as Recordable<any>,
      schema: item,
    };
  };

  // 生成placeholder
  function createPlaceholderMessage(component: ComponentType) {
    if (['NInput', 'Complete'].includes(component)) {
      return t('common.inputText');
    }
    if (['NSelect', 'NCascader', 'NCheckbox', 'NRadioGroup', 'NSwitch'].includes(component)) {
      return t('common.chooseText');
    }
    return '';
  }

  // 获取组件的 props
  const getComponentsProps = (item: FormSchema): any => {
    const { tableAction, formModel, formActionType } = props;
    let { componentProps = {} } = item;
    if (isFunction(componentProps)) {
      componentProps = componentProps({ item, tableAction, formModel, formActionType }) ?? {};
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
        props.setFormModel(path, value);
      },
    };
    const { autoSetPlaceHolder } = props.formProps;
    // const Comp = componentMap.get(component) as ReturnType<typeof defineComponent>;
    //  构建需要绑定到 commponent 的值, 全部默认添加清空功能
    const propsData: Recordable<any> = { clearable: true, ...getComponentsProps };
    // 生成placeholder
    if (autoSetPlaceHolder && component) {
      // 正则判断 type 是否是 'range' 结尾
      const isRange = /range$/.test(propsData.type);
      if (component === 'NDatePicker' && isRange) {
        // 数组类型的时间选择框
        propsData.startPlaceholder =
          getComponentsProps(item).startPlaceholder || createPlaceholderMessage(component);
        propsData.endPlaceholder =
          getComponentsProps(item).endPlaceholder || createPlaceholderMessage(component);
      } else {
        propsData.placeholder =
          getComponentsProps(item).placeholder || createPlaceholderMessage(component);
      }
    }
    propsData.formValues = getValues(item);

    const bindValue: Recordable<any> = () => {
      let value = 'value';
      if (isCheck) {
        value = 'checked';
      } else if (isTree) {
        value = 'checked-keys';
      } else if (isDate) {
        value = 'formatted-value';
      }
      return { [value]: props.formModel[item.path] };
    };

    return { ...propsData, ...on, ...bindValue };
  }
</script>

<template>
  <n-grid v-bind="getBindGridValue">
    <NFormItemGi v-for="item in schemas2" :key="item.path" v-bind="getBindItemValue(item)">
      <component :is="componentMap.get(item.component)" v-bind="getBindComponentValue"></component>
    </NFormItemGi>
  </n-grid>
</template>

<style scoped></style>
