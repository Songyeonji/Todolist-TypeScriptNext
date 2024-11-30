// src/components/todo/ItemDetail.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useItemDetail } from '../../hooks/useItemDetail';
import { Button } from '../common/Button';
import { Checkbox } from '../common/CheckBox';

interface ItemDetailProps {
  id: number;
}

export function ItemDetail({ id }: ItemDetailProps) {
  const router = useRouter();
  const { item, loading, error, updateItem, deleteItem, uploadImage } = useItemDetail(id);
  const [name, setName] = useState('');
  const [memo, setMemo] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (item) {
      setName(item.name);
      setMemo(item.memo || '');
      setIsCompleted(item.isCompleted);
    }
  }, [item]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;
  if (!item) return <div>항목을 찾을 수 없습니다.</div>;

  const handleToggle = async () => {
    try {
      await updateItem({ isCompleted: !isCompleted });
      setIsCompleted(!isCompleted);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : '상태 변경에 실패했습니다.';
      console.error('Toggle error:', err);
      alert(errorMessage);
    }
  };

  const handleSave = async () => {
    try {
      await updateItem({ name, memo });
      router.push('/');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : '수정에 실패했습니다.';
      console.error('Save error:', err);
      alert(errorMessage);
    }
  };

  const handleDelete = async () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      try {
        const success = await deleteItem();
        if (success) {
          router.push('/');
        } else {
          alert('삭제에 실패했습니다.');
        }
      } catch (error) {
        console.error('Delete error:', error);
        alert('삭제에 실패했습니다.');
      }
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await uploadImage(file);
      router.refresh();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '이미지 업로드에 실패했습니다.';
      alert(errorMessage);  // 상세한 에러 메시지 표시
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleTitleUpdate = async (newTitle: string) => {
    try {
      await updateItem({ name: newTitle });
      setName(newTitle);
      setIsEditingTitle(false);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : '제목 수정에 실패했습니다.';
      console.error('Title update error:', err);
      alert(errorMessage);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white min-h-[calc(100vh-theme('spacing.16'))] p-6 lg:p-10">
        <div className="flex flex-col gap-6">
          {/* 수정 가능한 타이틀 */}
          <div className={`flex items-center justify-center gap-4 p-4 rounded-full border-2 border-slate-900 ${isCompleted ? 'bg-[#DDD6FE]' : 'bg-white'
            }`}>
            <div className="flex items-center gap-4">
              <Checkbox checked={isCompleted} onToggle={handleToggle} />
              {isEditingTitle ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => handleTitleUpdate(name)}
                  onKeyPress={(e) => e.key === 'Enter' && handleTitleUpdate(name)}
                  className="font-bold text-[16px] text-slate-900 bg-transparent border-b-2 border-slate-900 focus:outline-none"
                  autoFocus
                />
              ) : (
                <span
                  onClick={() => setIsEditingTitle(true)}
                  className="font-bold text-[16px] text-slate-900 underline cursor-pointer"
                >
                  {name}
                </span>
              )}
            </div>
          </div>

          {/* 이미지와 메모 컨테이너 */}
          <div className="flex flex-col md:flex-col lg:grid lg:grid-cols-3 gap-6">
            {/* 이미지 영역 */}
            <div className="w-full lg:col-span-1">
              <div className={`
                rounded-2xl aspect-square md:aspect-[2/1] lg:aspect-square 
                flex items-center justify-center relative bg-slate-50 overflow-hidden
                ${item.imageUrl ? '' : 'border-[3px] border-dashed border-slate-300'}
              `}>
                {item.imageUrl ? (
                  <>
                    <Image
                      src={item.imageUrl}
                      alt="Item image"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      priority
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute right-4 bottom-4 w-16 h-16 rounded-full bg-slate-900/50 border border-black flex items-center justify-center z-10"
                    >
                      <Image
                        src="/assets/icon/edit.png"
                        alt="수정"
                        width={24}
                        height={24}
                        priority
                      />
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    <Image
                      src="/assets/img/img.png"
                      alt="이미지 기본"
                      width={64}
                      height={64}
                      className="opacity-30"
                      priority
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute right-4 bottom-4 w-16 h-16 rounded-full bg-[#E2E8F0] flex items-center justify-center"
                    >
                      <Image
                        src="/assets/icon/Property 1=Variant2.png"
                        alt="추가"
                        width={24}
                        height={24}
                        priority
                      />
                    </button>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>

            {/* 메모 영역 */}
            <div className="w-full lg:col-span-2">
              <div className="relative h-full aspect-square md:aspect-[2/1] ">
                <Image
                  src="/assets/img/memo.png"
                  alt="Memo Background"
                  fill
                  className="rounded-2xl"
                />
                <div className="relative z-10 p-6 flex flex-col h-full">
                  <h2 className="text-amber-700 font-bold text-xl text-center mb-4 pb-2 ">
                    Memo
                  </h2>
                  <div className="flex-1 flex items-center overflow-hidden">
                    <textarea
                      value={memo}
                      onChange={(e) => setMemo(e.target.value)}
                      placeholder="메모를 입력하세요"
                      className="w-full h-full bg-transparent text-[16px] text-slate-900 resize-none focus:outline-none text-center 
                        overflow-y-auto
                        [&::-webkit-scrollbar]:w-[4px]
                        [&::-webkit-scrollbar-track]:bg-transparent
                        [&::-webkit-scrollbar-thumb]:bg-[#FDE68A]
                        [&::-webkit-scrollbar-thumb]:rounded-[3px]
                        [&::-webkit-scrollbar]:h-[43px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="flex justify-end md:justify-center lg:justify-end gap-2">
            <Button
              variant="secondary"
              icon="edit"
              onClick={handleSave}
              className={`${isCompleted ? '!bg-lime-300' : ''}`}
            >
              수정 완료
            </Button>
            <Button
              variant="danger"
              icon="delete"
              onClick={handleDelete}
            >
              삭제하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}