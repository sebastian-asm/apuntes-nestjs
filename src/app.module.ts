import { join } from 'path'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ConfigModule } from '@nestjs/config'

import { CommonModule } from './common/common.module'
import { envConfig } from './common/config/env.config'
import { JoiValidationSchema } from './common/config/joi.validation'
import { PokemonModule } from './pokemon/pokemon.module'
import { SeedModule } from './seed/seed.module'

@Module({
  imports: [
    // los módulos siempre van en los imports
    // configuración de las variables de entorno (siempre primero)
    ConfigModule.forRoot({
      // load y validarionSchema pueden trabajar en conjunto
      load: [envConfig],
      validationSchema: JoiValidationSchema,
    }),
    ServeStaticModule.forRoot({
      // configuración de archivos estáticos
      rootPath: join(__dirname, '..', 'public'),
    }),
    // conexión a mongodb
    MongooseModule.forRoot(process.env.MONGODB),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {}
