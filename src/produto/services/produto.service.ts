import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Produto } from '../entities/produto.entity';

@Injectable()
export class ProdutoService {

  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  async create(produto: Produto): Promise<Produto> {
    const novoProduto = this.produtoRepository.create(produto);
    return this.produtoRepository.save(produto);
  }

  async findAll(): Promise<Produto[]> {
    return this.produtoRepository.find({ relations: ['categoria'] });
  }

  async findByNome(nome: string): Promise<Produto[]> {
  return this.produtoRepository.find({
    where: {
      nome: Like(`%${nome}%`)
    },
    relations: ['categoria'],
  });
}
  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });

    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }

    return produto;
  }

  async update(produto: Produto): Promise<Produto> {
    await this.findById(produto.id);
    const produtoAtualizado = this.produtoRepository.create(produto);
    return this.produtoRepository.save(produto);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.produtoRepository.delete(id);
  }
}
