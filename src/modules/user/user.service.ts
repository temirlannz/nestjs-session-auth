import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async findUserByPhone(phone: string) {
    const user = await this.userRepository.findOne({
      where: { phone },
    });

    return user;
  }

  public async create(phone: string) {
    let user = await this.findUserByPhone(phone);

    if (!user) {
      const newUser = this.userRepository.create({
        phone,
      });
      user = await this.userRepository.save(newUser);
    }

    return user;
  }
}
