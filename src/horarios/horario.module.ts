import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HorarioTrabalho } from './horario.entity'
import { HorarioService } from './horario.service'
import { HorarioController } from './horario.controller'

@Module({
  imports: [TypeOrmModule.forFeature([HorarioTrabalho])],
  controllers: [HorarioController],
  providers: [HorarioService],
  exports: [HorarioService],
})
export class HorarioModule {}