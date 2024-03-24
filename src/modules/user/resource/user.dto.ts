import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Message } from 'src/config/helper/message-validator.helper';

export class UserDto {
  @Type(() => String)
  @IsOptional()
  @IsString({ message: Message.STRING('$property') })
  @ApiProperty({
    title: 'name',
    example: 'edwin',
    required: false,
  })
  name: string;

  @Type(() => Number)
  @IsOptional()
  @IsNumber({}, { message: Message.NUMBER('$property') })
  @ApiProperty({
    title: 'phone',
    example: '934876433',
    required: false,
  })
  phone: number;

  @Type(() => String)
  @IsOptional()
  @IsString({ message: Message.STRING('$property') })
  @ApiProperty({
    title: 'email',
    example: 'edwin.apd.1198@gmail.com',
    required: false,
  })
  email: string;

  @Type(() => String)
  @IsOptional()
  @IsString({ message: Message.STRING('$property') })
  @ApiProperty({
    title: 'n_document',
    example: '71120253',
    required: false,
  })
  documentNumber: string;

  @Type(() => String)
  @IsOptional()
  @IsString({ message: Message.STRING('$property') })
  @ApiProperty({
    title: 'gender',
    example: 'M',
    required: false,
  })
  gender: string;

  @Type(() => Date)
  @IsOptional()
  @IsDate({ message: Message.IsDate('$property') })
  @ApiProperty({
    title: 'birthdate',
    example: '1998-10-11',
    required: false,
  })
  birthdate: Date | null;
}

export class UserDtoId extends UserDto {
  @Type(() => Number)
  @IsNumber({}, { message: Message.NUMBER('$property') })
  @ApiProperty({
    title: 'id_usert',
    example: '1',
    required: true,
  })
  id: number;
}
