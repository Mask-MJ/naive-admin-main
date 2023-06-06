export interface GroupList {
  groupFather: string;
  groupFatherName: string;
  groupName: string;
  id: string;
  orderNo: number;
}

export interface GroupListParams {
  groupFather?: string;
  groupName?: string;
}

export interface GroupParams {
  groupFather?: string;
  groupName: string;
  orderNo: number;
}
