import { useState, useEffect, useCallback } from 'react';
import { Item } from '../types/item';
import { itemApi } from '../lib/api';

export function useItemDetail(id: number) {
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItem = useCallback(async () => {
    if (!id) return;  // id 유효성 검사 추가

    try {
      setLoading(true);
      setError(null);  // 에러 상태 초기화
      const response = await itemApi.getItemById(id);
      
      // 응답 유효성 검사
      if (!response || !response.id) {
        throw new Error('유효하지 않은 응답입니다.');
      }

      console.log('Fetched item:', response); // 디버깅용
      setItem(response);
    } catch (err) {
      console.error('Fetch error:', err);
      setItem(null); // 아이템 상태 초기화
      setError(err instanceof Error ? err.message : '항목을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  const updateItem = async (data: { name?: string; memo?: string; isCompleted?: boolean }) => {
    try {
      const updatedItem = await itemApi.updateItem(id, data);
      // updatedItem이 바로 Item 객체
      setItem(updatedItem);
      return updatedItem;
    } catch (error) {
      console.error('항목 수정 실패:', error);
      throw error;
    }
  };

  const uploadImage = async (file: File) => {
    try {
      // 파일 크기 체크 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('이미지 크기는 5MB 이하여야 합니다.');
      }

      // 파일명 체크 (영문, 숫자, 특수문자)
      const fileNameRegex = /^[a-zA-Z0-9._-]+$/;
      const fileName = file.name.split('.')[0];
      if (!fileNameRegex.test(fileName)) {
        throw new Error('파일명은 영문, 숫자, 점(.), 대시(-), 언더스코어(_)만 사용할 수 있습니다.');
      }

      // 이미지 업로드 및 상태 업데이트
      const updatedItem = await itemApi.uploadImage(id, file);
      setItem(updatedItem);
      return updatedItem;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '이미지 업로드에 실패했습니다.';
      console.error('이미지 업로드 실패:', errorMessage);
      throw new Error(errorMessage);
    }
  };

  const deleteItem = async () => {
    try {
      const result = await itemApi.deleteItem(id);
      setItem(null);
      return result;
    } catch (error) {
      console.error('항목 삭제 실패:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchItem();
  }, [id]);

  return {
    item,
    loading,
    error,
    updateItem,
    deleteItem,
    uploadImage,
  };
}
