import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import './index.css'

async function enableMocks() {
  if (!import.meta.env.DEV) return
  if (import.meta.env.VITE_ENABLE_MOCKS !== 'true') return

  const { worker } = await import('@/mocks/browser')

  await worker.start({
    onUnhandledRequest: 'warn',
  })
}

async function bootstrap() {
  try {
    await enableMocks()
  } catch (error) {
    console.error('Failed to initialize MSW', error)
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

bootstrap()
