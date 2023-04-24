import TodoDashboard from '@/components/todoDashboard/TodoDashboard';
import UserProfileDashboard from '@/components/userProfileSection/UserProfileDashboard';

export default function Home() {
  return (
    <main className='flex min-h-screen  flex-col text-black absolute '>
      <div className='w-screen flex flex-col items-center mx-auto'>
        <UserProfileDashboard />
      </div>
      <TodoDashboard />
    </main>
  );
}
