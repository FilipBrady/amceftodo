import Image from 'next/image';
import { Inter } from 'next/font/google';
import TodoDashboard from '@/components/todoDashboard/TodoDashboard';
import UserProfileDashboard from '@/components/userProfileSection/UserProfileDashboard';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col  p-5'>
      <UserProfileDashboard />
      <TodoDashboard />
    </main>
  );
}
