# Bookddy

## Running Frontend

To run it in hot reload mode and for dev:

```bash
    npx next dev 
```

To run it in production:
```bash
    npx next start
```

To build the bundle 

```bash
    npx next build
```

## Running Backend

To run the backend in development mode with hot reload:

```bash
docker compose watch
```

For production deployment:

```bash
docker compose up -d
```

The backend will be available at http://localhost:8080

## API Documentation
You can access the Swagger UI documentation at:
```
http://localhost:8080/swagger-ui.html
```


## Code Quality Tools in backend

### Checkstyle

We use Checkstyle for Java code style enforcement following a modified Google Java Style but adjusted for modern java as well.

To run Checkstyle:
```bash
./mvnw checkstyle:check
```

### PMD

To run PMD:
```bash
./mvnw pmd:check
```

### SpotBugs

To run SpotBugs:
```bash
./mvnw spotbugs:check
```

## Environment Variables

Copy `.env.example` to `.env` and update the values:
```bash
cp .env.example .env
```


