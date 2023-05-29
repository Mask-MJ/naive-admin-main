<script setup lang="ts">
  import type { Details, CarDetail } from '@/api/modules/member/types/management';
  import { useTable } from '@/components/Table';
  import {
    getRecordList,
    getOrderList,
    getDetails,
    getMemberCars,
    setCardStatus,
  } from '@/api/modules/member/management';
  import {
    recordSchemas,
    recordColumns,
    DescItemSchemas,
    orderColumns,
    orderSchemas,
    carDetail,
  } from './data';

  const props = defineProps({ id: { type: String, default: '' } });

  const detailsData = ref<Details>();
  const memberCars = ref<CarDetail[]>();

  const [registerRecordTable] = useTable({
    api: getRecordList,
    columns: recordColumns,
    outermost: false,
    useSearchForm: true,
    formConfig: { labelWidth: 100, schemas: recordSchemas },
    searchInfo: { id: props.id },
    rowKey: (rowData) => rowData.id,
  });

  let [registerOrderTable] = useTable();

  onMounted(async () => {
    detailsData.value = await getDetails(props.id);
    memberCars.value = await getMemberCars(props.id);
    [registerOrderTable] = useTable({
      api: getOrderList,
      columns: orderColumns,
      outermost: false,
      useSearchForm: true,
      scrollX: 1300,
      searchInfo: { phoneNumber: detailsData.value.phoneNumber },
      formConfig: { labelWidth: 100, schemas: orderSchemas },
      rowKey: (rowData) => rowData.id,
    });
  });
</script>

<template>
  <div class="memberDetail h-full flex flex-col">
    <DarkModeContainer class="p-4 rounded-lg shadow-xl mb-4">
      <Descriptions
        title="会员详细信息"
        :column="4"
        :schema="DescItemSchemas"
        :data="detailsData"
      />
    </DarkModeContainer>

    <DarkModeContainer class="p-4 rounded-lg shadow-xl flex-1">
      <n-tabs type="line" animated class="h-full" pane-wrapper-class="h-full" pane-class="h-full">
        <n-tab-pane name="0" tab="交易记录">
          <Table @register="registerRecordTable" />
        </n-tab-pane>
        <n-tab-pane name="1" tab="充电订单">
          <Table @register="registerOrderTable" />
        </n-tab-pane>
        <n-tab-pane name="2" tab="会员车辆">
          <n-grid x-gap="12" :cols="2">
            <n-gi v-for="list in memberCars" :key="list.licenceNumber">
              <n-card class="mb-4" hoverable>
                <div v-for="item in carDetail" :key="item.key" class="flex-between mb-2">
                  <span>{{ item.name }}</span> <span>{{ list[item.key] }}</span>
                </div>
              </n-card>
            </n-gi>
          </n-grid>
        </n-tab-pane>
        <n-tab-pane name="3" tab="会员卡">
          <n-grid x-gap="12" :cols="4">
            <n-gi v-for="list in detailsData?.userCard" :key="list.id">
              <n-card class="mb-4" hoverable>
                <div class="flex-between mb-2">
                  <span>卡号</span> <span>{{ list.cardCode }}</span>
                </div>
                <div class="flex-between mb-2">
                  <span>卡类型</span> <span>{{ list.type.desc }}</span>
                </div>
                <div class="flex-between">
                  <span>状态</span>
                  <NSwitch
                    v-model:value="list.status.type"
                    :checked-value="1"
                    :unchecked-value="0"
                    @update:value="setCardStatus(list.id)"
                  />
                </div>
              </n-card>
            </n-gi>
          </n-grid>
        </n-tab-pane>
      </n-tabs>
    </DarkModeContainer>
  </div>
</template>
