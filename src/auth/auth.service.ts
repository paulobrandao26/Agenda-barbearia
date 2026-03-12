import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { Usuario, TipoUsuario } from '../usuarios/usuario.entity'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  async cadastrar(dados: {
    nome: string
    email: string
    senha: string
    telefone: string
    tipo: TipoUsuario
    nomeBarbearia?: string
  }) {
    const existe = await this.usuarioRepository.findOne({ where: { email: dados.email } })
    if (existe) throw new ConflictException('Email já cadastrado')

    const senhaHash = await bcrypt.hash(dados.senha, 10)
    const usuario = this.usuarioRepository.create({ ...dados, senha: senhaHash })
    await this.usuarioRepository.save(usuario)

    const { senha, ...resultado } = usuario
    return resultado
  }

  async login(email: string, senha: string) {
    const usuario = await this.usuarioRepository.findOne({ where: { email } })
    if (!usuario) throw new UnauthorizedException('Credenciais inválidas')

    const senhaValida = await bcrypt.compare(senha, usuario.senha)
    if (!senhaValida) throw new UnauthorizedException('Credenciais inválidas')

    const payload = { sub: usuario.id, email: usuario.email, tipo: usuario.tipo }
    const token = this.jwtService.sign(payload)

    const { senha: _, ...dados } = usuario
    return { access_token: token, usuario: dados }
  }

  async validarUsuario(id: string): Promise<Usuario> {
    return this.usuarioRepository.findOne({ where: { id, ativo: true } })
  }
}