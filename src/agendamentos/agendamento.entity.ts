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
import { Servico } from '../servicos/servico.entity'

export enum StatusAgendamento {
  PENDENTE = 'pendente',
  CONFIRMADO = 'confirmado',
  CANCELADO = 'cancelado',
  CONCLUIDO = 'concluido',
}

@Entity('agendamentos')
export class Agendamento {
  @PrimaryGeneratedColumn('uuid')
  id: string

  // Cliente sem conta — só nome e telefone
  @Column()
  nomeCliente: string

  @Column()
  telefoneCliente: string

  @ManyToOne(() => Usuario, { eager: true })
  @JoinColumn({ name: 'barbeiro_id' })
  barbeiro: Usuario

  @Column({ name: 'barbeiro_id' })
  barbeiroId: string

  @ManyToOne(() => Servico, { eager: true })
  @JoinColumn({ name: 'servico_id' })
  servico: Servico

  @Column({ name: 'servico_id' })
  servicoId: string

  @Column({ type: 'timestamp' })
  dataHora: Date

  @Column({
    type: 'enum',
    enum: StatusAgendamento,
    default: StatusAgendamento.PENDENTE,
  })
  status: StatusAgendamento

  @Column({ type: 'text', nullable: true })
  observacao: string

  @CreateDateColumn()
  criadoEm: Date

  @UpdateDateColumn()
  atualizadoEm: Date
}