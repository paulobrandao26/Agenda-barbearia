import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common'
import { AgendamentoService } from './agendamento.service'
import { StatusAgendamento } from './agendamento.entity'

@Controller('agendamentos')
export class AgendamentoController {
  constructor(private readonly agendamentoService: AgendamentoService) {}

  @Post()
  criar(@Body() dados: {
    nomeCliente: string
    telefoneCliente: string
    barbeiroId: string
    servicoId: string
    dataHora: string
    observacao?: string
  }) {
    return this.agendamentoService.criar({
      ...dados,
      dataHora: new Date(dados.dataHora),
    })
  }

  @Get('barbeiro/:barbeiroId')
  listarPorBarbeiro(@Param('barbeiroId') barbeiroId: string) {
    return this.agendamentoService.listarPorBarbeiro(barbeiroId)
  }

  @Get('barbeiro/:barbeiroId/data')
  listarPorData(
    @Param('barbeiroId') barbeiroId: string,
    @Query('data') data: string,
  ) {
    return this.agendamentoService.listarPorData(barbeiroId, data)
  }

  @Get('barbeiro/:barbeiroId/horarios')
  horariosDisponiveis(
    @Param('barbeiroId') barbeiroId: string,
    @Query('data') data: string,
  ) {
    return this.agendamentoService.horariosDisponiveis(barbeiroId, data)
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.agendamentoService.buscarPorId(id)
  }

  @Patch(':id/status')
  atualizarStatus(@Param('id') id: string, @Body() dados: { status: StatusAgendamento }) {
    return this.agendamentoService.atualizarStatus(id, dados.status)
  }

  @Patch(':id/cancelar')
  cancelar(@Param('id') id: string) {
    return this.agendamentoService.cancelar(id)
  }
}