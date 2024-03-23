import { Logger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { Repository } from 'typeorm'
import { VehicleConfig, VehicleDto } from './resource';
import { VehicleEntity } from 'src/entity';

@Injectable()
export class VehicleService {
    constructor(
        @InjectRepository(VehicleEntity)
        private readonly repository: Repository<VehicleEntity>
    ) { }
    async findAll(query: PaginateQuery): Promise<Paginated<VehicleEntity>> {
        const queryBuilder = this.repository.createQueryBuilder('table');
        return paginate(query, queryBuilder, VehicleConfig)
    }
    async post(data: VehicleDto): Promise<VehicleDto | {}> {
        try {
            await this.repository
                .createQueryBuilder()
                .insert()
                .into(VehicleEntity)
                .values({ ...data })
                .execute()
            return data;
        } catch (error) {
            Logger.error(error.message, 'ERROR INSERT USER')
            return {}
        }
    }
    async put({ id, data }: { id: number, data: VehicleDto }): Promise<VehicleDto | {}> {
        try {
            const { affected } = await this.repository
                .createQueryBuilder()
                .update(VehicleEntity)
                .set({ ...data })
                .where("id = :id", { id })
                .execute();
            if (affected === 0) {
                Logger.warn('No se encontró la data con ese id')
            }
            return { ...data }
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
                .from(VehicleEntity)
                .where("id = :id", { id })
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
