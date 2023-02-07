import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { Document } from 'mongoose'

@Schema()
export class Pokemon extends Document {
  @Prop({
    unique: true,
    // creación del index a base del nombre para búsquedas más rápidas
    index: true,
  })
  name: string

  @Prop({
    unique: true,
    index: true,
  })
  no: number
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon)
