import { Data } from '@generated/data'
import { toast, Toaster } from 'sonner'
import { Head, usePage } from '@inertiajs/react'
import { ReactElement, useEffect } from 'react'

const METADATA = {
  title: import.meta.env.VITE_APP_NAME,
  description: 'Your personal bookmark manager built with AdonisJS and Inertia.js',
  keywords: 'bookmarks, manager, AdonisJS, Inertia.js, React, web application',
  url: import.meta.env.VITE_APP_URL,
  favicon: '/images/favicon.png',
} as const

export default function Layout({ children }: { children: ReactElement<Data.SharedProps> }) {
  useEffect(() => {
    toast.dismiss()
  }, [usePage().url])

  if (children.props.flash.error) {
    toast.error(children.props.flash.error)
  }

  return (
    <>
      <Head>
        <title>{METADATA.title}</title>
        <meta name="description" content={METADATA.description} />
        <meta name="keywords" content={METADATA.keywords} />
        <meta name="author" content="Ayanori Toyoda" />
        <link rel="icon" type="image/png" href={METADATA.favicon} />
        <link rel="canonical" href={METADATA.url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={METADATA.title} />
        <meta property="og:description" content={METADATA.description} />
        <meta property="og:image" content={METADATA.favicon} />
        <meta property="og:url" content={METADATA.url} />
        <meta property="og:site_name" content={METADATA.title} />
      </Head>
      <main className="min-h-screen bg-[#E8F0EF]">{children}</main>
      <Toaster position="bottom-right" richColors />
    </>
  )
}
