// src/types/item.ts
export interface ApiResponse<T> {
  statusCode: number;
  data: T;           // 실제 데이터는 이 필드에 있음
  message: string;
}

export interface Item {
  id: number;
  tenantId: string;
  name: string;
  memo?: string;
  imageUrl?: string;
  isCompleted: boolean;
}