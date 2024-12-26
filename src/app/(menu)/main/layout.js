import Header from "@/components/Header"

export const metadata = {
  title: 'LoaGuide',
  description: 'LoaGuide 메인화면 입니다',
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
