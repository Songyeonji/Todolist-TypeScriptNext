// src/lib/api.ts
import axios from 'axios';
import { Item} from '../types/item';

const TENANT_ID = 'songyeonji';
const BASE_URL = 'https://assignment-todolist-api.vercel.app/api';

const api = axios.create({
    baseURL: BASE_URL,
});

export const itemApi = {
    // GET /{tenantId}/items - 항목 목록 조회
    getItems: async () => {
        const response = await api.get<Item[]>(`/${TENANT_ID}/items`);
        return response.data;  // 응답이 바로 배열
    },

    // GET /{tenantId}/items/{id} - 항목 상세 조회
    getItemById: async (id: number): Promise<Item> => {
        const response = await api.get<Item>(`/${TENANT_ID}/items/${id}`);
        return response.data;  // 직접 Item 타입 반환
      },
    // POST /{tenantId}/items - 항목 등록
    createItem: async (data: { name: string; memo?: string }) => {
        const response = await api.post<Item>(`/${TENANT_ID}/items`, data);
        return response.data;  // 응답이 바로 아이템
    },

    // PATCH /{tenantId}/items/{id} - 항목 수정
    updateItem: async (id: number, data: { name?: string; memo?: string; isCompleted?: boolean }) => {
        const response = await api.patch<Item>(`/${TENANT_ID}/items/${id}`, data);
        return response.data;  // 응답이 바로 아이템
    },

    // DELETE /{tenantId}/items/{id} - 항목 삭제
    deleteItem: async (id: number) => {
        try {
            await api.delete(`/${TENANT_ID}/items/${id}`);
            return true;
        } catch (error) {
            console.error('Delete error:', error);
            throw error;
        }
    },

    // 이미지 업로드 메서드 수정
    uploadImage: async (id: number, file: File) => {
        // 1. FormData 생성
        const formData = new FormData();
        formData.append('image', file);

        try {
            // 2. 이미지 업로드
            const uploadResponse = await api.post<{ url: string }>(
                `/${TENANT_ID}/images/upload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (!uploadResponse.data.url) {
                throw new Error('이미지 URL을 받지 못했습니다.');
            }

            // 3. 아이템 업데이트
            const updateResponse = await api.patch<Item>(
                `/${TENANT_ID}/items/${id}`,
                { imageUrl: uploadResponse.data.url }
            );

            return updateResponse.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || error.message;
                throw new Error(`이미지 업로드 실패: ${errorMessage}`);
            }
            throw error;
        }
    },
};
