// /app/page.js
import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/home'); // '/home' 경로로 리다이렉트
  return null;
}
