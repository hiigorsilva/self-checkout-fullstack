import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { RootProviders } from '@/providers'

const poppins = Poppins({
  weight: ['400', '600'],
  display: 'swap',
  variable: '--font-sans',
  subsets: ['latin'],
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: 'Self Checkout',
    template: '%s | Self Checkout',
  },
  description: 'Onde a fome tem resposta rápida ',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.className} antialiased`}>
        <RootProviders>
          <div className="min-h-dvh w-full flex flex-col">{children}</div>
        </RootProviders>
      </body>
    </html>
  )
}
