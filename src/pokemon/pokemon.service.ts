import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { isValidObjectId, Model } from 'mongoose'

import { CreatePokemonDto } from './dto/create-pokemon.dto'
import { Pokemon } from './entities/pokemon.entity'
import { UpdatePokemonDto } from './dto/update-pokemon.dto'

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase()
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto)
      return pokemon
    } catch (error) {
      if (error.code === 11000) {
        const { name } = error.keyValue
        throw new BadRequestException(`Ya existe el Pokémon: ${name}`)
      } else {
        throw new InternalServerErrorException('Error al crear el Pokémon')
      }
    }
  }

  findAll() {
    return `This action returns all pokemon`
  }

  async findOne(term: string) {
    let pokemon = Pokemon

    // buscar por número
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term })
    } else if (isValidObjectId(term)) {
      // buscar por id de Mongo
      pokemon = await this.pokemonModel.findById(term)
    } else {
      // buscar por el nombre
      pokemon = await this.pokemonModel.findOne({
        name: term.toLowerCase().trim(),
      })
    }

    if (!pokemon) {
      throw new NotFoundException(`Pokémon no encontrado`)
    }

    return pokemon
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`
  }
}
