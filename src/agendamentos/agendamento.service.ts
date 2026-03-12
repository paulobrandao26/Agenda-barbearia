import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Between } from 'typeorm'
import { Agendamento, StatusAgendamento } from './agendamento.entity'

@Injectable()
export class AgendamentoService {
  constructor(
    @InjectRepository(Agendamento)
    private readonly agendamentoRepository: Repository<Agendamento>,
  ) {}

  async criar(dados: Partial<Agendamento>): Promise<Agendamento> {
    const conflito = await this.agendamentoRepository.findOne({
      where: {
        barbeiroId: dados.barbeiroId,
        dataHora: dados.dataHora,
        status: StatusAgendamento.CONFIRMADO,
      },
    })
    if (conflito) throw new BadRequestException('Horário já ocupado')

    const agendamento = this.agendamentoRepository.create(dados)
    return this.agendamentoRepository.save(agendamento)
  }

  async listarPorBarbeiro(barbeiroId: string): Promise<Agendamento[]> {
    return this.agendamentoRepository.find({
      where: { barbeiroId },
      order: { dataHora: 'ASC' },
    })
  }

  async listarPorCliente(clienteId: string): Promise<Agendamento[]> {
    return this.agendamentoRepository.find({
      where: { clienteId },
      order: { dataHora: 'ASC' },
    })
  }

  async listarPorData(barbeiroId: string, data: string): Promise<Agendamento[]> {
    const inicio = new Date(data)
    inicio.setHours(0, 0, 0, 0)
    const fim = new Date(data)
    fim.setHours(23, 59, 59, 999)

    return this.agendamentoRepository.find({
      where: {
        barbeiroId,
        dataHora: Between(inicio, fim),
      },
      order: { dataHora: 'ASC' },
    })
  }

  async buscarPorId(id: string): Promise<Agendamento> {
    const agendamento = await this.agendamentoRepository.findOne({ where: { id } })
    if (!agendamento) throw new NotFoundException('Agendamento não encontrado')
    return agendamento
  }

  async atualizarStatus(id: string, status: StatusAgendamento): Promise<Agendamento> {
    const agendamento = await this.buscarPorId(id)
    agendamento.status = status
    return this.agendamentoRepository.save(agendamento)
  }

  async cancelar(id: string): Promise<Agendamento> {
    return this.atualizarStatus(id, StatusAgendamento.CANCELADO)
  }
}