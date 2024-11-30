// src/app/items/[id]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ItemDetail } from '../../../components/todo/ItemDetail';

// Props 타입 수정 - searchParams도 Promise로 정의
type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// generateMetadata에서 모든 Promise 처리
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  await searchParams; // searchParams도 await 처리
  return {
    title: `Item ${resolvedParams.id}`,
  };
}

// 페이지 컴포넌트에서도 모든 Promise 처리
export default async function ItemDetailPage({ params, searchParams }: Props) {
  try {
    const resolvedParams = await params;
    await searchParams; // searchParams도 await 처리
    const id = Number(resolvedParams.id);

    if (isNaN(id)) {
      return notFound();
    }

    return <ItemDetail id={id} />;
  } catch (error) {
    console.error('Error:', error);
    return notFound();
  }
}