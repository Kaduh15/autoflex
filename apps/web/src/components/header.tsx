import Link from 'next/link'
import { BoxIcon } from 'lucide-react'
import { ModeToggle } from './toggle-theme'

export function Header() {
  return (
    <header className="w-full h-14 border-b-2 flex items-center px-4 gap-4">
      <div className="flex items-center gap-4">
        <BoxIcon className="size-10 p-2 text-white bg-primary" />

        <h1 className="ml-2 text-lg font-bold">Autoflex</h1>
      </div>

      <nav className="ml-auto">
        <ul className="flex items-center gap-4">
          <li>
            <Link href="/">Incio</Link>
          </li>
          <li>
            <Link href="/products">Produtos</Link>
          </li>

          <li>
            <Link href="/raw-materials">Materia Prima</Link>
          </li>
        </ul>
      </nav>

      <ModeToggle />
    </header>
  )
}
