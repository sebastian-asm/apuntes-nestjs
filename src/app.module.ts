import { join } from 'path'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ServeStaticModule } from '@nestjs/serve-static'

import { PokemonModule } from './pokemon/pokemon.module'

@Module({
  imports: [
    // los módulos siempre van en los imports
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    // conexión a mongodb
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
    PokemonModule,
  ],
})
export class AppModule {}
