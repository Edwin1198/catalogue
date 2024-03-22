import { Logger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { Repository } from 'typeorm'
import { UserConfig, UserDto } from './resource';
import { UserEntity } from 'src/entity';
import * as moment from 'moment-timezone';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>
    ) { }
    async findAll(query: PaginateQuery): Promise<Paginated<UserEntity>> {
        const queryBuilder = this.repository.createQueryBuilder('table');
        return paginate(query, queryBuilder, UserConfig)
    }
    async post(data: UserDto): Promise<UserDto | {}> {
        try {
            await this.repository
                .createQueryBuilder()
                .insert()
                .into(UserEntity)
                .values({ ...data, birthdate: moment.utc(data.birthdate).format('YYYY-MM-DD HH:mm:ss') })
                .execute()
            return data;
        } catch (error) {
            Logger.error(error.message, 'ERROR INSERT USER')
            return {}
        }
    }
    async put({ id, data }: { id: number, data: UserDto }): Promise<UserDto | {}> {
        try {
            const { affected } = await this.repository
                .createQueryBuilder()
                .update(UserEntity)
                .set({ ...data, birthdate: moment.utc(data.birthdate).format('YYYY-MM-DD HH:mm:ss') })
                .where("id = :id", { id })
                .execute();
            if (affected === 0) {
                Logger.warn('No se encontró la data con ese id')
            }
            return { ...data, birthdate: moment.utc(data.birthdate).format('YYYY-MM-DD HH:mm:ss') }
        } catch (error) {
            Logger.error(error.message, 'ERROR UPDATE USER')
            return {}
        }
    }

    async delete(id: number): Promise<{}> {
        try {
            const { affected } = await this.repository
                .createQueryBuilder()
                .delete()
                .from(UserEntity)
                .where("id_user = :id", { id })
                .execute();
            if (affected === 0) {
                Logger.warn('No se encontró la data con ese id')
            }
            return {}
        } catch (error) {
            Logger.error(error.message, 'ERROR DELETE USER')
            return {}
        }
    }
}
