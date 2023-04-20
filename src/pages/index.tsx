import Image from 'next/image';
import { Inter } from 'next/font/google';
import TodoDashboard from '@/components/todoDashboard/TodoDashboard';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center p-5'>
      <TodoDashboard />
    </main>
  );
}
