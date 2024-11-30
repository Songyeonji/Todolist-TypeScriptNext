import { notFound } from 'next/navigation';
import { ItemDetail } from '../../../components/todo/ItemDetail';

interface ItemDetailPageProps {
  params: { id: string }
}

export default function ItemDetailPage({ params }: ItemDetailPageProps) {
  // Promise.resolve() 제거
  const id = Number(params.id);

  if (isNaN(id)) {
    return notFound();
  }

  return <ItemDetail id={id} />;
}