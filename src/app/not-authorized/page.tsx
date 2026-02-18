import { UserButton } from '@clerk/nextjs';

export default function NotAuthorizedPage() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='absolute top-4 right-4'>
        <UserButton />
      </div>
      <div className='max-w-md w-full space-y-8 text-center'>
        <div>
          <h1 className='text-6xl font-bold text-gray-900 mb-4'>403</h1>
          <h2 className='text-3xl font-extrabold text-gray-900 mb-4'>
            Access Denied
          </h2>
          <p className='text-lg text-gray-600 mb-6'>
            You do not have permission to access this resource.
          </p>
        </div>
      </div>
    </div>
  );
}
