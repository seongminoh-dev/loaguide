import Header from "@/components/Header"

export const metadata = {
  title: 'LoaGuide : 개발키 인증',
  description: '개발키 인증 단계 입니다.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
