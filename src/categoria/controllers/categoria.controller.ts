import {Body, Controller, Delete, Get,Param, Post,Put, ParseIntPipe,} from '@nestjs/common';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../entities/categoria.entity';

@Controller('/categoria')
export class CategoriaController {
    constructor(private readonly categoriaService: CategoriaService,) { }

    @Post()
    create(@Body() categoria: Categoria): Promise<Categoria> {
        return this.categoriaService.create(categoria);
    }

    @Get()
    findAll(): Promise<Categoria[]> {
        return this.categoriaService.findAll();
  }

    @Get('/nome/:nome')
  findByNome(@Param('nome') nome: string): Promise<Categoria[]> {
    return this.categoriaService.findByNome(nome);
  }
  
  @Get('/:id')
    findById(@Param('id', ParseIntPipe) id: number,): Promise<Categoria> {
        return this.categoriaService.findById(id);
  }

  @Put()
    update(@Body() categoria: Categoria): Promise<Categoria> {
        return this.categoriaService.update(categoria);
  }

    @Delete('/:id')
    delete(@Param('id', ParseIntPipe) id: number,): Promise<void> {
        return this.categoriaService.delete(id);
  }
}
