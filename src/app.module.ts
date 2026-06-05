import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PortfoliosModule } from './portfolios/portfolios.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from './projects/projects.module';
import { SkillsService } from './skills/skills.service';
import { SkillsController } from './skills/skills.controller';
import { SkillsModule } from './skills/skills.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    PrismaModule,
    PortfoliosModule,
    AuthModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProjectsModule,
    SkillsModule,
    QueueModule,
  ],
  controllers: [AppController, SkillsController],
  providers: [AppService, SkillsService],
})
export class AppModule {}
