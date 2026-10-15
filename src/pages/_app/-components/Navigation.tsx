import { Link } from '@tanstack/react-router'
import { twMerge } from 'tailwind-merge'

import { Separator } from '@base-ui/react'

import { Wordmark } from '@/assets/svgs/Wordmark'
import { HamburgerIcon } from '@/assets/icons/HamburgerIcon'
import { HomeIcon } from '@/assets/icons/HomeIcon'
import { FavGroupIcon } from '@/assets/icons/FavGroupIcon'
import { UserIcon } from '@/assets/icons/UserIcon'
import { UserGroupIcon } from '@/assets/icons/UserGroupIcon'

interface NavigationProps {
  isMenuOpen: boolean
  setIsMenuOpen: (isOpen: boolean) => void
}

export function Navigation({ isMenuOpen, setIsMenuOpen }: NavigationProps) {
  const menuButtonBaseClass =
    'header-item focus-ring rounded-xs p-1.5 transition-[opacity,translate] ease-in-out'

  const openButtonClass = twMerge(
    menuButtonBaseClass,
    isMenuOpen
      ? '-translate-x-3 opacity-0 duration-300 pointer-events-none'
      : 'translate-x-0 opacity-100 duration-350 pointer-events-auto',
  )

  const closeButtonClass = twMerge(
    menuButtonBaseClass,
    isMenuOpen
      ? 'opacity-100 transition-opacity duration-900'
      : 'opacity-0 pointer-events-none transition-opacity duration-150',
  )

  const navigationItems = [
    { to: '/feed', label: 'Feed', icon: HomeIcon, iconSize: 20 },
    { to: '/me/library', label: 'Favoritos', icon: FavGroupIcon, iconSize: 16 },
    { to: '/me', label: 'Perfil', icon: UserIcon, iconSize: 17 },
  ]

  return (
    <>
      <div
        className={twMerge(
          'fixed top-4 left-6 z-101 flex w-full items-center justify-between transition-[max-width] ease-in-out',
          isMenuOpen ? 'max-w-63' : 'max-w-46.5',
        )}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            className={openButtonClass}
            onClick={() => setIsMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <HamburgerIcon width={20} />
          </button>

          <Link
            to="/feed"
            aria-label="Ir para o feed"
            className={twMerge(
              'flex items-center pt-1.25 rounded-xs transition-transform ease-in-out focus-ring',
              isMenuOpen ? '-translate-x-11 duration-350' : 'translate-x-0 duration-300',
            )}
          >
            <Wordmark width={110} />
          </Link>
        </div>

        <button
          type="button"
          className={closeButtonClass}
          onClick={() => setIsMenuOpen(false)}
          aria-label="Fechar menu"
        >
          <HamburgerIcon width={20} />
        </button>
      </div>

      <aside
        className={twMerge(
          'relative shrink-0 overflow-hidden transition-[width] duration-350 ease-in-out',
          isMenuOpen ? 'w-73' : 'w-0',
        )}
      >
        <nav
          className={twMerge(
            'fixed top-0 left-0 flex flex-col gap-8 h-screen w-73 px-3 pt-22 pb-4 border-r border-slate-20 bg-black-40 transition-transform duration-350 ease-in-out z-100',
            isMenuOpen ? 'translate-x-0' : '-translate-x-full pointer-events-none',
          )}
          aria-label="Navegação principal"
        >
          <div className="flex flex-col gap-3">
            {navigationItems.map(({ to, label, icon: Icon, iconSize }) => (
              <Link
                key={to}
                to={to}
                activeOptions={{ exact: true }}
                className="
                  relative justify-start gap-4 px-3 py-1 header-item focus-ring rounded-xs
                  before:absolute before:-left-2 before:top-1/2 before:h-7 before:w-0.5 before:bg-accent-50 before:-translate-y-1/2 before:opacity-0"
                activeProps={{
                  className: 'text-white-40 before:opacity-100 before:scale-y-100 ',
                }}
              >
                <div className="icon-box">
                  <Icon width={iconSize} />
                </div>

                <span className="font-inter text-base font-normal">{label}</span>
              </Link>
            ))}
          </div>

          <div className="px-2.5">
            <Separator orientation="horizontal" className="h-px bg-slate-20" />
          </div>

          <div className="flex flex-col gap-3">
            <Link
              to="/me/following"
              activeOptions={{ exact: true }}
              className="
                relative justify-start gap-4 px-3 py-1 header-item focus-ring rounded-xs
                before:absolute before:-left-2 before:top-1/2 before:h-7 before:w-0.5 before:bg-accent-50 before:-translate-y-1/2 before:opacity-0"
              activeProps={{
                className: 'text-white-40 before:opacity-100 before:scale-y-100 ',
              }}
            >
              <div className="icon-box">
                <UserGroupIcon width={19} />
              </div>

              <span className="font-inter text-base font-normal">Seguindo</span>
            </Link>
          </div>
        </nav>
      </aside>
    </>
  )
}
