import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Scarlet Studio App',
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