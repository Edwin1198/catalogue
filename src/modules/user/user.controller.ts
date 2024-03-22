import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiOkPaginatedResponse, ApiPaginationQuery, FilterOperator, Paginate, PaginateQuery, Paginated, PaginatedSwaggerDocs } from 'nestjs-paginate';
import { UserDto, UserDtoId } from './resource/user.dto';
import { userConfig } from './resource/user.config';
import { UsertEntity } from 'src/entity';
import { CRUDOBody, CRUDOParam, CRUDOResponse, CRUDOperation } from 'src/config/helper/message-res.helper';

@ApiCreatedResponse()
@ApiTags('USUARIO')
@Controller('user')
export class UserController {
    constructor(private readonly service: UserService) { }
    @ApiOperation({ summary: 'Paginación de todos los registros' })
    @ApiOkPaginatedResponse(UserDtoId, userConfig)
    @ApiPaginationQuery(userConfig)
    @PaginatedSwaggerDocs(UserDtoId, userConfig)
    @Get()
    async finAll(@Paginate() query: PaginateQuery): Promise<Paginated<UsertEntity>> {
        return await this.service.findAll(query);
    }
    @ApiOperation({ summary: CRUDOperation.post })
    @ApiBody({
        type: UserDto,
        description: CRUDOBody.postDescription,
    })
    @ApiResponse({
        status: CRUDOResponse.postStatus,
        description: CRUDOResponse.postDescription,
        type: UserDto,
    })
    @Post()
    async post(@Body() data: UserDto) {
        return this.service.post(data);
    }
    @ApiOperation({ summary: CRUDOperation.put })
    @ApiParam({
        name: CRUDOParam.putName,
        example: 1,
        type: Number
    })
    @ApiBody({
        type: UserDto,
        description: CRUDOBody.putDescription,
    })
    @ApiResponse({
        status: CRUDOResponse.putStatus,
        description: CRUDOResponse.putDescription,
        type: UserDto,
    })
    @Put(':id')
    async put(@Param('id', ParseIntPipe) id: number, @Body() data: UserDto) {
        return this.service.put({ id, data });
    }
    @ApiOperation({ summary: CRUDOperation.delete })
    @ApiParam({
        name: CRUDOParam.deleteName,
        example: 1,
        type: Number
    })
    @ApiResponse({
        status: CRUDOResponse.deleteStatus,
        description: CRUDOResponse.deleteDescription,
        type: Object
    })
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.service.delete(id);
    }
}
