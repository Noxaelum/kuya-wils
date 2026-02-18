'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from 'convex/react';
import { useEffect } from 'react';
import { api } from '../../convex/_generated/api';

export function AuthorizedLayout({ children }: { children: React.ReactNode }) {
  const authCheck = useQuery(api.auth.checkUserAuthorization);
  const router = useRouter();

  useEffect(() => {
    if (authCheck !== undefined && !authCheck.authorized) {
      router.push('/not-authorized');
    }
  }, [authCheck, router]);

  if (authCheck === undefined) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}
