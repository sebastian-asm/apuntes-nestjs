import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { PokemonService } from './pokemon.service'
import { PokemonController } from './pokemon.controller'
import { Pokemon, PokemonSchema } from './entities/pokemon.entity'

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    MongooseModule.forFeature([
      {
        // name viene de extendes Documents
        name: Pokemon.name,
        schema: PokemonSchema,
      },
    ]),
  ],
  // exponer a otros componentes
  exports: [],
})
export class PokemonModule {}
