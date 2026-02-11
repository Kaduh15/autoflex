import Link from "next/link";
import {
  FactoryIcon,
  LayoutDashboardIcon,
  PackageIcon,
  TestTubeIcon,
} from "lucide-react";

export function Sidebar() {
  return (
    <div className="w-64 h-[calc(100vh-3.5rem)] border-r-2 p-4">
      <ul className="space-y-4">
        <li>
          <Link href="/" className="flex gap-2 items-center">
            <LayoutDashboardIcon className="size-5" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/products" className="flex gap-2 items-center">
            <PackageIcon className="size-5" />
            Produtos
          </Link>
        </li>
        <li>
          <Link href="/raw-materials" className="flex gap-2 items-center">
            <TestTubeIcon className="size-5" />
            Materia Prima
          </Link>
        </li>
        <li>
          <Link href="/production-suggestions" className="flex gap-2 items-center">
            <FactoryIcon className="size-5" />
            Sugestões de Produção
          </Link>
        </li>
      </ul>
    </div>
  )
}
