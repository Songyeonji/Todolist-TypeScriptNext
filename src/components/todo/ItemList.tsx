'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { useItems } from '../../hooks/useItems';
import { ItemListItem } from './ItemListItem';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { EmptyState } from './EmptyState';

export function ItemList() {
  const { items, loading, error, createItem, updateItem } = useItems();
  const [newItemName, setNewItemName] = useState('');

  // debounce를 통한 입력 최적화
  const handleInputChange = useCallback((value: string) => {
    setNewItemName(value.slice(0, 100)); // 최대 길이 제한
  }, []);

  // 아이템 추가 핸들러 메모이제이션
  const handleAddItem = useCallback(async () => {
    if (!newItemName.trim()) return;
    
    try {
      await createItem(newItemName.trim());
      setNewItemName('');
    } catch (error) {
      alert('항목 추가에 실패했습니다.');
    }
  }, [newItemName, createItem]);

  // 토글 핸들러 메모이제이션
  const handleToggle = useCallback(async (id: number, isCompleted: boolean) => {
    try {
      await updateItem(id, { isCompleted: !isCompleted });
    } catch (error) {
      alert('상태 변경에 실패했습니다.');
    }
  }, [updateItem]);

  // 필터링된 아이템 메모이제이션
  const { activeItems, completedItems } = useMemo(() => {
    if (!items) return { activeItems: [], completedItems: [] };
    return {
      activeItems: items.filter(item => !item.isCompleted),
      completedItems: items.filter(item => item.isCompleted)
    };
  }, [items]);

  // 로딩 상태 최적화
  if (loading) return <div className="flex justify-center items-center min-h-[200px]">로딩 중...</div>;
  if (error) return <div className="text-red-500 text-center">에러: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* 입력 폼 최적화 */}
      <div className="flex gap-2">
        <Input
          value={newItemName}
          onChange={handleInputChange}
          placeholder="할 일을 입력하세요"
          onEnter={handleAddItem}
          className="flex-1"
        />
        <Button
          onClick={handleAddItem}
          icon="add"
          type="button"
          disabled={!newItemName.trim()}
        >
          추가하기
        </Button>
      </div>

      {/* Todo 섹션들 */}
      <div className="lg:flex lg:gap-6 space-y-6 lg:space-y-0">
        {/* TO DO 섹션 */}
        <section className="lg:flex-1">
          <div className="mb-4">
            <Image
              src="/assets/img/todo/todo.png"
              alt="TO DO"
              width={100}
              height={36}
              className="rounded-full"
              priority
            />
          </div>
          {/* 최적화된 리스트 렌더링 */}
          <div className="space-y-2">
            {activeItems.length > 0 ? (
              activeItems.map(item => (
                <ItemListItem
                  key={item.id}
                  item={item}
                  onToggle={() => handleToggle(item.id, item.isCompleted)}
                />
              ))
            ) : (
              <EmptyState type="todo" />
            )}
          </div>
        </section>

        {/* DONE 섹션 */}
        <section className="lg:flex-1">
          <div className="mb-4">
            <Image
              src="/assets/img/todo/done.png"
              alt="DONE"
              width={100}
              height={36}
              className="rounded-full"
              loading="lazy"
            />
          </div>
          <div className="space-y-2">
            {completedItems.length > 0 ? (
              completedItems.map(item => (
                <ItemListItem
                  key={item.id}
                  item={item}
                  onToggle={() => handleToggle(item.id, item.isCompleted)}
                />
              ))
            ) : (
              <EmptyState type="done" />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}