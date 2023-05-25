<script setup lang="tsx">
  import type { FormSchema, FormActionType } from '../types';
  import { upperFirst, isFunction } from 'lodash-es';
  import { getSlot } from '@/utils';
  import { createPlaceholderMessage } from '../helper';
  import { componentMap } from '../componentMap';

  const slots = useSlots();
  const emits = defineEmits(['pathValueChange']);
  const props = defineProps({
    schema: { type: Object as PropType<FormSchema>, required: true },
    getProps: { type: Object as PropType<Recordable>, required: true },
    defaultValueRef: { type: Object as PropType<Recordable>, required: true },
    formModel: { type: Object as PropType<Recordable>, required: true },
    formActionType: { type: Object as PropType<FormActionType>, required: true },
  });

  const getValues = computed(() => {
    return {
      path: props.schema.path,
      model: props.formModel,
      values: {
        ...props.getProps.mergeDynamicData,
        ...props.defaultValueRef,
        ...props.formModel,
      } as Recordable<any>,
      schema: props.schema,
    };
  });

  // 获取组件的 props
  const getComponentsProps = computed(() => {
    let { componentProps = {} } = props.schema;
    if (isFunction(componentProps)) {
      componentProps =
        componentProps({
          schema: props.schema,
          formModel: props.formModel,
          formActionType: props.formActionType,
        }) ?? {};
    }
    if (props.schema.component === 'NDivider') {
      componentProps = Object.assign({ titlePlacement: 'left' }, componentProps);
    }
    return componentProps as any;
  });

  // 获取需要绑定到组件上的值
  const getBindComponentValue = computed(() => {
    const { formModel } = props;
    const { path, component, changeEvent } = props.schema;
    const isCheck = component && ['NSwitch', 'NCheckbox'].includes(component);
    const isTree = component && ['ApiTree', 'NTree'].includes(component);
    // const isDate = component && ['NDatePicker'].includes(component);

    // const eventKey = `on${upperFirst(changeEvent)}`;
    const eventKey = computed(() => {
      if (changeEvent) {
        return `on${upperFirst(changeEvent)}`;
      } else if (isTree) {
        return 'onUpdateCheckedKeys';
      } else {
        return 'onUpdate:value';
      }
    });
    const on = {
      [unref(eventKey)]: (...args: Nullable<Recordable<any>>[]) => {
        const [e] = args;
        if (propsData[unref(eventKey)]) {
          propsData[unref(eventKey)](...args);
        }
        const target = e ? e.target : null;
        const value = target ? (isCheck ? target.checked : target.value) : e;
        emits('pathValueChange', path, value);
      },
    };
    const { autoSetPlaceHolder } = props.getProps;
    //  构建需要绑定到 commponent 的值, 全部默认添加清空功能
    const propsData: Recordable<any> = { clearable: true, ...getComponentsProps.value };
    // 生成placeholder
    if (autoSetPlaceHolder && component) {
      // 正则判断 type 是否是 'range' 结尾
      const isRange = /range$/.test(propsData.type);
      if (component === 'NDatePicker' && isRange) {
        // 数组类型的时间选择框
        propsData.startPlaceholder =
          getComponentsProps.value.startPlaceholder || createPlaceholderMessage(component, 'start');
        propsData.endPlaceholder =
          getComponentsProps.value.endPlaceholder || createPlaceholderMessage(component, 'end');
      } else {
        propsData.placeholder =
          getComponentsProps.value.placeholder || createPlaceholderMessage(component);
      }
    }
    propsData.formValues = getValues.value;

    const value = isCheck ? 'checked' : isTree ? 'checkedKeys' : 'value';

    const bindValue = {
      [value]: formModel[path],
    };

    return { ...propsData, ...on, ...bindValue };
  });

  const Comp = componentMap.get(props.schema.component) as ReturnType<typeof defineComponent>;
  const compSlot = isFunction(props.schema.renderComponentContent)
    ? props.schema.renderComponentContent(unref(getValues))
    : { default: () => props.schema.renderComponentContent };

  const RenderComponent = () => {
    if (props.schema.slot) {
      return getSlot(slots, props.schema.slot, unref(getValues));
    } else if (props.schema.render) {
      return props.schema.render(unref(getValues));
    } else {
      return h(Comp, unref(getBindComponentValue), compSlot);
    }
  };
</script>

<template>
  <RenderComponent class="w-full"></RenderComponent>
</template>
