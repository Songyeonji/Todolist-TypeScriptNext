import React from 'react';
import Link from 'next/link';
import { Item } from '../../types/item';
import { Checkbox } from '../common/CheckBox';

interface ItemListItemProps {
  item: Item;
  onToggle: () => void;
}

export const ItemListItem = React.memo(({ item, onToggle }: ItemListItemProps) => {
  // 체크박스 클릭 핸들러 수정
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();  // 이벤트 버블링 방지
  };

  return (
    <Link href={`/items/${item.id}`} className="block mb-2">
      <div
        className={`flex items-center gap-4 p-3 rounded-full border-2 border-slate-900 
          transition-colors duration-200 ease-in-out
          ${item.isCompleted ? 'bg-[#EDE9FE]' : 'bg-white hover:bg-gray-50'}`}
      >
        <div onClick={handleCheckboxClick}>
          <Checkbox 
            checked={item.isCompleted} 
            onToggle={onToggle}  // 직접 onToggle 전달
          />
        </div>
        <span
          className={`font-bold text-base truncate
            ${item.isCompleted ? 'text-gray-500 line-through' : 'text-slate-900'}`}
        >
          {item.name}
        </span>
      </div>
    </Link>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.item.id === nextProps.item.id &&
    prevProps.item.isCompleted === nextProps.item.isCompleted &&
    prevProps.item.name === nextProps.item.name
  );
});

ItemListItem.displayName = 'ItemListItem';