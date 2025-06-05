import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { VerifyOtpDto } from './dtos/verify-otp.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('verify-otp')
  public async verifyOtp(
    @Req() req: Request,
    @Body() dto: VerifyOtpDto
  ) {
    return this.authService.verifyOtp(req, dto);
  }
}
