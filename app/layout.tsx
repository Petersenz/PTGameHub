import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PTGameHub | Ultimate Free Gaming Discovery',
  description: 'Explore, analyze and compare over 400+ free-to-play games with PTGameHub.',
  keywords: ['PTGameHub', 'Free-to-Play', 'Gaming', 'Game Discovery', 'Game Analysis', 'Game Comparison'],
  authors: [{ name: 'Petersen' }],
  publisher: 'Petersen',
  icons: {
    icon: '/logo.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} selection:bg-primary-500 selection:text-white`}>
        <Providers>
          <div className="min-h-screen bg-white dark:bg-dark-950 flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-8 flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}