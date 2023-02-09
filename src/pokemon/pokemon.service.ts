import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { isValidObjectId, Model } from 'mongoose'

import { CreatePokemonDto } from './dto/create-pokemon.dto'
import { PaginationDto } from 'src/common/dto/pagination.dto'
import { Pokemon } from './entities/pokemon.entity'
import { UpdatePokemonDto } from './dto/update-pokemon.dto'

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) {}

  // centralizar el manejo de errores no controlados
  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Ya existe el Pokémon: ${JSON.stringify(error.keyValue)}`
      )
    } else {
      throw new InternalServerErrorException('Error al procesar los datos')
    }
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase()
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto)
      return pokemon
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto
    return this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .select('-__v')
      .sort({ no: 1 })
  }

  async findOne(term: string) {
    let pokemon: Pokemon

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
      throw new NotFoundException('Pokémon no encontrado')
    }

    return pokemon
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term)

    try {
      await pokemon.updateOne(
        {
          ...updatePokemonDto,
          name: updatePokemonDto.name
            ? updatePokemonDto.name.toLowerCase()
            : updatePokemonDto.name,
        },
        { new: true }
      )

      // si no se devuelve así, muestra la respuesta del objetvo de mongoose
      return { ...pokemon.toJSON(), ...updatePokemonDto }
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id)
    // await pokemon.deleteOne()
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id })
    if (deletedCount === 0) {
      throw new BadRequestException('Pokémon no encontrado')
    }
    return { id }
  }
}
