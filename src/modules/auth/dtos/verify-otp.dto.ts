import {
  IsInt,
  IsNotEmpty,
  IsPhoneNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class VerifyOtpDto {
  @IsPhoneNumber('KZ', {
    message: 'Please provide a valid phone number (e.g., +77070000000).',
  })
  @IsNotEmpty({ message: 'Phone number is required.' })
  phone: string;

  @Type(() => Number) // transform string to number
  @IsInt({ message: 'otp must be a number.' })
  @IsNotEmpty({ message: 'otp is required.' })
  otp: number;
}
