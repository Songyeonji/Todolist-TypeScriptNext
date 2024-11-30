// src/types/item.ts
export interface Item {
    id: number;
    tenantId: string;
    name: string;
    memo?: string;
    imageUrl?: string;
    isCompleted: boolean;
  }
  
  export interface ApiResponse<T> {
    statusCode: number;
    data: T;
    message: string;
  }