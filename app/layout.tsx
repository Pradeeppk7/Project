import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Learning Companion',
  description: 'Intelligent tutoring platform for instructors and students',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}