import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class SendOtpDto {
  @IsPhoneNumber('KZ', {
    message: 'Please provide a valid phone number (e.g., +77070000000).',
  })
  @IsNotEmpty({ message: 'Phone number is required.' })
  phone: string;
}
