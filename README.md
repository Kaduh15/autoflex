# AutoFlex

Monorepo containing API and Web application.

## Structure

- `apps/api/` - Spring Boot API
- `compose.yaml` - PostgreSQL database

## Development

### API
```bash
docker compose up -d postgres
cd apps/api && ./mvnw spring-boot:run
```