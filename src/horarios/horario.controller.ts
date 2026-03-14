import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, Request } from '@nestjs/common'
import { HorarioService } from './horario.service'
import { HorarioTrabalho } from './horario.entity'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('horarios')
export class HorarioController {
  constructor(private readonly horarioService: HorarioService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  criar(@Body() dados: Partial<HorarioTrabalho>, @Request() req) {
    return this.horarioService.criar({ ...dados, barbeiroId: req.user.id })
  }

  @Get('barbeiro/:barbeiroId')
  listarPorBarbeiro(@Param('barbeiroId') barbeiroId: string) {
    return this.horarioService.listarPorBarbeiro(barbeiroId)
  }

  @Get('barbeiro/:barbeiroId/disponiveis')
  horariosDisponiveis(
    @Param('barbeiroId') barbeiroId: string,
    @Query('data') data: string,
  ) {
    return this.horarioService.gerarHorariosDisponiveis(barbeiroId, data)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  atualizar(@Param('id') id: string, @Body() dados: Partial<HorarioTrabalho>) {
    return this.horarioService.atualizar(id, dados)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remover(@Param('id') id: string) {
    return this.horarioService.remover(id)
  }
}