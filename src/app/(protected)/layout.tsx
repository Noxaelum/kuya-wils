import '../globals.css';
import { AuthorizedLayout } from '@/components/AuthorizedLayout';

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthorizedLayout>{children}</AuthorizedLayout>;
}
