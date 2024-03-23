import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Message } from 'src/config/helper/message-validator.helper';

export class VehicleDto {

    @Type(() => String)
    @IsOptional()
    @IsString({ message: Message.STRING('$property') })
    @ApiProperty({
        title: 'n_bus',
        example: '12',
        required: false,
    })
    n_bus: string;

    @Type(() => String)
    @IsOptional()
    @IsString({ message: Message.STRING('$property') })
    @ApiProperty({
        title: 'license_plate',
        example: 'F5u-597',
        required: false,
    })
    license_plate: string;

    @Type(() => String)
    @IsOptional()
    @IsString({ message: Message.STRING('$property') })
    @ApiProperty({
        title: 'state',
        example: 'activo',
        required: false,
    })
    state: string;

    @Type(() => Number)
    @IsOptional()
    @IsNumber({}, { message: Message.NUMBER('$property') })
    @ApiProperty({
        title: 'seats_available',
        example: '30',
        required: false,
    })
    seats_available: number;
    
}

export class VehicleDtoId extends VehicleDto {

    @Type(() => Number)
    @IsNumber({}, { message: Message.NUMBER('$property') })
    @ApiProperty({
        title: 'id_vehicle',
        example: '1',
        required: true,
    })
    id: number;

}