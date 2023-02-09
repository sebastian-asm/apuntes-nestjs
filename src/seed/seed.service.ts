import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import axios, { AxiosInstance } from 'axios'
import { Model } from 'mongoose'

import { Pokemon } from 'src/pokemon/entities/pokemon.entity'
import { PokeResponse } from './interfaces/pkmn-response.interface'

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany()
    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650'
    )

    const pkmnToInsert: { name: string; no: number }[] = []
    for (const { name, url } of data.results) {
      const segments = url.split('/')
      const no = +segments.at(-2)
      pkmnToInsert.push({ name, no })
    }

    await this.pokemonModel.insertMany(pkmnToInsert)
    return 'Semilla agregada exitosamente'
  }
}
