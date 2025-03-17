import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Daily Task Manager',
  description: 'NODA Withdrawal Times Task Distribution System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen px-4 py-8 md:px-8 lg:px-16">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-center text-primary">Daily Task Manager</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
} 