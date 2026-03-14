import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Usuario } from '../usuarios/usuario.entity'

export enum DiaSemana {
  DOMINGO = 0,
  SEGUNDA = 1,
  TERCA = 2,
  QUARTA = 3,
  QUINTA = 4,
  SEXTA = 5,
  SABADO = 6,
}

@Entity('horarios_trabalho')
export class HorarioTrabalho {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Usuario, { eager: true })
  @JoinColumn({ name: 'barbeiro_id' })
  barbeiro: Usuario

  @Column({ name: 'barbeiro_id' })
  barbeiroId: string

  @Column({ type: 'int' })
  diaSemana: DiaSemana

  @Column({ type: 'time' })
  horaInicio: string

  @Column({ type: 'time' })
  horaFim: string

  @Column({ default: 30, comment: 'Intervalo em minutos entre atendimentos' })
  intervaloMinutos: number

  @Column({ default: true })
  ativo: boolean

  @CreateDateColumn()
  criadoEm: Date

  @UpdateDateColumn()
  atualizadoEm: Date
}