import { Logger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { VehicleConfig, VehicleDto } from './resource';
import { VehicleEntity } from 'src/entity';
import { CRUDOLogger } from 'src/config/helper/message-res.helper';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(VehicleEntity)
    private readonly repository: Repository<VehicleEntity>,
  ) {}
  async findAll(query: PaginateQuery): Promise<Paginated<VehicleEntity>> {
    const queryBuilder = this.repository.createQueryBuilder('table');
    return paginate(query, queryBuilder, VehicleConfig);
  }
  async post(data: VehicleDto): Promise<VehicleDto | any> {
    try {
      await this.repository
        .createQueryBuilder()
        .insert()
        .into(VehicleEntity)
        .values({ ...data })
        .execute();
      return data;
    } catch (error) {
      Logger.error(error.message, CRUDOLogger.titlePost);
      return {};
    }
  }
  async put({
    id,
    data,
  }: {
    id: number;
    data: VehicleDto;
  }): Promise<VehicleDto | any> {
    try {
      const { affected } = await this.repository
        .createQueryBuilder()
        .update(VehicleEntity)
        .set({ ...data })
        .where('id = :id', { id })
        .execute();
      if (affected === 0) {
        Logger.warn(CRUDOLogger.descripcionId, CRUDOLogger.titlePut);
      }
      return { ...data };
    } catch (error) {
      Logger.error(error.message, CRUDOLogger.titlePut);
      return {};
    }
  }

  async delete(id: number): Promise<any> {
    try {
      const { affected } = await this.repository
        .createQueryBuilder()
        .delete()
        .from(VehicleEntity)
        .where('id = :id', { id })
        .execute();
      if (affected === 0) {
        Logger.warn(CRUDOLogger.descripcionId, CRUDOLogger.titleDelete);
      }
      return {};
    } catch (error) {
      Logger.error(error.message, CRUDOLogger.titleDelete);
      return {};
    }
  }

  async vehicleView(id: number): Promise<any> {
    try {
      const queryBuilder = await this.repository
        .createQueryBuilder()
        .where('id_vehicle = :id', { id })
        .getMany();
      return queryBuilder;
    } catch (error) {
      Logger.error(error.message, CRUDOLogger.titleDelete);
      return {};
    }
  }
}
