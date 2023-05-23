export interface DeptList {
  deptId: string;
}

export interface DeptSearchParams {
  deptName?: string;
  status?: string;
}

export interface DeptParams {
  deptName: string;
  leader?: string;
  phone?: number;
  email?: string;
  orderNum?: number;
  status: string;
  parentId?: string;
}
