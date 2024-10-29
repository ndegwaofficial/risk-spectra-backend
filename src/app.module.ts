import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CourtCasesModule } from './court-cases/court-cases.module';
import { JudgmentsModule } from './judgments/judgments.module';
import { PaymentsModule } from './payments/payments.module';
import { ReportingModule } from './reporting/reporting.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'riskspectra',
      password: 'riskspectra',
      database: 'risk_spectra',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    CourtCasesModule,
    JudgmentsModule,
    PaymentsModule,
    ReportingModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
