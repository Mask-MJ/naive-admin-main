import type { BasicColumn, FormSchema } from '@/components/Table';
import type { CarList } from '@/api/modules/member/types/car';

export const schemas: FormSchema[] = [
  { path: 'licenceNumber', label: '车牌号', component: 'NInput', span: 6 },
  { path: 'nickName', label: '会员昵称', component: 'NInput', span: 6 },
  { path: 'phoneNumber', label: '会员手机号', component: 'NInput', span: 6 },
  { path: 'carBrand', label: '车辆品牌', component: 'NInput', span: 6 },
  { path: 'carSeries', label: '车辆系列', component: 'NInput', span: 6 },
  { path: 'carType', label: '车辆型号', component: 'NInput', span: 6 },
];

export const columns: BasicColumn<CarList>[] = [
  { title: '会员昵称', key: 'nickname', width: 100 },
  { title: '会员手机号', key: 'phoneNumber', width: 100 },
  { title: '车牌号', key: 'licenceNumber', width: 100 },
  { title: '车辆品牌', key: 'carBrand', width: 100 },
  { title: '车辆系列', key: 'carSeries', width: 150 },
  { title: '车辆型号', key: 'carType', width: 150 },
  { title: '创建时间', key: 'createTime', width: 150 },
];
