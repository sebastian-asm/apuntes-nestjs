import { join } from 'path'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ConfigModule } from '@nestjs/config'

import { CommonModule } from './common/common.module'
import { envConfig } from './common/config/env.config'
import { PokemonModule } from './pokemon/pokemon.module'
import { SeedModule } from './seed/seed.module'

@Module({
  imports: [
    // los módulos siempre van en los imports
    // configuración de las variables de entorno (siempre primero)
    ConfigModule.forRoot({
      load: [envConfig],
    }),
    ServeStaticModule.forRoot({
      // configuración de archivos estáticos
      rootPath: join(__dirname, '..', 'public'),
    }),
    // conexión a mongodb
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {}
