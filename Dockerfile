# 1

# procesar las dependencias de la app
FROM node:18-alpine3.15 AS deps
# https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
# las dependencias se guardan en cache en caso que no hayan cambios para futuros builds
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json ./
RUN npm install --frozen-lockfile

# 2

# contenedor de la app
FROM node:18-alpine3.15 AS builder
WORKDIR /app
# se toman las dependencias del contenedor anterior y se copian a este
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# si no te estableceria el WD
# COPY . /app
# haciendo el build de la app nest
RUN npm run build

# 3

# se comienza a correr la app
FROM node:18-alpine3.15 AS runner
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --prod
COPY --from=builder /app/dist ./dist

# copiar todo nuestro directorio al contenedor dentro del WD
# se crear el .dockerignore para indicar cuales son las carpetas y archivos excluidos
# RUN mkdir -p ./pokedex
# COPY --from=builder ./app/dist/ ./app
# COPY ./.env ./app/.env

# dar permiso a un nuevo usuario para ejecutar la app
# RUN adduser --disabled-password pokeuser
# RUN chown -R pokeuser:pokeuser ./pokedex
# USER pokeuser

# EXPOSE 3001

CMD ["node", "dist/main"]