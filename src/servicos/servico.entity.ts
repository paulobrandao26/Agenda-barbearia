import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Usuario } from '../usuarios/usuario.entity'

@Entity('servicos')
export class Servico {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  nome: string

  @Column({ type: 'text', nullable: true })
  descricao: string

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  preco: number

  @Column({ comment: 'Duração em minutos' })
  duracaoMinutos: number

  @Column({ default: true })
  ativo: boolean

  @Column({ nullable: true })
  imagemUrl: string

  @ManyToOne(() => Usuario, { eager: true })
  @JoinColumn({ name: 'barbeiro_id' })
  barbeiro: Usuario

  @Column({ name: 'barbeiro_id' })
  barbeiroId: string

  @CreateDateColumn()
  criadoEm: Date

  @UpdateDateColumn()
  atualizadoEm: Date
}