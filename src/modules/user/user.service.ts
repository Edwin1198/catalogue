import { Logger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { Repository } from 'typeorm'
import { userConfig } from './resource/user.config';
import { UsertEntity } from 'src/entity';
import { UserDto } from './resource/user.dto';
import * as moment from 'moment-timezone';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UsertEntity)
        private readonly repository: Repository<UsertEntity>
    ) { }
    async findAll(query: PaginateQuery): Promise<Paginated<UsertEntity>> {
        const queryBuilder = this.repository.createQueryBuilder('table');
        return paginate(query, queryBuilder, userConfig)
    }
    async post(data: UserDto) {
        try {
            await this.repository
                .createQueryBuilder()
                .insert()
                .into(UsertEntity)
                .values({ ...data, birthdate: moment.utc(data.birthdate).format('YYYY-MM-DD HH:mm:ss') })
                .execute()
            return { data };
        } catch (error) {
            Logger.error(error.message, 'ERROR INSERT USER')
            return {}
        }
    }
    async put({ id, data }: { id: number, data: UserDto }) {
        try {
            const { affected } = await this.repository
                .createQueryBuilder()
                .update(UsertEntity)
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

    async delete(id: number) {
        try {
            const { affected } = await this.repository
                .createQueryBuilder()
                .delete()
                .from(UsertEntity)
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
