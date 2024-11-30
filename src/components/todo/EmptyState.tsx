'use client';
import Image from 'next/image';

export function EmptyState({ type }: { type: 'todo' | 'done' }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-[#94A3B8] bg-gray-50 rounded-lg">
      {type === 'todo' ? (
        <>
          <Image
            src="/assets/img/empty/Type=Todo, Size=Large.png"
            alt="할 일 없음"
            width={240}
            height={240}
            className="hidden sm:block sm-6"  // 여백 조정
          />
          <Image
            src="/assets/img/empty/Type=todo, Size=Small.png"
            alt="할 일 없음"
            width={120}
            height={120}
            className="sm:hidden sm-6"  // 여백 조정
          />
          <div className="text-center">  {/* 텍스트 간격 조정 */}
            <p className="text-base font-bold">할 일이 없어요.</p>  {/* 16px, 700 weight */}
            <p className="text-base font-bold">TODO를 새롭게 추가해주세요!</p>  {/* 16px, 700 weight */}
          </div>
        </>
      ) : (
        <>
          <Image
            src="/assets/img/empty/Type=Done, Size=Large.png"
            alt="완료된 할 일 없음"
            width={240}
            height={240}
            className="hidden sm:block sm-6"  // 여백 조정
          />
          <Image
            src="/assets/img/empty/Type=Done, Size=Small.png"
            alt="완료된 할 일 없음"
            width={120}
            height={120}
            className="sm:hidden sm-6"  // 여백 조정
          />
          <div className="text-center ">  {/* 텍스트 간격 조정 */}
            <p className="text-base font-bold">아직 다 한 일이 없어요.</p>  {/* 16px, 700 weight */}
            <p className="text-base font-bold">해야 할 일을 체크해보세요!</p>  {/* 16px, 700 weight */}
          </div>
        </>
      )}
    </div>
  );
}