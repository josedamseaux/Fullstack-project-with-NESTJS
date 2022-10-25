import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UsersModule } from './user/users.module';
import { PaymentsModule } from './payments/payments.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mssql',
    host: 'LEGIONJD',
    port: 1433,
    username: 'jduser',
    password: '123456',
    database: 'db1',
    entities: [User],
    synchronize: false,
    autoLoadEntities: true,
    options: { encrypt: false,  },
  }), UsersModule, PaymentsModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
