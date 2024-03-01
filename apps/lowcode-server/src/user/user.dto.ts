import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddUserDto {
  @ApiProperty({ example: 123 })
  id?: string;

  @ApiProperty({ example: '1@qq.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '章三' })
  @IsNotEmpty()
  username: string;
}
