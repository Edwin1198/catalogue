import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ApiOkPaginatedResponse,
  ApiPaginationQuery,
  Paginate,
  PaginateQuery,
  Paginated,
  PaginatedSwaggerDocs,
} from 'nestjs-paginate';
import { VehicleDto, VehicleDtoId, VehicleConfig } from './resource';
import { VehicleEntity } from 'src/entity';
import {
  CRUDOBody,
  CRUDOParam,
  CRUDOResponse,
  CRUDOperation,
} from 'src/config/helper/message-res.helper';
import { MessagePattern } from '@nestjs/microservices';

@ApiCreatedResponse()
@ApiTags('VEHICULO')
@Controller('vehicle')
export class VehicleController {
  constructor(private readonly service: VehicleService) {}
  @ApiOperation({ summary: 'Paginación de todos los registros' })
  @ApiOkPaginatedResponse(VehicleDtoId, VehicleConfig)
  @ApiPaginationQuery(VehicleConfig)
  @PaginatedSwaggerDocs(VehicleDtoId, VehicleConfig)
  @Get()
  async finAll(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<VehicleEntity>> {
    return await this.service.findAll(query);
  }
  @ApiOperation({ summary: CRUDOperation.post })
  @ApiBody({
    type: VehicleDto,
    description: CRUDOBody.postDescription,
  })
  @ApiResponse({
    status: CRUDOResponse.postStatus,
    description: CRUDOResponse.postDescription,
    type: VehicleDto,
  })
  @Post()
  async post(@Body() data: VehicleDto): Promise<VehicleDto | any> {
    return this.service.post(data);
  }
  @ApiOperation({ summary: CRUDOperation.put })
  @ApiParam({
    name: CRUDOParam.putName,
    example: 1,
    type: Number,
  })
  @ApiBody({
    type: VehicleDto,
    description: CRUDOBody.putDescription,
  })
  @ApiResponse({
    status: CRUDOResponse.putStatus,
    description: CRUDOResponse.putDescription,
    type: VehicleDto,
  })
  @Put(':id')
  async put(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: VehicleDto,
  ): Promise<VehicleDto | any> {
    return this.service.put({ id, data });
  }
  @ApiOperation({ summary: CRUDOperation.delete })
  @ApiParam({
    name: CRUDOParam.deleteName,
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: CRUDOResponse.deleteStatus,
    description: CRUDOResponse.deleteDescription,
    type: Object,
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.service.delete(id);
  }

  @MessagePattern({ cmd: 'vehicleView' })
  async vehicleView(id: number): Promise<VehicleDtoId | any> {
    return this.service.vehicleView(id);
  }
}
