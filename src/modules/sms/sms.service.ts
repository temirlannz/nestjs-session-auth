import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OtpEntity } from './entities/otp.entity';
import { Repository } from 'typeorm';
import { SendOtpDto } from './dtos/send-otp.dto';
import { generateOtp } from '../../libs/utils/generate-otp.util';

@Injectable()
export class SmsService {
  constructor(
    @InjectRepository(OtpEntity)
    private readonly otpRepository: Repository<OtpEntity>,
  ) {}

  public async findOtpByPhone(phone: string) {
    const otp = await this.otpRepository.findOne({
      where: { phone },
    });

    return otp;
  }

  public async sendOtp(dto: SendOtpDto) {
    const { phone } = dto;

    const otp = generateOtp();

    const existingOtp = await this.findOtpByPhone(phone);
    if (existingOtp) {
      return this.sendSms(phone, `Your OTP code is: ${existingOtp.otp}`);
    }

    const newOtp = this.otpRepository.create({
      phone,
      otp,
    });
    const savedOtp = await this.otpRepository.save(newOtp);

    return this.sendSms(phone, `Your OTP code is: ${savedOtp.otp}`);
  }

  async deleteOtp(phone: string) {
    const result = await this.otpRepository.delete({ phone });

    if (result.affected === 0) {
      throw new NotFoundException('No OTP found for this phone number.');
    }

    return { message: 'OTP deleted successfully.' };
  }

  public async sendSms(phone: string, message: string) {
    // This is a placeholder for sending an SMS.
    // As we do not integrate external SMS service we mock it by returning message object
    return { message };
  }
}
