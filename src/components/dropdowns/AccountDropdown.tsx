import { Link } from '@tanstack/react-router'
import codeBobJrAvatar from '@/assets/images/mocks/code-bob-jr.jpg'

import { SettingsIcon } from '@/assets/icons/SettingsIcon'
import { HelpIcon } from '@/assets/icons/HelpIcon'
import { LogoutIcon } from '@/assets/icons/LogoutIcon'

import { Avatar } from '../ui/Avatar'
import { Dropdown, DropdownItem } from '../ui/Dropdown'
import { Separator } from '@base-ui/react'

export function AccountDropdown() {
  const srcMock = codeBobJrAvatar
  // const srcMock = "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"

  return (
    <Dropdown
      size="md"
      trigger={
        <button
          type="button"
          className="group p-0.5 ml-1 rounded-full header-item focus-ring"
          aria-label="Menu de usuário"
        >
          <Avatar src={srcMock} letter="CB" size="medium" />
        </button>
      }
    >
      <div className="flex flex-col gap-4">
        <DropdownItem>
          <Link
            to="/me/settings"
            activeOptions={{ exact: true }}
            className="group flex items-center gap-4 px-1 py-2"
          >
            <Avatar src={srcMock} letter="CB" size="large" />

            <div className="flex flex-col gap-0.5">
              <p className="font-normal text-md text-white-30 group-hover:text-white-40">
                Code Bob
              </p>
              <p className="font-normal text-xs text-white-20 group-hover:text-white-30">
                bobgood@mail.com
              </p>
            </div>
          </Link>
        </DropdownItem>

        <div className="flex flex-col gap-2">
          <DropdownItem>
            <Link
              to="/me/settings"
              activeOptions={{ exact: true }}
              className="justify-start gap-3 px-1.5 py-1 header-item focus-ring rounded-xs"
            >
              <div className="icon-box">
                <SettingsIcon size={19} />
              </div>

              <span className="font-inter text-md font-normal">Configurações</span>
            </Link>
          </DropdownItem>

          <DropdownItem>
            <Link
              to="/me/settings"
              activeOptions={{ exact: true }}
              className="justify-start gap-3 px-1.5 py-1 header-item focus-ring rounded-xs"
            >
              <div className="icon-box">
                <HelpIcon size={19} />
              </div>

              <span className="font-inter text-md font-normal">Ajuda</span>
            </Link>
          </DropdownItem>
        </div>

        <Separator orientation="horizontal" className="h-px bg-slate-20" />

        <div className="flex flex-col gap-2">
          <DropdownItem>
            <Link
              to="/me/settings"
              activeOptions={{ exact: true }}
              className="justify-start gap-4 px-1.5 py-1 header-item focus-ring rounded-xs"
            >
              <span className="font-inter text-md font-normal">Figma</span>
            </Link>
          </DropdownItem>

          <DropdownItem>
            <Link
              to="/me/settings"
              activeOptions={{ exact: true }}
              className="justify-start gap-4 px-1.5 py-1 header-item focus-ring rounded-xs"
            >
              <span className="font-inter text-md font-normal">Github</span>
            </Link>
          </DropdownItem>
        </div>

        <Separator orientation="horizontal" className="h-px bg-slate-20" />

        <DropdownItem>
          <Link
            to="/me/settings"
            activeOptions={{ exact: true }}
            className="justify-start gap-3 px-1.5 py-1 header-item focus-ring rounded-xs"
          >
            <div className="icon-box">
              <LogoutIcon size={17} />
            </div>

            <span className="font-inter text-md font-normal">Sair</span>
          </Link>
        </DropdownItem>
      </div>
    </Dropdown>
  )
}
