import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Message } from 'src/config/helper/message-validator.helper';

export class CityDto {
  @Type(() => String)
  @IsOptional()
  @IsString({ message: Message.STRING('$property') })
  @ApiProperty({
    title: 'department',
    example: 'lima',
    required: false,
  })
  department: string;

  @Type(() => String)
  @IsOptional()
  @IsString({ message: Message.STRING('$property') })
  @ApiProperty({
    title: 'province',
    example: 'barranca',
    required: false,
  })
  province: string;

  @Type(() => String)
  @IsOptional()
  @IsString({ message: Message.STRING('$property') })
  @ApiProperty({
    title: 'district',
    example: 'supe',
    required: false,
  })
  district: string;
}

export class CityDtoId extends CityDto {
  @Type(() => Number)
  @IsNumber({}, { message: Message.NUMBER('$property') })
  @ApiProperty({
    title: 'id_city',
    example: '1',
    required: true,
  })
  id: number;
}
