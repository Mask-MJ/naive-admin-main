<script setup lang="ts">
  import { VueDraggable } from 'vue-draggable-plus';
  import { componentMap, data } from './data';
  import { SortableEvent } from 'sortablejs';
  import { remove, find } from 'lodash-es';
  import Drawer from './components/Drawer.vue';

  // 原始组件数据
  const list = ref(data);
  // 构建的数据
  const tags = ref<{ label: string; value: any }[]>([{ label: '仪表盘', value: [] }]);
  // 当前激活的tab页
  const tabActive = ref(0);
  // 当前列表的选中项
  const listActive = ref();
  const getActiveData = computed(() => {
    return unref(tags)[unref(tabActive)].value[unref(listActive)];
  });
  // 添加 tabs
  const handleAdd = (e: SortableEvent) => {
    unref(tags)[unref(tabActive)].value[e.newIndex ?? 0].id = Math.random()
      .toString(36)
      .substring(2);
  };
  const onCreate = (label: string) => ({ label, value: [] } as any);
  // 标记选中
  const active = (index: number | null) => {
    listActive.value = index;
  };
  const listClass = (index: number, size: string) => {
    return {
      'outline outline-gray-400': listActive.value === index,
      'w-48% h-160px': size === 'small',
      'w-full h-320px': size === 'large',
    };
  };
  // 删除选中项
  const removeList = (id: string) => {
    listActive.value = null;
    remove(unref(tags)[unref(tabActive)].value, (n: any) => n.id === id);
  };
  const upData = (data: any) => {
    let listData = find(unref(tags)[unref(tabActive)].value, { id: data.id });
    listData && (listData = data);
  };
</script>

<template>
  <div class="flex h-full" @click="active(null)">
    <VueDraggable
      v-model="list"
      :animation="150"
      :group="{ name: 'people', pull: 'clone', put: false }"
      :sort="false"
      class="flex flex-col gap-4 basic-border w-200px"
    >
      <div
        v-for="(item, index) in list"
        :key="index"
        class="cursor-move h-50px bg-gray-500/5 rounded p-4 shadow-md"
      >
        {{ item.title }}
      </div>
    </VueDraggable>
    <div id="drawer-target" class="flex flex-col m-auto">
      <div class="minH-22 mb-4 basic-border w-375px">
        <n-dynamic-tags v-model:value="tags" @create="onCreate" />
      </div>
      <n-tabs
        v-model:value="tabActive"
        class="basic-border !px-0"
        type="line"
        animated
        :tabs-padding="16"
      >
        <n-tab-pane
          v-for="(tabPane, index) in tags"
          :key="index"
          :name="index"
          :tab="tabPane.label"
        >
          <n-scrollbar style="max-height: 600px">
            <VueDraggable
              v-model="tabPane.value"
              :animation="150"
              group="people"
              class="flex justify-between flex-wrap basic-border w-375px m-auto overflow-auto min-h-500px"
              @add="handleAdd"
            >
              <div
                v-for="(item, i) in tabPane.value"
                :key="item.id"
                class="cursor-move mb-4 bg-gray-500/5 rounded shadow-md relative"
                :class="listClass(i, item.size)"
                @click.stop="active(i)"
              >
                <i
                  v-show="listActive === i"
                  class="absolute top-2 right-2 z-1 cursor-pointer text-red-400 i-carbon:task-remove"
                  @click.stop="removeList(item.id)"
                ></i>
                <component
                  :is="componentMap.get(item.component)"
                  :key="item.id"
                  :option="item.option"
                />
              </div>
            </VueDraggable>
          </n-scrollbar>
        </n-tab-pane>
      </n-tabs>
    </div>
    <Drawer :list-active="listActive" :data="getActiveData" @submit="upData" />
  </div>
</template>

<style lang="scss" scoped>
  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
  .basic-border {
    --at-apply: p-4 bg-white rounded shadow-md;
  }
</style>
