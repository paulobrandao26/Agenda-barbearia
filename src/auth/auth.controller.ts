import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { TipoUsuario } from '../usuarios/usuario.entity'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('cadastrar')
  cadastrar(@Body() dados: {
    nome: string
    email: string
    senha: string
    telefone: string
    tipo: TipoUsuario
    nomeBarbearia?: string
  }) {
    return this.authService.cadastrar(dados)
  }

  @Post('login')
  login(@Body() dados: { email: string; senha: string }) {
    return this.authService.login(dados.email, dados.senha)
  }
}