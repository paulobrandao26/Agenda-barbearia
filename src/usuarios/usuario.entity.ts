import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

export enum TipoUsuario {
  BARBEIRO = 'barbeiro',
  CLIENTE = 'cliente',
}

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  nome: string

  @Column({ unique: true })
  email: string

  @Column()
  senha: string

  @Column()
  telefone: string

  @Column({ type: 'enum', enum: TipoUsuario, default: TipoUsuario.CLIENTE })
  tipo: TipoUsuario

  @Column({ nullable: true })
  nomeBarbearia: string

  @Column({ default: true })
  ativo: boolean

  @CreateDateColumn()
  criadoEm: Date

  @UpdateDateColumn()
  atualizadoEm: Date
}