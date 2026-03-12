import { Controller, Get, Post, Patch, Param, Body, Query, UseGuards, Request } from '@nestjs/common'
import { AgendamentoService } from './agendamento.service'
import { Agendamento, StatusAgendamento } from './agendamento.entity'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('agendamentos')
export class AgendamentoController {
  constructor(private readonly agendamentoService: AgendamentoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  criar(@Body() dados: Partial<Agendamento>, @Request() req) {
    return this.agendamentoService.criar({ ...dados, clienteId: req.user.id })
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

  @Get('meus')
  @UseGuards(JwtAuthGuard)
  listarMeus(@Request() req) {
    return this.agendamentoService.listarPorCliente(req.user.id)
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.agendamentoService.buscarPorId(id)
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  atualizarStatus(@Param('id') id: string, @Body() dados: { status: StatusAgendamento }) {
    return this.agendamentoService.atualizarStatus(id, dados.status)
  }

  @Patch(':id/cancelar')
  @UseGuards(JwtAuthGuard)
  cancelar(@Param('id') id: string) {
    return this.agendamentoService.cancelar(id)
  }
}