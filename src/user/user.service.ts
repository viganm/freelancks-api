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
    try{
      const salt = await bcrypt.genSalt(12);
      const hashPass = await bcrypt.hash(createUserDto.password, salt)
      const newUser = this.usersRepository.save({email: createUserDto.email, password: hashPass })
      console.log(newUser)
      return newUser;
    }catch(error){
      throw new Error('Error creating a User');
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOneForLogin(email: string, password: string) {
    try{
      const foundUser = await this.usersRepository.findOneBy({email: email})
      if (!foundUser) throw new Error('User not found');
      console.log('user',foundUser.password)
      const isMatch = await bcrypt.compare(foundUser.password, password);
      if (isMatch) return foundUser;
    }catch(error){
      console.error('Error in findOneForLogin:', error.message);
      throw new Error('Error validating password');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
