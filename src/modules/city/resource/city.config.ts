import { FilterOperator, FilterSuffix, PaginateConfig } from 'nestjs-paginate';
import { CityEntity } from 'src/entity';

const dataBd = ['id', 'department', 'province', 'district'];

export const CityConfig: PaginateConfig<CityEntity> = {
  sortableColumns: ['id', 'department', 'province', 'district'],
  nullSort: 'last',
  defaultSortBy: [['id', 'DESC']],
  searchableColumns: ['id', 'department', 'province', 'district'],
  select: dataBd,
  filterableColumns: {
    id: [FilterOperator.EQ, FilterSuffix.NOT],
    department: [FilterOperator.EQ, FilterSuffix.NOT],
    province: [FilterOperator.EQ, FilterSuffix.NOT],
    district: [FilterOperator.EQ, FilterSuffix.NOT],
  },
};
