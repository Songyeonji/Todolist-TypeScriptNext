import { useState, useEffect , useCallback} from 'react';
import { Item } from '../types/item';
import { itemApi } from '../lib/api';
// useItems.ts
export function useItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 아이템 가져오기
  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const data = await itemApi.getItems();
      setItems(data);
    } catch (error) {
      setError('항목을 불러오는데 실패했습니다.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 아이템 생성
  const createItem = useCallback(async (name: string) => {
    try {
      const newItem = await itemApi.createItem({ name });
      setItems(prev => [...prev, newItem]);
      return newItem;
    } catch (error) {
      console.error('Create error:', error);
      throw error;
    }
  }, []);

  // 아이템 업데이트
  const updateItem = useCallback(async (id: number, data: Partial<Item>) => {
    try {
      const updatedItem = await itemApi.updateItem(id, data);
      setItems(prev => prev.map(item => 
        item.id === id ? { ...item, ...updatedItem } : item
      ));
      return updatedItem;
    } catch (error) {
      console.error('Update error:', error);
      throw error;
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return {
    items,
    loading,
    error,
    createItem,
    updateItem,
    refreshItems: fetchItems,
  };
}