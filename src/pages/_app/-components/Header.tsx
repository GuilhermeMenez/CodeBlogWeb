import { EditIcon } from '@/assets/icons/EditIcon'
import { SearchIcon } from '@/assets/icons/SearchIcon'
import { BellIcon } from '@/assets/icons/BellIcon'

import { AccountDropdown } from '@/components/dropdowns/AccountDropdown'

export function Header() {
  return (
    <div className="sticky inset-x-0 top-0 flex justify-end items-center w-full h-17.5 py-4 px-6 z-100">
      <div className="flex gap-4">
        <button type="button" className="gap-2 p-1 rounded-xs header-item focus-ring">
          <div className="icon-box">
            <EditIcon size={20} />
          </div>

          <p className="font-inter font-normal text-md">Novo post</p>
        </button>

        <button
          type="button"
          className="gap-2 p-1 rounded-xs header-item focus-ring"
          aria-label="Buscar no Code Blog"
        >
          <div className="icon-box">
            <SearchIcon size={19} />
          </div>
        </button>

        <button
          type="button"
          className="relative gap-2 p-1 rounded-xs header-item focus-ring"
          aria-label="Notificações"
        >
          <div className="icon-box">
            <div className="dot" />
            <BellIcon width={18} />
          </div>
        </button>

        <AccountDropdown />
      </div>
    </div>
  )
}
