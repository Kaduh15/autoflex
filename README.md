# AutoFlex

Monorepo com API (Spring Boot) e frontend (Next.js) para controle de produtos,
matérias-primas e sugestões de produção.

## Contexto do teste

Projeto desenvolvido como resposta ao **Teste Prático - Autoflex**.
O sistema controla produtos, matérias-primas e a associação entre eles,
permitindo sugerir a produção com base no estoque e priorizando produtos
de maior valor.

Requisitos atendidos (resumo):

- CRUD de produtos e matérias-primas.
- Associação de matérias-primas aos produtos com quantidades.
- Sugestões de produção com valor total.
- Arquitetura separando API e frontend.

## Estrutura

- `apps/api/` - API Spring Boot
- `apps/web/` - Frontend Next.js
- `compose.yaml` - Postgres + serviços app (com perfis)

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
