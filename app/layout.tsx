import { Nunito } from 'next/font/google'
import './globals.css'
import { Navbar } from './components/navbar/navbar'

import type { Metadata } from 'next'
import ClientOnly  from './components/client-only'
import { RegisterModal } from './components/modals/register-modal'
import { ToasterProvider } from './providers/ToasterProvider'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ClientOnly>
          <ToasterProvider/>
          <Navbar />
          <RegisterModal />
        </ClientOnly>
        {children}
        </body>
    </html>
  )
}
