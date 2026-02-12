import { BoxIcon } from 'lucide-react'
import Link from 'next/link'
import { ModeToggle } from './toggle-theme'

export function Header() {
  return (
    <header className="w-full border-b-2">
      <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex items-center gap-3">
          <BoxIcon className="size-9 rounded-md bg-primary p-2 text-white" />
          <h1 className="text-lg font-bold">Autoflex</h1>
        </div>

        <div className="flex flex-col gap-3 sm:ml-auto sm:flex-row sm:items-center">
          <nav className="w-full">
            <ul className="flex flex-wrap gap-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="rounded-md border px-3 py-1.5 transition hover:bg-accent"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="rounded-md border px-3 py-1.5 transition hover:bg-accent"
                >
                  Produtos
                </Link>
              </li>
              <li>
                <Link
                  href="/raw-materials"
                  className="rounded-md border px-3 py-1.5 transition hover:bg-accent"
                >
                  Matéria-prima
                </Link>
              </li>
              <li>
                <Link
                  href="/production-suggestions"
                  className="rounded-md border px-3 py-1.5 transition hover:bg-accent"
                >
                  Sugestões
                </Link>
              </li>
            </ul>
          </nav>

          <div className="self-start sm:self-auto">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
