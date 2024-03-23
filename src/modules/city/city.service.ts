import { Logger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { Repository } from 'typeorm'
import { CityConfig, CityDto } from './resource';
import { CityEntity } from 'src/entity';

@Injectable()
export class CityService {
    constructor(
        @InjectRepository(CityEntity)
        private readonly repository: Repository<CityEntity>
    ) { }
    async findAll(query: PaginateQuery): Promise<Paginated<CityEntity>> {
        const queryBuilder = this.repository.createQueryBuilder('table');
        return paginate(query, queryBuilder, CityConfig)
    }
    async post(data: CityDto): Promise<CityDto | {}> {
        try {
            await this.repository
                .createQueryBuilder()
                .insert()
                .into(CityEntity)
                .values({ ...data })
                .execute()
            return data;
        } catch (error) {
            Logger.error(error.message, 'ERROR INSERT')
            return {}
        }
    }
    async put({ id, data }: { id: number, data: CityDto }): Promise<CityDto | {}> {
        try {
            const { affected } = await this.repository
                .createQueryBuilder()
                .update(CityEntity)
                .set({ ...data })
                .where("id = :id", { id })
                .execute();
            if (affected === 0) {
                Logger.warn('No se encontró la data con ese id')
            }
            return { ...data }
        } catch (error) {
            Logger.error(error.message, 'ERROR UPDATE')
            return {}
        }
    }

    async delete(id: number): Promise<{}> {
        try {
            const { affected } = await this.repository
                .createQueryBuilder()
                .delete()
                .from(CityEntity)
                .where("id = :id", { id })
                .execute();
            if (affected === 0) {
                Logger.warn('No se encontró la data con ese id')
            }
            return {}
        } catch (error) {
            Logger.error(error.message, 'ERROR DELETE')
            return {}
        }
    }
}
