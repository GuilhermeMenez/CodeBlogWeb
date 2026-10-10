import { useState, type FormEvent } from 'react'
import { useLogin } from '@/hooks/useAuth'
import { twMerge } from 'tailwind-merge'
import { isApiError, isUnauthorized } from '@/api/api-error'
import { loginSchema } from '@/api/schemas/auth'

import { Form } from '@base-ui/react'
import { AlertIcon } from '@/assets/icons/AlertIcon'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

interface SignInProps {
  setFormType: (type: 'sign-in' | 'sign-up') => void
}

type FormErrors = Record<string, string>

export function SignIn({ setFormType }: SignInProps) {
  const { mutate: login, isPending } = useLogin()
  const [errors, setErrors] = useState<FormErrors>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const formValues = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    const result = loginSchema.safeParse(formValues)
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors
      setErrors(
        Object.fromEntries(
          Object.entries(fieldErrors).map(([key, msgs]) => [key, msgs?.[0] ?? '']),
        ),
      )
      return
    }

    setErrors({})

    login(result.data, {
      onError: (error) => {
        if (isApiError(error) && isUnauthorized(error)) {
          setErrors({ auth: 'Email ou senha inválidos. Tente novamente.' })
          return
        }
        setErrors({ auth: 'Ocorreu um erro. Tente novamente.' })
      },
    })
  }

  return (
    <div className={twMerge('flex flex-col py-14', errors.auth ? 'gap-10' : 'gap-14')}>
      <div className="flex flex-col items-center gap-6">
        <img src="src/assets/svgs/brand-mark.svg" alt="Logo Code Blog" className="w-auto h-10" />
        <h2 className="font-source font-light text-2xl">Bem-vindo de volta</h2>
      </div>

      <div className="flex flex-col gap-6 items-center">
        {errors.auth && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-sm text-center text-sm text-danger-40 bg-danger-40/5">
            <AlertIcon size="16px" />
            <p className="text-center text-md text-danger-40">{errors.auth}</p>
          </div>
        )}

        <Form
          className="flex flex-col gap-6 w-full max-w-93"
          errors={errors}
          onSubmit={handleSubmit}
        >
          <Input
            type="text"
            name="email"
            label="Email"
            placeholder="Insira seu email"
            inputMode="email"
            autoComplete="email"
          />

          <Input type="password" name="password" label="Senha" placeholder="Insira sua senha" />

          <div className="my-4">
            <Button type="submit" variant="primary" size="lg" fullWidth loading={isPending}>
              Entrar
            </Button>
          </div>

          <p className="font-inter font-light text-center text-sm text-white-40">
            Não tem uma conta?{' '}
            <span
              className="font-normal text-accent-30 hover:underline cursor-pointer"
              onClick={setFormType.bind(null, 'sign-up')}
            >
              Cadastre-se
            </span>
          </p>
        </Form>
      </div>
    </div>
  )
}
