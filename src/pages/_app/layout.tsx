import { useState } from 'react'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { twMerge } from 'tailwind-merge'

import { Navigation } from './-components/Navigation'
import { Header } from './-components/Header'

export const Route = createFileRoute('/_app')({
  component: AppLayout,
})

function AppLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(true)

  return (
    <div className="flex w-full min-h-dvh">
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <div className="flex flex-col flex-1 items-center min-w-0">
        <Header />

        <main
          className={twMerge(
            'flex justify-center w-full transition-[max-width] duration-300 ease-in-out',
            isMenuOpen ? 'max-w-203' : 'max-w-full',
          )}
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}
