"use client";

import { Activity } from "react";
import { ListingEmptyState } from "@/components/listing/listing-empty-state";
import { ListingHeader } from "@/components/listing/listing-header";
import { ListingPageLayout } from "@/components/listing/listing-layout";
import { ListingTable } from "@/components/listing/listing-table";
import { Badge } from "@/components/ui/badge";
import { useProductionSuggestions } from "@/hooks/production/use-production-suggestions";
import { formatCurrency } from "@/utils/format-currency";

export default function ProductionSuggestionsPage() {
  const suggestionsQuery = useProductionSuggestions();
  const data = suggestionsQuery.data?.data;
  const suggestions = data?.suggestions ?? [];

  const columns = [
    { key: "code", label: "Código" },
    { key: "name", label: "Produto" },
    { key: "price", label: "Valor" },
    { key: "maxQuantity", label: "Qtd. máxima" },
    { key: "totalValue", label: "Valor total", align: "end" as const },
  ];

  return (
    <ListingPageLayout>
      <ListingHeader
        title="Sugestões de Produção"
        subtitle="Sugestões baseadas em produtos e matérias-primas disponíveis"
      />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="rounded-md border px-4 py-3">
            <p className="text-xs uppercase text-muted-foreground">
              Valor total sugerido
            </p>
            <p className="text-lg font-semibold">
              {data ? formatCurrency(data.totalProductionValue) : "-"}
            </p>
          </div>
          <Badge className="w-fit text-accent font-semibold">
            {suggestions.length} sugestões
          </Badge>
        </div>

        <Activity
          mode={
            suggestions.length > 0 && !suggestionsQuery.isLoading
              ? "visible"
              : "hidden"
          }
        >
          <ListingTable
            columns={columns}
            rows={suggestions}
            getRowKey={(row) => row.productId}
            renderCell={(row, columnKey) => {
              if (columnKey === "code") {
                return <span className="font-medium">{row.code}</span>;
              }

              if (columnKey === "name") {
                return row.name;
              }

              if (columnKey === "price") {
                return formatCurrency(row.price);
              }

              if (columnKey === "maxQuantity") {
                return row.maxQuantity;
              }

              if (columnKey === "totalValue") {
                return formatCurrency(row.totalValue);
              }

              return null;
            }}
          />
        </Activity>

        <Activity
          mode={
            suggestions.length === 0 && !suggestionsQuery.isLoading
              ? "visible"
              : "hidden"
          }
        >
          <ListingEmptyState message="Sem sugestões no momento. Cadastre produtos e matérias-primas para gerar resultados." />
        </Activity>

        <Activity mode={suggestionsQuery.isLoading ? "visible" : "hidden"}>
          <ListingEmptyState message="Carregando sugestões..." />
        </Activity>

        <Activity mode={suggestionsQuery.isError ? "visible" : "hidden"}>
          <ListingEmptyState message="Falha ao carregar sugestões." />
        </Activity>
      </div>
    </ListingPageLayout>
  );
}
