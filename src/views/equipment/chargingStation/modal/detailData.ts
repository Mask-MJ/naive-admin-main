import type { DescItem } from '@/components/Descriptions';
import type { SelectPickerOption } from '@/components/Form';

import { NImage, NImageGroup } from 'naive-ui';

const basicSchema: DescItem[] = [
  { path: 'name', label: '充电站名称', span: 3 },
  {
    path: 'operationType',
    label: '运营类型',
    render: (curVal) => (curVal === 1 ? '自营' : curVal == 2 ? '加盟' : '第三方'),
  },
  {
    path: 'stationType',
    label: '站点类型',
    render: (curVal) => (curVal === 1 ? '个人' : curVal == 2 ? '公用' : '专用(公交)'),
  },
  {
    path: 'isChargeCar',
    label: '是否为充电车',
    span: 3,
    render: (curVal) => (curVal === 1 ? '是' : '否'),
  },
  {
    path: 'chargeCarModel',
    label: '充电车类型',
    show: (data) => data.isChargeCar,
  },
  { path: 'licensePlate', label: '充电车车牌号', show: (data) => data.isChargeCar },
  { path: 'tslModelName', label: '物模型', show: (data) => data.isChargeCar },
  {
    path: 'placeType',
    label: '建设场所',
    render: (curVal) => ['居民区', '公共机构', '事业单位', '写字楼', '其他'][curVal - 1],
    show: (data) => !data.isChargeCar,
  },
  {
    path: 'positionType',
    label: '站点位置',
    render: (curVal) => (curVal === 1 ? '室内地面' : curVal == 2 ? '室内地下' : '室外'),
    show: (data) => !data.isChargeCar,
  },
  {
    path: 'internalSn',
    label: '内部编号',
  },
  {
    path: 'province',
    label: '省',
    show: (data) => !data.isChargeCar,
  },
  {
    path: 'city',
    label: '市',
    show: (data) => !data.isChargeCar,
  },
  {
    path: 'district',
    label: '区',
    show: (data) => !data.isChargeCar,
  },
  {
    path: 'address',
    label: '安装地址',
    show: (data) => !data.isChargeCar,
  },
];

const picSchema: DescItem[] = [
  {
    path: 'images',
    label: '图片',
    render: (data) => {
      return h(NImageGroup, {}, () =>
        data?.map((item: string) =>
          h(NImage, { style: { width: '100px', marginRight: '24px' }, src: item }),
        ),
      );
    },
  },
];

const estateSchema: DescItem[] = [
  { path: 'propertyRightUnit', label: '产权单位', span: 3 },
  { path: 'linkman', label: '联系人' },
  { path: 'tel', label: '联系电话' },
  { path: 'carportAmount', label: '车位数量' },
  { path: 'propertyDescription', label: '物业描述', span: 3 },
];
const circuitSchema: DescItem[] = [
  {
    path: 'kva',
    label: '供电容量',
    render: (curVal) => (curVal ? `${curVal}kw` : ''),
  },
  {
    path: 'kvType',
    label: '电压等级',
    render: (curVal) => (curVal ? (curVal == 1 ? '标准' : '低压') : ''),
  },
  { path: 'supplyLine', label: '供电线路' },
];

export const detailData = [
  { id: 1, title: '基础数据', schema: basicSchema },
  { id: 2, title: '站点图片', schema: picSchema },
  { id: 3, title: '物业信息', schema: estateSchema },
  { id: 4, title: '电路信息', schema: circuitSchema },
];

export const options: SelectPickerOption[] = [
  { label: '尖', type: 'error', path: 'tipTime' },
  { label: '峰', type: 'warning', path: 'peakTime' },
  { label: '平', type: 'success', path: 'ordinaryTime' },
  { label: '谷', type: 'info', path: 'valleyTime' },
];
