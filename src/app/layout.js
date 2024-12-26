import './globals.css';

export const metadata = {
  title: '로아 도우미 : LoaGuide',
  description: '로아 도우미 : LoaGuide',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
