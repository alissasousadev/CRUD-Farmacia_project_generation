import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post,Put,} from '@nestjs/common';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../entities/produto.entity';

@Controller('/produto')
export class ProdutoController {

  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  create(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.create(produto);
  }

  @Get()
  findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Get('/nome/:nome')
findByNome(@Param('nome') nome: string): Promise<Produto[]> {
  return this.produtoService.findByNome(nome);
}

  @Get('/:id')
  findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Produto> {
    return this.produtoService.findById(id);
  }

  @Put()
  update(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.update(produto);
  }

  @Delete('/:id')
  delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.produtoService.delete(id);
  }
}
