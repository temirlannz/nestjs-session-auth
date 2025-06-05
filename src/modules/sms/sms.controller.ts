import { Body, Controller, Post } from '@nestjs/common';
import { SendOtpDto } from './dtos/send-otp.dto';
import { SmsService } from './sms.service';

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('send-otp')
  public async sendOtp(@Body() dto: SendOtpDto) {
    return this.smsService.sendOtp(dto);
  }
}
