<script setup lang="ts">
  import { useModalInner } from '@/components/Modal';
  const BAIDU_MAP_SDK_URL =
    'https://api.map.baidu.com/getscript?type=webgl&v=3.0&ak=yZMrnaADt0Nci7skbGBSd9YndSUT24Kc';
  const { load } = useScriptTag(BAIDU_MAP_SDK_URL);
  const emits = defineEmits(['register', 'success']);
  const city = ref('');
  const check = ref('city');
  const location = ref({ lng: 116.331398, lat: 39.897445 });
  const wrapRef = ref<HTMLDivElement | null>(null);
  let map: any = null;
  let BMap: any = null;
  async function initMap() {
    await load(true);
    BMap = (window as any).BMapGL;
    if (!unref(wrapRef)) return;
    map = new BMap.Map(unref(wrapRef));
    // 初始化地图位置
    const point = new BMap.Point(location.value.lng, location.value.lat);
    map.addOverlay(new BMap.Marker(location.value));
    // 选择地址事件
    map.addEventListener('click', (e: any) => {
      map.clearOverlays();
      map.addOverlay(new BMap.Marker(e.latlng));
      location.value = e.latlng;
    });

    map.centerAndZoom(point, 15);
    map.enableScrollWheelZoom(true);
  }

  const theLocation = () => {
    if (check.value === 'city' && city.value) {
      map.centerAndZoom(city.value, 11);
    } else if (check.value === 'location') {
      map.centerAndZoom(new BMap.Point(location.value.lng, location.value.lat), 15);
    }
  };

  const reset = () => {
    city.value = '';
    location.value = {
      lng: 116.331398,
      lat: 39.897445,
    };
    initMap();
  };

  const handleSubmit = () => {
    new BMap.Geocoder().getLocation(location.value, (rs: any) => {
      emits('success', rs);
      closeModal();
    });
  };

  const [registerModal, { closeModal }] = useModalInner((data) => {
    if (data.longitude && data.latitude) {
      location.value = { lng: data.longitude, lat: data.latitude };
    }
    initMap();
  });
</script>

<template>
  <Modal class="!w-250" @register="registerModal" @positive-click="handleSubmit">
    <n-tabs v-model:value="check" class="mb-2" type="line" animated>
      <n-tab-pane name="city" tab="快速获取">
        <n-space>
          <n-input v-model:value="city" placeholder="请输入城市" />
          <n-button @click="reset">重置</n-button>
          <n-button type="primary" @click="theLocation">查询</n-button>
        </n-space>
      </n-tab-pane>
      <n-tab-pane name="location" tab="经纬度坐标">
        <n-space>
          <n-input-number
            v-model:value="location.lng"
            placeholder="请输入经度"
            :show-button="false"
          />
          <n-input-number
            v-model:value="location.lat"
            placeholder="请输入纬度"
            :show-button="false"
          />
          <n-button @click="reset">重置</n-button>
          <n-button type="primary" @click="theLocation">查询</n-button>
        </n-space>
      </n-tab-pane>
    </n-tabs>

    <div ref="wrapRef" class="mapItem w-full h-100"></div>
  </Modal>
</template>
