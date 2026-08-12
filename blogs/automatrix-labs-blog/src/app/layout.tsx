import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Instrument_Serif } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })
const instrumentSerif = Instrument_Serif({ subsets: ['latin'], weight: '400', variable: '--font-display' })

export const metadata: Metadata = {
  title: {
    default: 'AutoMatrix Labs',
    template: '%s | AutoMatrix Labs',
  },
  description: 'AI news, tutorials, tools reviews, and research insights from the frontier.',
  metadataBase: new URL('https://automatrix-blog.vercel.app'),
  openGraph: {
    siteName: 'AutoMatrix Labs',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@automatrixlabs',
  },
  robots: { index: true, follow: true },
  verification: {
    google: 'CLYBIxAwBq2Y-HyMCLEPpE5n3gyJFsIP7BX1EGpFKB0',
  },
}

// Sitewide WebSite + Organization JSON-LD -- previously only individual
// blog posts carried any schema at all; the homepage and static pages had
// none. Rendered once here instead of duplicated per-page.
const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://automatrix-blog.vercel.app/#website',
      url: 'https://automatrix-blog.vercel.app',
      name: 'AutoMatrix Labs',
      description: 'AI news, tutorials, tools reviews, and research insights from the frontier.',
      publisher: { '@id': 'https://automatrix-blog.vercel.app/#organization' },
    },
    {
      '@type': 'Organization',
      '@id': 'https://automatrix-blog.vercel.app/#organization',
      name: 'AutoMatrix Labs',
      url: 'https://automatrix-blog.vercel.app',
      logo: { '@type': 'ImageObject', url: 'https://automatrix-blog.vercel.app/logo.png' },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
