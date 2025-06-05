import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { VerifyOtpDto } from './dtos/verify-otp.dto';
import { SmsService } from '../sms/sms.service';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly smsService: SmsService,
    private readonly userService: UserService,
  ) {}

  public async verifyOtp(req: Request, dto: VerifyOtpDto) {
    const { phone, otp } = dto;

    const [existingOtp, user] = await Promise.all([
      this.smsService.findOtpByPhone(phone),
      this.userService.findUserByPhone(phone),
    ]);

    if (!existingOtp) {
      throw new NotFoundException('OTP not found for this phone number.');
    }

    if (existingOtp.otp !== otp) {
      throw new BadRequestException('Invalid OTP provided.');
    }

    let existingUser = user;
    if (!existingUser) {
      existingUser = await this.userService.create(phone);
    }

    await this.smsService.deleteOtp(phone);

    req.session.user_id = existingUser.id;

    await this.saveSession(req, existingUser);

    return existingUser;
  }

  public async saveSession(req: Request, user: UserEntity) {
    return new Promise((resolve, reject) => {
      req.session.save((err) => {
        if (err) {
          reject(new InternalServerErrorException('Failed to save session.'));
        } else {
          resolve({ user });
        }
      });
    });
  }
}
