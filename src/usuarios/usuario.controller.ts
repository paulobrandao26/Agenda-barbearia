import { Controller, Get, Put, Delete, Param, Body, UseGuards, Request } from '@nestjs/common'
import { UsuarioService } from './usuario.service'
import { Usuario } from './usuario.entity'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get('barbeiros')
  listarBarbeiros() {
    return this.usuarioService.listarBarbeiros()
  }

  @Get('clientes')
  @UseGuards(JwtAuthGuard)
  listarClientes() {
    return this.usuarioService.listarClientes()
  }

  @Get('perfil')
  @UseGuards(JwtAuthGuard)
  perfil(@Request() req) {
    return this.usuarioService.buscarPorId(req.user.id)
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.usuarioService.buscarPorId(id)
  }

  @Put('perfil')
  @UseGuards(JwtAuthGuard)
  atualizar(@Request() req, @Body() dados: Partial<Usuario>) {
    return this.usuarioService.atualizar(req.user.id, dados)
  }

  @Delete('perfil')
  @UseGuards(JwtAuthGuard)
  desativar(@Request() req) {
    return this.usuarioService.desativar(req.user.id)
  }
}