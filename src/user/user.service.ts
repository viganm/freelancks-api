import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const salt = await bcrypt.genSalt(12);
      const hashPass = await bcrypt.hash(createUserDto.password, salt);
      const newUser = this.usersRepository.save({
        email: createUserDto.email,
        password: hashPass,
      });
      return newUser;
    } catch (error) {
      throw new Error('Error creating a User');
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOneForLogin(email: string, password: string) {
    try {
      const foundUser = await this.usersRepository.findOneBy({ email: email });
      if (!foundUser) throw new UnauthorizedException('User not found');
      const isMatch = await bcrypt.compare(password, foundUser.password);
      if (isMatch) return foundUser;
    } catch (error) {
      console.error('Error in findOneForLogin:', error.message);
      throw new Error('Error validating password');
    }
  }

  async findOneGoogle(googleId: string, email: string) {
    return await this.usersRepository.findOne({
      where: [{ google_id: googleId }, { email: email }],
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
