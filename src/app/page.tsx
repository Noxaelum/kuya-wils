'use client';

import { Authenticated, Unauthenticated, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

export default function Home() {
  const tasks = useQuery(api.tasks.get);
  return (
    <div>
      <header className='flex justify-end items-center p-4 gap-4 h-16'>
        {/* Show the sign-in and sign-up buttons when the user is signed out */}
        <Unauthenticated>
          <SignInButton mode='modal' />
          <SignUpButton mode='modal'>
            <button className='bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer'>
              Sign Up
            </button>
          </SignUpButton>
        </Unauthenticated>
        {/* Show the user button when the user is signed in */}
        <Authenticated>
          <UserButton />
        </Authenticated>
      </header>
      <div>Hello World</div>
      <div>
        {tasks?.map(({ _id, text }) => (
          <div key={_id}>{text}</div>
        ))}
      </div>
    </div>
  );
}
