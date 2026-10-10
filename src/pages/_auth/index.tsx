import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'

import { Wordmark } from '@/assets/svgs/Wordmark'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { SignIn } from './-components/SignIn'
import { SignUp } from './-components/SignUp'

export const Route = createFileRoute('/_auth/')({
  component: Landing,
})

function Landing() {
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const [formType, setFormType] = useState<'sign-in' | 'sign-up'>('sign-in')

  function handleOpenAuthDialog(type: 'sign-in' | 'sign-up') {
    setFormType(type)
    setAuthDialogOpen(true)
  }

  return (
    <div className="relative flex flex-col w-screen h-screen">
      <div
        className="absolute inset-y-0 left-0 -z-10 w-full max-w-480 bg-auth-landing-dark bg-cover bg-no-repeat pointer-events-none"
        aria-hidden="true"
      />

      <header className="fixed inset-x-0 top-0 z-50 flex justify-center w-full">
        <div className="flex max-w-[90%] w-full mx-8">
          <div className="flex justify-between items-center w-full h-18.75">
            <Link to="/" className="flex items-center gap-4 rounded-xs focus-ring">
              <div className="hidden sm:flex pointer-events-none">
                <img
                  src="src/assets/svgs/brand-mark.svg"
                  alt="Logo Code Blog"
                  className="w-auto h-8"
                />
              </div>

              <div className="pt-2 pointer-events-none ">
                <Wordmark width={118} />
              </div>
            </Link>

            <nav className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="md"
                onClick={handleOpenAuthDialog.bind(null, 'sign-in')}
              >
                Entrar
              </Button>

              <Button
                variant="primary"
                size="md"
                onClick={handleOpenAuthDialog.bind(null, 'sign-up')}
              >
                Cadastre-se
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="h-20 shrink-0" aria-hidden="true" />

      <div className="flex justify-center items-center h-full ">
        <div className="flex flex-col max-w-[90%] w-full mx-8">
          <div className="flex flex-col max-w-233 gap-12">
            <h1 className="font-source font-light leading-28 text-9xl">
              Histórias, <br /> ideias e tecnologia
            </h1>

            <span className="font-int font-light leading-7 text-2xl">
              Leia, escreva, e compartilhe conhecimento com a comunidade
            </span>
          </div>
        </div>
      </div>

      <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} size="xl" showCloseButton>
        {formType === 'sign-in' ? (
          <SignIn setFormType={setFormType} />
        ) : (
          <SignUp setFormType={setFormType} />
        )}
      </Dialog>
    </div>
  )
}
