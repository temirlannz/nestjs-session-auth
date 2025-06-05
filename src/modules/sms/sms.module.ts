import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpEntity } from './entities/otp.entity';
import { SmsController } from './sms.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OtpEntity])],
  providers: [SmsService],
  controllers: [SmsController],
  exports: [SmsService],
})
export class SmsModule {}
