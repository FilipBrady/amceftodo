import TodoDashboard from '@/components/todoDashboard/TodoDashboard';
import UserProfileDashboard from '@/components/userProfileSection/UserProfileDashboard';

export default function Home() {
  return (
    <main className='flex min-h-screen md:w-full flex-col text-black absolute'>
      <UserProfileDashboard />
      <TodoDashboard />
    </main>
  );
}
