import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthModule } from './health/health.module';
import { ServicoModule } from './servicos/servico.module';
import { AuthModule } from './auth/auth.module';
import { AgendamentoModule } from './agendamentos/agendamento.module';
import { UsuarioModule } from './usuarios/usuario.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        ssl: { rejectUnauthorized: false },
        extra: {
          max: 10,
        },
      }),
      inject: [ConfigService],
    }),

    HealthModule,
    ServicoModule,
    AuthModule,
    AgendamentoModule,
    UsuarioModule,
  ],
})
export class AppModule {}