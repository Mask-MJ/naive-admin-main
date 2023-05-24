<script setup lang="ts">
  import type { OptionsItem } from '../component';

  import { isString } from 'lodash-es';

  const attrs = useAttrs();
  const props = defineProps({
    type: { type: String, default: '' },
    options: { type: Array, default: () => {} },
  });

  const getAttrs = computed(() => ({ ...props, ...attrs }));
  const getOptions = computed((): OptionsItem[] => {
    const { options } = props;
    if (!options || options?.length === 0) return [];

    const isStringArr = options.some((item) => isString(item));
    if (!isStringArr) return options as OptionsItem[];
    return options.map((item) => ({ label: item, value: item })) as OptionsItem[];
  });
</script>

<template>
  <n-radio-group v-bind="getAttrs">
    <template v-if="type === 'Button'">
      <n-radio-button
        v-for="item in getOptions"
        :key="`${item.value}`"
        :label="item.label"
        :value="item.value"
      />
    </template>
    <n-space v-else>
      <n-radio
        v-for="item in getOptions"
        :key="`${item.value}`"
        :label="item.label"
        :value="item.value"
      />
    </n-space>
  </n-radio-group>
</template>

<style scoped></style>
