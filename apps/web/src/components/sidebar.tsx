import { BoxIcon, LayersIcon, LayoutDashboardIcon } from 'lucide-react'

export function Sidebar() {
  return (
    <div className="w-64 h-[calc(100vh-3.5rem)] border-r-2 p-4">
      <ul className="space-y-4">
        <li>
          <a href="/" className="flex gap-2 items-center">
            <LayoutDashboardIcon className="size-5" />
            Dashboard
          </a>
        </li>
        <li>
          <a href="/products" className="flex gap-2 items-center">
            <BoxIcon className="size-5" />
            Produtos
          </a>
        </li>
        <li>
          <a href="/raw-materials" className="flex gap-2 items-center">
            <LayersIcon className="size-5" />
            Materia Prima
          </a>
        </li>
        <li>
          <a href="/production-suggestions" className="flex gap-2 items-center">
            <LayersIcon className="size-5" />
            Sugestões de Produção
          </a>
        </li>
      </ul>
    </div>
  )
}
