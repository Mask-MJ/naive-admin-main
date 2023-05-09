<script setup lang="ts">
  import { FormInst } from 'naive-ui';
  import { merge } from 'lodash-es';

  const emits = defineEmits(['submit']);
  const props = defineProps({
    listActive: { type: Number, default: null },
    data: { type: Object, default: () => ({}) },
  });
  const drawer = ref(false);
  const formRef = ref<FormInst | null>(null);
  const formValue = ref();

  const upDataFormatter = () => {
    formValue.value.option.series[0].detail.formatter = `{value} ${formValue.value.unit} \n ${formValue.value.title}`;
  };

  const upDataRadius = () => {
    formValue.value.option.series[1].radius = formValue.value.option.series[0].radius;
  };

  const handleCreate = (value: string): any => ({ label: value, value: value.split(',') });

  watchEffect(() => {
    if (props.listActive !== null) {
      drawer.value = true;
      formValue.value = props.data;
    } else {
      // 提交表单数据
      emits('submit', merge(props.data, formValue.value));
      drawer.value = false;
    }
  });
</script>

<template>
  <n-drawer
    v-model:show="drawer"
    :width="250"
    placement="right"
    :show-mask="false"
    :block-scroll="false"
    to="#drawer-target"
    @click.stop="false"
  >
    <n-drawer-content>
      <n-form ref="formRef" :model="formValue" label-placement="left">
        <n-form-item label="标题">
          <n-input v-model:value="formValue.title" @update:value="upDataFormatter" />
        </n-form-item>
        <n-form-item label="单位">
          <n-input v-model:value="formValue.unit" @update:value="upDataFormatter" />
        </n-form-item>
        <n-form-item label="倍率">
          <n-input v-model:value="formValue.option.series[0].radius" @update:value="upDataRadius" />
        </n-form-item>
        <n-form-item label="行高">
          <n-input-number v-model:value="formValue.option.series[0].detail.lineHeight" />
        </n-form-item>
        <n-form-item label="字体大小">
          <n-input-number v-model:value="formValue.option.series[0].detail.fontSize" />
        </n-form-item>
        <n-form-item label="字体颜色">
          <n-input v-model:value="formValue.option.series[0].detail.color" />
        </n-form-item>
        <n-form-item label="字体位置(x)">
          <n-input v-model:value="formValue.option.series[0].detail.offsetCenter[0]" />
        </n-form-item>
        <n-form-item label="字体位置(y)">
          <n-input v-model:value="formValue.option.series[0].detail.offsetCenter[1]" />
        </n-form-item>
        <n-form-item label="分割区间">
          <n-input-number v-model:value="formValue.option.series[0].splitNumber" />
        </n-form-item>
        <n-form-item label="最小值">
          <n-input-number v-model:value="formValue.option.series[0].min" />
        </n-form-item>
        <n-form-item label="最大值">
          <n-input-number v-model:value="formValue.option.series[0].max" />
        </n-form-item>
        <n-form-item v-if="['1', '2'].includes(props.data.type)" label="主题色">
          <n-input v-model:value="formValue.option.series[0].itemStyle.color" />
        </n-form-item>
        <n-form-item v-if="['3', '4'].includes(props.data.type)" label="主题色">
          <n-select
            v-model:value="formValue.option.series[0].axisLine.lineStyle.color"
            filterable
            multiple
            tag
            @create="handleCreate"
          />
        </n-form-item>
      </n-form>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped></style>
