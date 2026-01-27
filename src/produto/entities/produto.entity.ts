import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';

@Entity({ name: 'tb_produto' })
export class Produto {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  nome: string;

  @Column('decimal', { precision: 6, scale: 2 })
  preco: number;

  @Column()
  estoque: number;

  @ManyToOne(() => Categoria, categoria => categoria.produtos)
  categoria: Categoria;
}
