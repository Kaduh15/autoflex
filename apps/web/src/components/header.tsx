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
            <a href="/">Incio</a>
          </li>
          <li>
            <a href="/products">Produtos</a>
          </li>

          <li>
            <a href="/raw-materials">Materia Prima</a>
          </li>
        </ul>
      </nav>

      <ModeToggle />
    </header>
  )
}
