import { notFound } from 'next/navigation';
import { ItemDetail } from '../../../components/todo/ItemDetail';

export default async function ItemDetailPage({ params }: { params: { id: string } }) {
  // params를 await로 비동기 처리
  const resolvedParams = await params;
  console.log("Resolved Params:", resolvedParams);

  const id = Number(resolvedParams.id); // resolvedParams를 사용

  if (isNaN(id)) {
      console.error("Invalid ID:", resolvedParams.id);
      return notFound();
  }
  return <ItemDetail id={id} />;
}