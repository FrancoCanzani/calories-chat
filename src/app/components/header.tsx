'use client';

import * as React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

export function Header() {
  const { data: session, update } = useSession();

  return (
    <header className='sticky top-0 z-50 flex items-center justify-between w-full h-12 px-7 shrink-0 backdrop-blur-xl'>
      <div className='flex items-center justify-between space-x-2 w-full'>
        <h1 className='font-medium'>Health.AI 🥗 (beta)</h1>
        <div className='font-medium text-sm'>
          {session ? (
            <>
              <button
                onClick={() =>
                  signOut({
                    callbackUrl: `/`,
                  })
                }
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() =>
                  signIn('github', {
                    callbackUrl: `/chat`,
                  })
                }
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
