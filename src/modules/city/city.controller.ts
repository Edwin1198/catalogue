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
import { CityEntity } from 'src/entity';
import {
  CRUDOBody,
  CRUDOParam,
  CRUDOResponse,
  CRUDOperation,
} from 'src/config/helper/message-res.helper';
import { CityService } from './city.service';
import { CityDto, CityDtoId, CityConfig } from './resource';

@ApiCreatedResponse()
@ApiTags('CIUDAD')
@Controller('city')
export class CityController {
  constructor(private readonly service: CityService) {}
  @ApiOperation({ summary: 'Paginación de todos los registros' })
  @ApiOkPaginatedResponse(CityDtoId, CityConfig)
  @ApiPaginationQuery(CityConfig)
  @PaginatedSwaggerDocs(CityDtoId, CityConfig)
  @Get()
  async finAll(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<CityEntity>> {
    return await this.service.findAll(query);
  }
  @ApiOperation({ summary: CRUDOperation.post })
  @ApiBody({
    type: CityDto,
    description: CRUDOBody.postDescription,
  })
  @ApiResponse({
    status: CRUDOResponse.postStatus,
    description: CRUDOResponse.postDescription,
    type: CityDto,
  })
  @Post()
  async post(@Body() data: CityDto): Promise<CityDto | any> {
    return this.service.post(data);
  }
  @ApiOperation({ summary: CRUDOperation.put })
  @ApiParam({
    name: CRUDOParam.putName,
    example: 1,
    type: Number,
  })
  @ApiBody({
    type: CityDto,
    description: CRUDOBody.putDescription,
  })
  @ApiResponse({
    status: CRUDOResponse.putStatus,
    description: CRUDOResponse.putDescription,
    type: CityDto,
  })
  @Put(':id')
  async put(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CityDto,
  ): Promise<CityDto | any> {
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
}
