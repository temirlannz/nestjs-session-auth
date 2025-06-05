import { Module } from '@nestjs/common';
import { PostgresModule } from './config/postgres.module';
import { CoreConfigModule } from './config/config.module';
import { UserModule } from './modules/user/user.module';
import { SmsModule } from './modules/sms/sms.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    CoreConfigModule,
    PostgresModule,
    UserModule,
    SmsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
