import Image from 'next/image';
import Link from 'next/link';
import '../styles/globals.css';


export const metadata = {
  title: 'Todo List',
  description: '할 일 관리를 위한 웹 애플리케이션',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body > 
        <div className="min-h-screen bg-gray-50 pt-[56px]"> {/* 헤더 높이만큼 상단 패딩 추가 */}
          <header className="bg-white shadow fixed top-0 left-0 right-0 z-50"> {/* fixed 포지션 추가 */}
            <div className="max-w-7xl mx-auto px-4 py-2">
              <Link href="/" className="block w-fit">
                <Image
                  src="/assets/img/Size=Large.png"
                  alt="do it;"
                  width={151}
                  height={40}
                  priority
                  className="hidden sm:block cursor-pointer"
                />
                <Image
                  src="/assets/img/Size=Small.png"
                  alt="do it;"
                  width={71}
                  height={40}
                  priority
                  className="sm:hidden cursor-pointer"
                />
              </Link>
            </div>
          </header>
          <main className="max-w-7xl mx-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}