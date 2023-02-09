import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'

import { CreatePokemonDto } from './dto/create-pokemon.dto'
import { PaginationDto } from 'src/common/dto/pagination.dto'
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe'
import { PokemonService } from './pokemon.service'
import { UpdatePokemonDto } from './dto/update-pokemon.dto'

// estará pendiente de la ruta /pokemon
@Controller('pokemon')
export class PokemonController {
  constructor(
    // inyección de servicio
    private readonly pokemonService: PokemonService
  ) {}

  // personalizar el código de la respuesta
  // @HttpCode(200)
  // permite tomar las validaciones del dto, pero solo en esta petición
  // @UsePipes(ValidationPipe)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto)
  }

  @Get()
  // @query sirve para obtener todos los parámetros de la url
  findAll(@Query() paginationDto: PaginationDto) {
    return this.pokemonService.findAll(paginationDto)
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.pokemonService.findOne(term)
  }

  @Patch(':term')
  update(
    // @param permite obtener el parámetro 'term' de la url
    @Param('term') term: string,
    @Body() updatePokemonDto: UpdatePokemonDto
  ) {
    return this.pokemonService.update(term, updatePokemonDto)
  }

  @Delete(':id')
  // pipe personalizado
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(id)
  }
}
