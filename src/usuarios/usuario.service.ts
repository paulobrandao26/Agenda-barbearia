import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Usuario, TipoUsuario } from './usuario.entity'

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async listarBarbeiros(): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      where: { tipo: TipoUsuario.BARBEIRO, ativo: true },
    })
  }

  async listarClientes(): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      where: { tipo: TipoUsuario.CLIENTE, ativo: true },
    })
  }

  async buscarPorId(id: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } })
    if (!usuario) throw new NotFoundException('Usuário não encontrado')
    return usuario
  }

  async atualizar(id: string, dados: Partial<Usuario>): Promise<Usuario> {
    const usuario = await this.buscarPorId(id)
    delete dados.senha
    Object.assign(usuario, dados)
    return this.usuarioRepository.save(usuario)
  }

  async desativar(id: string): Promise<void> {
    const usuario = await this.buscarPorId(id)
    usuario.ativo = false
    await this.usuarioRepository.save(usuario)
  }
}