import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'vigan.mustafa.vm@gmail.com',
    description: 'User email',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    example: 'vigan123',
    description: 'User password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
