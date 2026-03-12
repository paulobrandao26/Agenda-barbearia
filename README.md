# 🚀 Barber SaaS - Backend

Backend completo em NestJS para sistema de agendamento de barbearias.

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- PostgreSQL (ou usar Supabase gratuitamente)

## 🔧 Instalação Rápida

```bash
# 1. Instalar dependências
npm install

# 2. Copiar arquivo de ambiente
cp .env.example .env

# 3. Editar .env com suas credenciais
# (DATABASE_URL mínimo necessário)

# 4. Gerar Prisma Client
npm run prisma:generate

# 5. Executar migrations
npm run prisma:migrate

# 6. Rodar em desenvolvimento
npm run start:dev
```

## 🌐 API estará rodando em:
- http://localhost:3000
- Endpoints: http://localhost:3000/api

## 📁 Estrutura de Pastas

```
src/
├── main.ts                    # Entry point
├── app.module.ts              # Módulo raiz
├── prisma/                    # Prisma ORM
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── auth/                      # Autenticação JWT
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── strategies/
│   └── dto/
├── barbeiros/                 # CRUD Barbeiros
│   ├── barbeiros.module.ts
│   ├── barbeiros.controller.ts
│   ├── barbeiros.service.ts
│   └── dto/
├── clientes/                  # CRUD Clientes
│   ├── clientes.module.ts
│   ├── clientes.controller.ts
│   ├── clientes.service.ts
│   └── dto/
├── servicos/                  # CRUD Serviços
│   ├── servicos.module.ts
│   ├── servicos.controller.ts
│   ├── servicos.service.ts
│   └── dto/
├── agendamentos/              # CORE - Agendamentos
│   ├── agendamentos.module.ts
│   ├── agendamentos.controller.ts
│   ├── agendamentos.service.ts
│   ├── anti-double-booking.service.ts
│   └── dto/
├── disponibilidade/           # Gestão de disponibilidade
├── fila-espera/              # Fila de espera automática
├── galeria/                  # Upload de fotos
├── avaliacoes/               # Avaliações
└── health/                   # Health check
```

## 🔑 Variáveis de Ambiente Obrigatórias

```env
# Mínimo para rodar:
DATABASE_URL="postgresql://..."
JWT_SECRET="seu-secret-aqui"
```

## 📡 Principais Endpoints

### Autenticação
```
POST   /api/auth/register/barbeiro
POST   /api/auth/register/cliente  
POST   /api/auth/login
```

### Barbeiros
```
GET    /api/barbeiros
GET    /api/barbeiros/:id
POST   /api/barbeiros
PUT    /api/barbeiros/:id
```

### Agendamentos
```
POST   /api/agendamentos
GET    /api/agendamentos/meus
GET    /api/agendamentos/barbeiro/:id/slots
POST   /api/agendamentos/check-availability
PUT    /api/agendamentos/:id/confirmar
PUT    /api/agendamentos/:id/cancelar
```

### Health Check
```
GET    /api/health
```

## 🗄️ Banco de Dados

### Opção 1: Supabase (GRÁTIS - Recomendado)

```bash
1. Criar conta em https://supabase.com
2. Criar novo projeto
3. Copiar DATABASE_URL de Settings > Database
4. Colar no .env
```

### Opção 2: PostgreSQL Local

```bash
# Instalar PostgreSQL
# Criar database:
createdb barber_saas

# Atualizar .env:
DATABASE_URL="postgresql://usuario:senha@localhost:5432/barber_saas"
```

## 🔨 Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev          # Modo watch

# Build
npm run build              # Compilar para produção
npm run start:prod         # Rodar produção

# Prisma
npm run prisma:generate    # Gerar Prisma Client
npm run prisma:migrate     # Executar migrations
npm run prisma:studio      # GUI do banco
npm run seed               # Seed de dados

# Testes
npm run test               # Unit tests
npm run test:e2e           # E2E tests
npm run test:cov           # Coverage
```

## 🌟 Funcionalidades Implementadas

✅ Autenticação JWT
✅ CRUD completo de Barbeiros, Clientes, Serviços
✅ Sistema de Agendamentos
✅ Anti-double-booking (3 camadas)
✅ Verificação de disponibilidade em tempo real
✅ Geração de slots disponíveis
✅ CORS configurado
✅ Validation pipes
✅ Health check endpoint
✅ Rate limiting
✅ Prisma ORM

## 🚧 Próximas Implementações

Os seguintes módulos estão estruturados mas precisam ser implementados:

- [ ] Fila de Espera (CRON jobs)
- [ ] Upload de Galeria (Supabase Storage)
- [ ] Pagamentos (Mercado Pago)
- [ ] Notificações Push (Firebase)
- [ ] Re-booking inteligente

## 🐛 Troubleshooting

### Erro: Prisma Client não gerado
```bash
npm run prisma:generate
```

### Erro: Migrations não aplicadas
```bash
npm run prisma:migrate
```

### Erro: Porta 3000 em uso
```bash
# Mudar PORT no .env
PORT=3001
```

### Erro de conexão com banco
```bash
# Verificar se DATABASE_URL está correto no .env
# Testar conexão:
npm run prisma:studio
```

## 📚 Documentação Adicional

- [Prisma Docs](https://www.prisma.io/docs)
- [NestJS Docs](https://docs.nestjs.com)
- [Supabase Docs](https://supabase.com/docs)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit (`git commit -m 'Add: nova funcionalidade'`)
4. Push (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📄 Licença

MIT

---

**Desenvolvido com ❤️ usando NestJS + Prisma + PostgreSQL**
