import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Servico } from './servico.entity'
import { ServicoService } from './servico.service'
import { ServicoController } from './servico.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Servico])],
  controllers: [ServicoController],
  providers: [ServicoService],
  exports: [ServicoService],
})
export class ServicoModule {}