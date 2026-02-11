import { PlusIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center gap-2">
        <div className="flex justify-between items-center gap-4 w-full">
          <div className="flex flex-col">
            <h1 className="font-bold text-2xl">Produtos</h1>
            <p className="text-muted-foreground text-sm">
              Gerencie produtos e suas listas de materiais
            </p>
          </div>

          <Button variant="outline" size="sm">
            <PlusIcon className="size-4" />
            Adicionar Produto
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex gap-4 items-center">
          <InputGroup className="max-w-xs">
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
          </InputGroup>

          <Button size="sm">Sem Material</Button>
        </div>

        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">Código</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Materiais Prima</TableHead>
              <TableHead className="text-end">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Mesa</TableCell>
              <TableCell>R$ 250,00</TableCell>
              <TableCell>Madeira, Parafusos</TableCell>
              <TableCell className="text-end">
                <Button size="sm">Editar</Button>
                <Button size="sm" variant="destructive">
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
