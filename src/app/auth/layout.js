import Header from "@/app/components/Header"

export const metadata = {
  title: 'LoaGuide : 개발키 인증',
  description: '개발키 인증 단계 입니다.',
}

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
