import './css/app.css'
import '@mantine/core/styles.css'
import { ReactElement } from 'react'
import { client, queryClient } from './client'
import Layout from '~/layouts/default'
import { Data } from '@generated/data'
import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { TuyauProvider } from '@adonisjs/inertia/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { MantineProvider } from '@mantine/core'
import { theme } from './theme'
import { QueryClientProvider } from '@tanstack/react-query'

const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  resolve: (name) => {
    return resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob('./pages/**/*.tsx'),
      (page: ReactElement<Data.SharedProps>) => <Layout children={page} />
    )
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <TuyauProvider client={client}>
        <QueryClientProvider client={queryClient}>
          <MantineProvider theme={theme}>
            <App {...props} />
          </MantineProvider>
        </QueryClientProvider>
      </TuyauProvider>
    )
  },
  progress: {
    color: '#4B5563',
  },
})
