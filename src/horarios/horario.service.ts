import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { HorarioTrabalho } from './horario.entity'

@Injectable()
export class HorarioService {
  constructor(
    @InjectRepository(HorarioTrabalho)
    private readonly horarioRepository: Repository<HorarioTrabalho>,
  ) {}

  async criar(dados: Partial<HorarioTrabalho>): Promise<HorarioTrabalho> {
    const horario = this.horarioRepository.create(dados)
    return this.horarioRepository.save(horario)
  }

  async listarPorBarbeiro(barbeiroId: string): Promise<HorarioTrabalho[]> {
    return this.horarioRepository.find({
      where: { barbeiroId, ativo: true },
      order: { diaSemana: 'ASC' },
    })
  }

  async buscarPorId(id: string): Promise<HorarioTrabalho> {
    const horario = await this.horarioRepository.findOne({ where: { id } })
    if (!horario) throw new NotFoundException('Horário não encontrado')
    return horario
  }

  async atualizar(id: string, dados: Partial<HorarioTrabalho>): Promise<HorarioTrabalho> {
    const horario = await this.buscarPorId(id)
    Object.assign(horario, dados)
    return this.horarioRepository.save(horario)
  }

  async remover(id: string): Promise<void> {
    const horario = await this.buscarPorId(id)
    horario.ativo = false
    await this.horarioRepository.save(horario)
  }

  async gerarHorariosDisponiveis(barbeiroId: string, data: string): Promise<string[]> {
    const diaSemana = new Date(data + 'T12:00:00').getDay()

    const horarioTrabalho = await this.horarioRepository.findOne({
      where: { barbeiroId, diaSemana, ativo: true },
    })

    if (!horarioTrabalho) return []

    const horarios: string[] = []
    const [inicioH, inicioM] = horarioTrabalho.horaInicio.split(':').map(Number)
    const [fimH, fimM] = horarioTrabalho.horaFim.split(':').map(Number)

    let atual = inicioH * 60 + inicioM
    const fim = fimH * 60 + fimM

    while (atual < fim) {
      const h = Math.floor(atual / 60).toString().padStart(2, '0')
      const m = (atual % 60).toString().padStart(2, '0')
      horarios.push(`${h}:${m}`)
      atual += horarioTrabalho.intervaloMinutos
    }

    return horarios
  }
}