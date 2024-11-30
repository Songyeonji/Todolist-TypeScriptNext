// src/app/page.tsx
import { ItemList } from '../components/todo/ItemList';

export default function Home() {
  return (
    <div className="space-y-6  px-4 py-4" >
      <ItemList />
    </div>
  );
}