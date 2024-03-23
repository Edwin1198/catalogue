import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiOkPaginatedResponse, ApiPaginationQuery, Paginate, PaginateQuery, Paginated, PaginatedSwaggerDocs } from 'nestjs-paginate';
import { UserDto, UserDtoId, UserConfig } from './resource';
import { UserEntity } from 'src/entity';
import { CRUDOBody, CRUDOParam, CRUDOResponse, CRUDOperation } from 'src/config/helper/message-res.helper';
import { MessagePattern } from '@nestjs/microservices';

@ApiCreatedResponse()
@ApiTags('USUARIO')
@Controller('user')
export class UserController {
    constructor(private readonly service: UserService) { }
    @ApiOperation({ summary: 'Paginación de todos los registros' })
    @ApiOkPaginatedResponse(UserDtoId, UserConfig)
    @ApiPaginationQuery(UserConfig)
    @PaginatedSwaggerDocs(UserDtoId, UserConfig)
    @Get()
    async finAll(@Paginate() query: PaginateQuery): Promise<Paginated<UserEntity>> {
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
    async post(@Body() data: UserDto): Promise<UserDto | {}> {
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
    async put(@Param('id', ParseIntPipe) id: number, @Body() data: UserDto): Promise<UserDto | {}> {
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
    async delete(@Param('id', ParseIntPipe) id: number): Promise<{}> {
        return this.service.delete(id);
    }

    @MessagePattern({ cmd: 'usercreation' })
    async usercreation(data: UserDto): Promise<UserDto | {}> {
        return this.service.post(data);
    }
}
