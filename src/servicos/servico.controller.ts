import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common'
import { ServicoService } from './servico.service'
import { Servico } from './servico.entity'

@Controller('servicos')
export class ServicoController {
  constructor(private readonly servicoService: ServicoService) {}

  @Post()
  criar(@Body() dados: Partial<Servico>) {
    return this.servicoService.criar(dados)
  }

  @Get()
  listarTodos() {
    return this.servicoService.listarTodos()
  }

  @Get('barbeiro/:barbeiroId')
  listarPorBarbeiro(@Param('barbeiroId') barbeiroId: string) {
    return this.servicoService.listarPorBarbeiro(barbeiroId)
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.servicoService.buscarPorId(id)
  }

  @Put(':id')
  atualizar(@Param('id') id: string, @Body() dados: Partial<Servico>) {
    return this.servicoService.atualizar(id, dados)
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.servicoService.remover(id)
  }
}