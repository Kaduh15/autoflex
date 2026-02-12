# AutoFlex

Monorepo com API (Spring Boot) e frontend (Next.js) para controle de produtos,
matérias-primas e sugestões de produção.

## Contexto

O sistema controla produtos, matérias-primas e a associação entre eles,
permitindo sugerir a produção com base no estoque e priorizando produtos
de maior valor.

## Estrutura

- `apps/api/` - API Spring Boot
- `apps/web/` - Frontend Next.js
- `compose.yaml` - Postgres + serviços app (com perfis)

## Visão geral do domínio

- **Produto**: código, nome, valor.
- **Matéria-prima**: código, nome, quantidade em estoque.
- **LOM (Lista de Materiais)**: associação entre produto e matérias-primas
  com a quantidade necessária para produzir 1 unidade.

## Lógica de sugestão de produção

O endpoint `GET /production/suggestion` retorna quais produtos podem ser
produzidos com o estoque atual, priorizando os de maior valor. A lógica
esperada é:

1. Ordenar produtos por **valor desc** (maior valor primeiro).
2. Para cada produto, calcular a **quantidade máxima** possível com o
   estoque disponível:
   - Para cada matéria-prima do produto, calcular
     `floor(estoque / quantidadeNecessaria)`.
   - A quantidade do produto é o **mínimo** desses valores.
3. Deduzir do estoque as matérias-primas consumidas pelo produto.
4. Somar o **valor total**: `quantidade * valor do produto`.
5. Retornar a lista de sugestões com `maxQuantity` e `totalValue`.

## Requisitos

- Java 17
- Node 20+
- pnpm
- Docker (opcional)

## Variáveis de ambiente

Exemplos prontos:

- `.env.example` (raiz, para Docker Compose)
- `apps/api/.env.example`
- `apps/web/.env.example`

## Desenvolvimento local

### Banco de dados

```bash
docker compose --profile dev up -d postgres
```

### API

```bash
cd apps/api
./mvnw spring-boot:run
```

### Web

```bash
cd apps/web
pnpm install
pnpm dev
```

## Docker Compose

### Dev (web aponta para localhost)

```bash
docker compose --profile dev up --build
```

### Prod (web aponta para api no docker)

```bash
docker compose --profile prod up --build
```

## Endpoints úteis

- API: `http://localhost:8080`
- Swagger UI: `http://localhost:8080/swagger`
- Web: `http://localhost:3000`
