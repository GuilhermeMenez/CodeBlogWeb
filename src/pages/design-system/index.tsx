import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { PlusIcon } from '@/assets/icons/PlusIcon'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { OtpInput } from '@/components/ui/OtpInput'
import { Avatar } from '@/components/ui/Avatar'
import { Loader } from '@/components/ui/Loader'

export const Route = createFileRoute('/design-system/')({
  component: DesignSystem,
  head: () => ({
    meta: [{ title: 'Design System' }],
  }),
})

function DesignSystem() {
  const [label, setLabel] = useState('')
  const [otpCode, setOtpCode] = useState('')
  const [error, setError] = useState<string | null>('')

  return (
    <div className="flex flex-col gap-24 px-12 py-8">
      <div className="flex flex-col gap-8">
        <h1 className="mb-4 text-2xl font-bold">Design System</h1>
        <p className="text-lg font-bold">Typography</p>

        <div className="flex flex-col gap-6">
          <div>
            <span className="block mb-2 text-base font-bold">Inter</span>
            <p className="font-inter font-bold text-2xl">
              The quick brown fox jumps over the lazy dog
            </p>
            <p className="font-inter font-medium text-lg">
              The quick brown fox jumps over the lazy dog
            </p>
            <p className="font-inter font-light text-base">
              The quick brown fox jumps over the lazy dog
            </p>
          </div>

          <div>
            <span className="block mb-2 text-base font-bold">Lusitana</span>
            <p className="font-lusitana font-bold text-2xl">
              The quick brown fox jumps over the lazy dog
            </p>
            <p className="font-lusitana font-medium text-lg">
              The quick brown fox jumps over the lazy dog
            </p>
            <p className="font-lusitana font-light text-base">
              The quick brown fox jumps over the lazy dog
            </p>
          </div>

          <div>
            <span className="block mb-2 text-base font-bold">Source Serif 4</span>
            <p className="font-source font-bold text-2xl">
              The quick brown fox jumps over the lazy dog
            </p>
            <p className="font-source font-medium text-lg">
              The quick brown fox jumps over the lazy dog
            </p>
            <p className="font-source font-light text-base">
              The quick brown fox jumps over the lazy dog
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <p className="text-lg font-bold">Buttons</p>

        {/* Large */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Button variant="primary" size="lg" onClick={() => alert('Olá Mundo!')}>
              Button
            </Button>

            <Button variant="primary" size="lg" onClick={() => alert('Olá Mundo!')}>
              <PlusIcon />
              Button
            </Button>

            <Button
              variant="primary"
              size="lg"
              iconOnly
              aria-label="Primary Button"
              onClick={() => alert('Olá Mundo!')}
            >
              <PlusIcon />
            </Button>

            <Button variant="primary" size="lg" loading onClick={() => alert('Olá Mundo!')}>
              Button
            </Button>

            <Button variant="primary" size="lg" disabled onClick={() => alert('Olá Mundo!')}>
              Button
            </Button>
          </div>

          <div className="flex gap-4">
            <Button variant="secondary" size="lg" onClick={() => alert('Olá Mundo!')}>
              Button
            </Button>

            <Button variant="secondary" size="lg" onClick={() => alert('Olá Mundo!')}>
              <PlusIcon />
              Button
            </Button>

            <Button
              variant="secondary"
              size="lg"
              iconOnly
              aria-label="Secondary Button"
              onClick={() => alert('Olá Mundo!')}
            >
              <PlusIcon />
            </Button>

            <Button variant="secondary" size="lg" loading onClick={() => alert('Olá Mundo!')}>
              Button
            </Button>

            <Button variant="secondary" size="lg" disabled onClick={() => alert('Olá Mundo!')}>
              Button
            </Button>
          </div>

          <div className="flex gap-4">
            <Button variant="ghost" size="lg" onClick={() => alert('Olá Mundo!')}>
              Button
            </Button>

            <Button variant="ghost" size="lg" onClick={() => alert('Olá Mundo!')}>
              <PlusIcon />
              Button
            </Button>

            <Button
              variant="ghost"
              size="lg"
              iconOnly
              aria-label="Ghost Button"
              onClick={() => alert('Olá Mundo!')}
            >
              <PlusIcon />
            </Button>

            <Button variant="ghost" size="lg" loading onClick={() => alert('Olá Mundo!')}>
              Button
            </Button>

            <Button variant="ghost" size="lg" disabled onClick={() => alert('Olá Mundo!')}>
              Button
            </Button>
          </div>
        </div>

        {/* Medium */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Button variant="primary" size="md" onClick={() => alert('Olá Mundo!')}>
              Button
            </Button>

            <Button variant="primary" size="md" onClick={() => alert('Olá Mundo!')}>
              <PlusIcon />
              Button
            </Button>

            <Button
              variant="primary"
              size="md"
              iconOnly
              aria-label="Primary Button"
              onClick={() => alert('Olá Mundo!')}
            >
              <PlusIcon />
            </Button>

            <Button variant="primary" size="md" loading onClick={() => alert('Olá Mundo!')}>
              Button
            </Button>

            <Button variant="primary" size="md" disabled onClick={() => alert('Olá Mundo!')}>
              Button
            </Button>
          </div>

          <div className="flex gap-4">
            <Button variant="secondary" size="md" onClick={() => alert('Olá Mundo!')}>
              Button
            </Button>

            <Button variant="secondary" size="md" onClick={() => alert('Olá Mundo!')}>
              <PlusIcon />
              Button
            </Button>

            <Button
              variant="secondary"
              size="md"
              iconOnly
              aria-label="Secondary Button"
              onClick={() => alert('Olá Mundo!')}
            >
              <PlusIcon />
            </Button>

            <Button variant="secondary" size="md" loading onClick={() => alert('Olá Mundo!')}>
              Button
            </Button>

            <Button variant="secondary" size="md" disabled onClick={() => alert('Olá Mundo!')}>
              Button
            </Button>
          </div>

          <div className="flex gap-4">
            <Button variant="ghost" size="md" onClick={() => alert('Olá Mundo!')}>
              Button
            </Button>

            <Button variant="ghost" size="md" onClick={() => alert('Olá Mundo!')}>
              <PlusIcon />
              Button
            </Button>

            <Button
              variant="ghost"
              size="md"
              iconOnly
              aria-label="Ghost Button"
              onClick={() => alert('Olá Mundo!')}
            >
              <PlusIcon />
            </Button>

            <Button variant="ghost" size="md" loading onClick={() => alert('Olá Mundo!')}>
              Button
            </Button>

            <Button variant="ghost" size="md" disabled onClick={() => alert('Olá Mundo!')}>
              Button
            </Button>
          </div>
        </div>

        {/* Small */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Button variant="primary" size="sm" onClick={() => alert('Olá Mundo!')}>
              Button
            </Button>

            <Button variant="primary" size="sm" onClick={() => alert('Olá Mundo!')}>
              <PlusIcon />
              Button
            </Button>

            <Button
              variant="primary"
              size="sm"
              iconOnly
              aria-label="Primary Button"
              onClick={() => alert('Olá Mundo!')}
            >
              <PlusIcon />
            </Button>

            <Button variant="primary" size="sm" loading onClick={() => alert('Olá Mundo!')}>
              Button
            </Button>

            <Button variant="primary" size="sm" disabled onClick={() => alert('Olá Mundo!')}>
              Button
            </Button>
          </div>

          <div className="flex gap-4">
            <Button variant="secondary" size="sm" onClick={() => alert('Olá Mundo!')}>
              Button
            </Button>

            <Button variant="secondary" size="sm" onClick={() => alert('Olá Mundo!')}>
              <PlusIcon />
              Button
            </Button>

            <Button
              variant="secondary"
              size="sm"
              iconOnly
              aria-label="Secondary Button"
              onClick={() => alert('Olá Mundo!')}
            >
              <PlusIcon />
            </Button>

            <Button variant="secondary" size="sm" loading onClick={() => alert('Olá Mundo!')}>
              Button
            </Button>

            <Button variant="secondary" size="sm" disabled onClick={() => alert('Olá Mundo!')}>
              Button
            </Button>
          </div>

          <div className="flex gap-4">
            <Button variant="ghost" size="sm" onClick={() => alert('Olá Mundo!')}>
              Button
            </Button>

            <Button variant="ghost" size="sm" onClick={() => alert('Olá Mundo!')}>
              <PlusIcon />
              Button
            </Button>

            <Button
              variant="ghost"
              size="sm"
              iconOnly
              aria-label="Ghost Button"
              onClick={() => alert('Olá Mundo!')}
            >
              <PlusIcon />
            </Button>

            <Button variant="ghost" size="sm" loading onClick={() => alert('Olá Mundo!')}>
              Button
            </Button>

            <Button variant="ghost" size="sm" disabled onClick={() => alert('Olá Mundo!')}>
              Button
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <p className="text-lg font-bold text-foreground">Inputs</p>

        <div className="flex flex-col items-start gap-10 w-2xl">
          <div className="flex items-end gap-6 w-full">
            <Input
              label="Label"
              variant="text"
              placeholder="Placeholder..."
              onValueChange={(e) => setLabel(e)}
            />

            <Input
              label="Label"
              variant="text"
              placeholder="Placeholder..."
              onValueChange={(e) => setLabel(e)}
              disabled
            />
          </div>

          <div className="flex items-end gap-6 w-full">
            <Input
              placeholder="Search in CodeBlog..."
              variant="search"
              onValueChange={(e) => setLabel(e)}
            />

            <Input
              variant="search"
              placeholder="Search in CodeBlog..."
              onValueChange={(e) => setLabel(e)}
              disabled
            />
          </div>

          <Button variant="secondary" size="md" onClick={() => alert(`Input value: ${label}`)}>
            Show Value
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-8 ">
        <p className="text-lg font-bold text-foreground">OTP Input</p>

        <OtpInput error={error} onValueChange={(value) => setOtpCode(value)} />

        <div className="w-2xl">
          <Button
            variant="secondary"
            size="md"
            onClick={() => setError(otpCode !== '123456' ? 'Código inválido' : null)}
          >
            Validation
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <p className="text-lg font-bold text-foreground">Avatar</p>

        <div className="flex items-center gap-4">
          <Avatar
            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
            letter="CB"
            size="giant"
          />
          <Avatar
            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
            letter="CB"
            size="large"
          />
          <Avatar
            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
            letter="CB"
            size="medium"
          />
          <Avatar
            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
            letter="CB"
            size="small"
          />
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <p className="text-lg font-bold text-foreground">Loader</p>

        <div className="flex items-center gap-4">
          <Loader size="xl" />
          <Loader size="lg" />
          <Loader size="md" />
          <Loader size="sm" />
          <Loader size="xs" />
        </div>
      </div>

      {/* FORM BASE UI EXAMPLE */}
      {/* import { Form } from '@base-ui/react/form'
        import { Input } from '@/components/ui/Input'
        import { Button } from '@/components/ui/Button'

        function LoginForm() {
          return (
            <Form
              onFormSubmit={async (formValues: { email: string; password: string }) => {
                // Os valores são recebidos como objeto JS
                console.log('Form values:', formValues)
                
                // Aqui você pode enviar para a API
                // await api.login(formValues)
              }}
            >
              <Input
                name="email"
                type="email"
                label="Email"
                placeholder="seu@email.com"
                required
              />

              <Input
                name="password"
                type="password"
                label="Senha"
                placeholder="••••••••"
                required
              />

              <Button type="submit" variant="primary">
                Entrar
              </Button>
            </Form>
          )
        } */}

      {/* import { useState } from 'react'
        import { Form } from '@base-ui/react/form'
        import { Input } from '@/components/ui/Input'
        import { Button } from '@/components/ui/Button'

        function RegisterForm() {
          const [errors, setErrors] = useState<Record<string, string>>({})

          return (
            <Form
              errors={errors}
              onFormSubmit={async (formValues: { username: string; email: string }) => {
                // Validação no servidor retornando erros
                const response = await fetch('/api/register', {
                  method: 'POST',
                  body: JSON.stringify(formValues),
                })

                if (!response.ok) {
                  const data = await response.json()
                  // Mapeia erros para os campos pelo `name`
                  setErrors(data.errors) // Ex: { username: 'Já existe', email: 'Inválido' }
                  return
                }

                // Sucesso
                setErrors({})
              }}
            >
              <Input
                name="username"
                label="Usuário"
                placeholder="seu_usuario"
                required
              />

              <Input
                name="email"
                type="email"
                label="Email"
                placeholder="seu@email.com"
                required
              />

              <Button type="submit" variant="primary">
                Cadastrar
              </Button>
            </Form>
          )
        } */}
    </div>
  )
}
