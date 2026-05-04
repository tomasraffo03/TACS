# TACS — TP Grupo 3

## Requisitos previos

| Herramienta | Versión mínima |
|---|---|
| Docker | 24+ |
| Docker Compose | v2 (incluido en Docker Desktop) |

---

## Cómo levantar la aplicación

```bash
# Desde la raíz del repositorio
docker compose up --build
```

| URL | Descripción |
|---|---|
| `http://localhost` | Aplicación web (frontend) |
| `http://localhost:8080/api/health` | Health check del backend |

### Usuarios de prueba

> El sistema usa persistencia en memoria. Los datos se reinician al bajar los contenedores.

Se puede crear usuarios a través del formulario de registro en la UI.

### Comandos útiles

```bash
# Levantar en background
docker compose up --build -d

# Ver logs en tiempo real
docker compose logs -f

# Ver logs de un servicio específico
docker compose logs -f backend

# Bajar todo y eliminar contenedores
docker compose down
```

---

### Componentes

| Servicio | Tecnología | Puerto |
|---|---|---|
| **frontend** | React 19 + Vite + TailwindCSS 4 → build estático servido por Nginx | 80 |
| **backend** | Spring Boot 4 + Java 21 + Lombok | 8080 |

Ambos corren en una red Docker interna (`tacs-net`). El frontend **nunca habla directamente con el backend desde el browser** — todo pasa por el proxy de Nginx. Esto elimina problemas de CORS.

---

## Decisiones de diseño

### Backend

- **Persistencia en memoria**: el enunciado de la primera entrega no requería base de datos persistente. Se implementaron repositorios en memoria con `HashMap` para poder iterar rápido sin dependencias externas. MongoDB está comentado en el `pom.xml` y `application.properties` para una futura integración.
- **Arquitectura en capas**: `Controller → Service → Repository`, separando responsabilidades y facilitando el testing unitario de cada capa y posterior migrado a microservicios.
- **Spring Boot 4 / Java 21**: se eligió la versión más reciente estable.

### Frontend

- **React 19 + Vite**: stack moderno, rápido en el desarrollo y buen rendimiento en builds.
- **TailwindCSS 4**: Nos permite iterar en la UI sin escribir CSS custom.
- **Lazy loading de páginas**: todas las páginas se importan con `React.lazy()` para que solo se descarguen cuando el usuario las visita.
- **Roles de usuario**: `PrivateRoute` soporta un `requiredRole` opcional. La ruta `/admin` solo es accesible para usuarios con rol `admin`.

---

## Uso de IA

Durante el desarrollo se utilizó **Claude Sonnet 4.6** como asistente de pair programming para:

- Desarrollo de los endpoints del backend.
- Desarrollo de las interfaces de usuario de frontend.
- Configuración de la infraestructura (Dockerfiles y docker-compose).
- Generación de estructuras base y código repetitivo.
- Validación de ideas y decisiones de diseño (principalmente UI).

La herramienta fue utilizada como apoyo, manteniendo revisión y adaptación manual del código generado.
---

## 📁 Estructura del proyecto

```
TACS/
├── backend/                  # Spring Boot
│   ├── src/main/java/...
│   │   ├── controller/       # REST controllers
│   │   ├── service/          # Lógica de negocio
│   │   ├── repository/       # Persistencia en memoria
│   │   └── models/           # Entidades del dominio
│   ├── Dockerfile
│   └── pom.xml
├── frontend/                 # React + Vite
│   ├── src/
│   │   ├── pages/            # Páginas por feature (subastas, colección, etc.)
│   │   ├── components/       # Componentes reutilizables
│   │   ├── services/         # Llamadas a la API + mappers
│   │   ├── types/            # Tipos TypeScript del dominio
│   │   └── router/           # Definición de rutas
│   ├── nginx.conf
│   └── Dockerfile
└── docker-compose.yml
```
