import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Servico } from './servico.entity'

@Injectable()
export class ServicoService {
  constructor(
    @InjectRepository(Servico)
    private readonly servicoRepository: Repository<Servico>,
  ) {}

  async criar(dados: Partial<Servico>): Promise<Servico> {
    const servico = this.servicoRepository.create(dados)
    return this.servicoRepository.save(servico)
  }

  async listarTodos(): Promise<Servico[]> {
    return this.servicoRepository.find({ where: { ativo: true } })
  }

  async listarPorBarbeiro(barbeiroId: string): Promise<Servico[]> {
    return this.servicoRepository.find({ where: { barbeiroId, ativo: true } })
  }

  async buscarPorId(id: string): Promise<Servico> {
    const servico = await this.servicoRepository.findOne({ where: { id } })
    if (!servico) throw new NotFoundException('Serviço não encontrado')
    return servico
  }

  async atualizar(id: string, dados: Partial<Servico>): Promise<Servico> {
    const servico = await this.buscarPorId(id)
    Object.assign(servico, dados)
    return this.servicoRepository.save(servico)
  }

  async remover(id: string): Promise<void> {
    const servico = await this.buscarPorId(id)
    servico.ativo = false
    await this.servicoRepository.save(servico)
  }
}