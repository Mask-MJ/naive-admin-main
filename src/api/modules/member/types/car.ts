export interface ListParams {
  licenceNumber: string;
  nickName: string;
  phoneNumber: number;
  carBrand: string;
  carSeries: string;
  carType: string;
}

export interface CarList {
  id: string;
  ownerId: string;
  licenceNumber: string;
  carBrand: string;
  carSeries: string;
  carType: string;
  phoneNumber: string;
  nickname: string;
  imageUrl: string[];
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime: string;
  userId: string;
}
