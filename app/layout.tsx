import { Nunito } from 'next/font/google'
import './globals.css'
import { Navbar } from './components/navbar/navbar'

import type { Metadata } from 'next'
import ClientOnly  from './components/client-only'
import { RegisterModal } from './components/modals/register-modal'
import { ToasterProvider } from './providers/ToasterProvider'
import { LoginModal } from './components/modals/login-modal'
import getCurrentUser from './actions/getCurrentUser'
import { RentModal } from './components/modals/rent-modal'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const currentUser = await getCurrentUser()
    
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ClientOnly>
          <ToasterProvider/>
          <Navbar currentUser={currentUser} />
          <RegisterModal />
          <LoginModal />
          <RentModal />
        </ClientOnly>
        <div className='pb-20 pt-28'> 
          {children}  
        </div>
      </body>
    </html>
  )
}
