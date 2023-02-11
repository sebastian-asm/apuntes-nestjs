# Demo API CRUD con NestJS

## Comandos para el proyecto:

- Instalar Nest CLI: `pnpm add -g @nestjs/cli`
- Levantar base de datos (MongoDB): `docker-compose up -d`

## Stack de tecnologías utilizadas

- NestJS y Typescript
- MongoDB
- Docker

## Correr en modo **producción**

1. Tener creado el archivo `.env.prod` con las variables de entorno.

2. Crear y ejecutar la imagen de Docker en modo detach: `docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d --build`

## Endpoints

Base: https://nest-intro-production.up.railway.app

| Método | Endpoint              | Descripción                                         |
| ------ | --------------------- | --------------------------------------------------- |
| GET    | /api/seed             | Agregar datos de prueba                             |
| GET    | /api/pokemon          | Obtener todo el listado                             |
| GET    | /api/pokemon/:termino | Obtener un pkmn por id, número o nombre             |
| POST   | /api/pokemon          | Crear pkmn (name y no)                              |
| PATCH  | /api/pokemon/:termino | Actualizar pkmn por id, número o nombre (name o no) |
| DELETE | /api/pokemon/:termino | Eliminar pkmn por id, número o nombre               |

# Notas sobre NestJS

**Inyección de Dependencias**: inyectar una clase a otra.

**@decoradores**: una función común.

**interfaces**: saber como lucen los objetos.

**Controllers**: son lo que manejan las peticiones y luego emitir una respuesta.

**@Module**: agrupador de una característica en particular, por ejemplo, un módulo solo para la autenticación.

**Entity (representación de una tabla)**: se podria entender como una referencia de como se estarían insertando los datos a la db.

`nest g co <controller>`

**Services (lógica de negocio)**: es una clase que se inyecta a otra. Todos lo services son providers pero no necesariamente todos los providers son services.

`nest g s <service>`

**Exception Filters**: manejar los errores en las respuestas, por ejemplo _NotFoundException_ que representa un 404.

**Pipes**: permiten tranformar la data: pasar de un string a number por ejemplo. Pueden ir a nivel de params, controllers, a nivel global del controller y global de app dependiendo de nuestra necesidad.

**DTOs (Data Transfer Object)**: es un objecto que nos sirve para pasar información del controller al service y asegurarnos que la data siempre venga como uno espera.
