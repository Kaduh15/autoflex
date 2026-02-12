# AutoFlex

![Status](https://img.shields.io/badge/status-active-success)
![Node](https://img.shields.io/badge/node-20.x-339933)
![Java](https://img.shields.io/badge/java-17-007396)
![Docker](https://img.shields.io/badge/docker-ready-2496ED)

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

## Fluxo principal (exemplo)

1. Cadastre matérias-primas com estoque inicial.
2. Cadastre produtos.
3. Associe matérias-primas aos produtos (LOM).
4. Consulte `GET /production/suggestion` para obter o plano de produção
   priorizado por valor.

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

Variáveis importantes:

- `CORS_ALLOWED_ORIGINS`: lista de origens permitidas (separadas por vírgula).

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

## Deploy

O projeto foi publicado em uma VPS própria para testes:

- Web: `https://autoflex.lebdev.me/`
- API: `https://api.autoflex.lebdev.me/`

Como é uma estrutura de teste, esses endereços podem ficar indisponíveis.

## Endpoints úteis

- API: `http://localhost:8080`
- Swagger UI: `http://localhost:8080/swagger`
- Web: `http://localhost:3000`

## Rotas principais da API

Produtos

- `GET /products`
- `POST /products`
- `GET /products/{id}`
- `PUT /products/{id}`
- `DELETE /products/{id}`

Matérias-primas

- `GET /raw-materials`
- `POST /raw-materials`
- `GET /raw-materials/{id}`
- `PUT /raw-materials/{id}`
- `DELETE /raw-materials/{id}`

Lista de materiais (LOM)

- `GET /products/{id}/lom`
- `POST /products/{id}/lom/items`
- `DELETE /products/{id}/lom/items/{rawMaterialId}`

Sugestões de produção

- `GET /production/suggestion`
