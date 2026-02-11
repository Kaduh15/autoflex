import { PlusIcon, SearchIcon } from "lucide-react";
import { Activity } from "react";
import { Badge } from "@/components/ui/badge";
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
import { getProducts } from "@/http/get-products";
import { formatCurrency } from "@/utils/format-currency";

export default async function ProductsPage() {
  const { data } = await getProducts();

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
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">Código</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Materiais Prima</TableHead>
              <TableHead className="text-end">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <Activity mode={data.length > 0 ? "visible" : "hidden"}>
            <TableBody>
              {data.map((product) => {
                const rawMaterialQuantity = product.rawMaterial.length;

                return (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.code}
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{formatCurrency(product.price)}</TableCell>
                    <TableCell>
                      <Badge className="text-accent font-semibold">
                        + {rawMaterialQuantity}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-end">
                      <Button size="sm">Editar</Button>
                      <Button size="sm" variant="destructive">
                        Excluir
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Activity>
        </Table>
        <Activity mode={data.length === 0 ? "visible" : "hidden"}>
          <p className="mx-auto">Nenhum produto encontrado.</p>
        </Activity>
      </div>
    </div>
  );
}
