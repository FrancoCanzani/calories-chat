import { redirect } from 'next/navigation';
import { LoginButton } from '@/app/components/login-button';

export default async function SignInPage() {
  return (
    <div className='flex h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10'>
      <LoginButton />
    </div>
  );
}
