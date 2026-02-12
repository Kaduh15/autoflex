"use client";

import Link from "next/link";
import { FactoryIcon, PackageIcon, TestTubeIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProducts } from "@/hooks/products/use-products";
import { useProductionSuggestions } from "@/hooks/production/use-production-suggestions";
import { useRawMaterials } from "@/hooks/raw-materials/use-raw-materials";
import { formatCurrency } from "@/utils/format-currency";

export default function HomePage() {
  const productsQuery = useProducts();
  const rawMaterialsQuery = useRawMaterials();
  const suggestionsQuery = useProductionSuggestions();

  const productsCount = productsQuery.data?.data.length ?? 0;
  const rawMaterialsCount = rawMaterialsQuery.data?.data.length ?? 0;
  const suggestionsCount =
    suggestionsQuery.data?.data.suggestions.length ?? 0;
  const suggestionsTotal = suggestionsQuery.data?.data.totalProductionValue;

  const quickLinks = [
    {
      title: "Produtos",
      description: "Cadastre e organize seus produtos e listas de materiais.",
      href: "/products",
      icon: PackageIcon,
      action: "Ver produtos",
      metricLabel: "Produtos",
      metricValue: productsQuery.isLoading
        ? "Carregando..."
        : productsQuery.isError
          ? "Erro"
          : `${productsCount}`,
      metricHint: "cadastrados",
    },
    {
      title: "Matéria-prima",
      description: "Controle de estoque e cadastro de insumos.",
      href: "/raw-materials",
      icon: TestTubeIcon,
      action: "Ver matérias-primas",
      metricLabel: "Matérias-primas",
      metricValue: rawMaterialsQuery.isLoading
        ? "Carregando..."
        : rawMaterialsQuery.isError
          ? "Erro"
          : `${rawMaterialsCount}`,
      metricHint: "em estoque",
    },
    {
      title: "Sugestões de produção",
      description: "Veja o que produzir com base no estoque atual.",
      href: "/production-suggestions",
      icon: FactoryIcon,
      action: "Ver sugestões",
      metricLabel: "Valor total",
      metricValue: suggestionsQuery.isLoading
        ? "Carregando..."
        : suggestionsQuery.isError
          ? "Erro"
          : suggestionsTotal !== undefined
            ? formatCurrency(suggestionsTotal)
            : "-",
      metricHint: `${suggestionsCount} sugestões`,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Painel geral</h1>
        <p className="text-sm text-muted-foreground">
          Acesse rapidamente os principais módulos do Autoflex.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {quickLinks.map((item) => (
          <Card key={item.title} className="flex flex-col">
            <CardHeader className="gap-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <item.icon className="size-4" />
                {item.title}
              </div>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex flex-col gap-4">
                <p className="text-lg font-semibold">{item.metricValue}</p>
                <Badge className="w-fit text-accent font-semibold">
                  {item.metricHint}
                </Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" size="sm">
                <Link href={item.href}>{item.action}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
