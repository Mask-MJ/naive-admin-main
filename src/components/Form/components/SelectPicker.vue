<script setup lang="ts">
  import { indexOf, remove, range } from 'lodash-es';
  import { SelectPickerOption } from '../component';
  import { inputDateRange } from '../hooks/useTimeData';

  const emits = defineEmits(['options-change', 'update:value']);
  const props = defineProps({
    options: { type: Array as PropType<SelectPickerOption[]>, default: () => [] },
    value: { type: Object as any, default: () => {} },
    readonly: { type: Boolean, default: false },
    firstChecked: { type: String, default: 'tipTime' },
  });

  const typeChecked = ref(props.firstChecked);
  const checkValues = ref(new Map());
  const timeArr = inputDateRange(['00:00', '24:00']);
  const checkNew = ref<null | number>();
  const hoverValues = ref<number[]>([]);

  const change = (e: Boolean, path: string) => {
    e && (typeChecked.value = path);
    checkNew.value = null;
  };

  const hasCheck = (value: number) =>
    indexOf(checkValues.value.get(typeChecked.value), value) !== -1;

  const checkedClass = computed(() => (num: number) => {
    let className = '';
    if (hoverValues.value.indexOf(num) !== -1) {
      className = `tag-${typeChecked.value}`;
    } else {
      for (let [key, value] of checkValues.value) {
        if (value.indexOf(num) !== -1) {
          className = `tag-${key}`;
          break;
        }
      }
    }
    return className;
  });

  const changeOption = (e: Boolean, value: number) => {
    const checkArray = checkValues.value.get(typeChecked.value);
    if (e) {
      const changeArray = new Set([value, ...hoverValues.value]);
      checkNew.value = value;
      checkValues.value.forEach((ele) => remove(ele, (n: number) => changeArray.has(n)));
      checkArray.push(...changeArray);
    } else {
      remove(checkArray, (n) => n === value);
    }
    emits('update:value', Object.fromEntries(checkValues.value));
  };

  const hoverCheck = (e: Event, value: number) => {
    if (!checkNew.value) return;
    const arr = range(
      checkNew.value > value ? value : checkNew.value,
      (checkNew.value > value ? checkNew.value : value) + 1,
    );
    hoverValues.value = e.type === 'mouseenter' ? arr : [];
  };

  const hoverLeave = () => {
    checkNew.value = null;
  };

  onMounted(() => {
    if (props.options) {
      props.options.forEach((ele) => {
        checkValues.value.set(ele.path, []);
      });
    }
    if (props.value) {
      checkValues.value = new Map(Object.entries(props.value));
    }
  });
</script>

<template>
  <div>
    <n-space align="center" class="tagSelect">
      <n-tag
        v-for="item in options"
        :key="item.path"
        :checked="typeChecked === item.path"
        :class="`tag-${item.path}`"
        checkable
        :disabled="readonly"
        @update:checked="change($event, item.path)"
      >
        {{ item.label }}
      </n-tag>
    </n-space>
    <n-grid :x-gap="12" :y-gap="8" :cols="8" @mouseleave="hoverLeave">
      <n-gi v-for="item in timeArr" :key="item.value">
        <n-tag
          :checked="hasCheck(item.value)"
          :class="[checkedClass(item.value)]"
          :disabled="readonly"
          checkable
          @mouseenter="hoverCheck($event, item.value)"
          @mouseleave="hoverCheck($event, item.value)"
          @update:checked="changeOption($event, item.value)"
        >
          {{ item.time }}
        </n-tag>
      </n-gi>
    </n-grid>
  </div>
</template>

<style lang="scss" scoped>
  .tagSelect {
    margin-bottom: 16px;
    .n-tag--checked {
      display: flex;
      justify-content: center;
      width: 36px;
      height: 36px;
      font-size: 18px;
    }
  }
  .tag-tipTime {
    color: #fff;
    background: #cf1322 !important;
    border-color: #ffa39e !important;
  }
  .tag-peakTime {
    color: #fff;
    background: #d46b08 !important;
    border-color: #ffd591 !important;
  }
  .tag-ordinaryTime {
    color: #fff;
    background: #389e0d !important;
    border-color: #b7eb8f !important;
  }
  .tag-valleyTime {
    color: #fff;
    background: #096dd9 !important;
    border-color: #91d5ff !important;
  }
</style>
