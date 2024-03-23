import { FilterOperator, FilterSuffix, PaginateConfig } from "nestjs-paginate"
import { UserEntity } from 'src/entity';

const dataBd = ['id', 'name', 'phone', 'email', 'documentNumber', 'gender', 'birthdate']

export const UserConfig: PaginateConfig<UserEntity> = {
    sortableColumns: ['id', 'name', 'phone', 'email', 'documentNumber', 'gender', 'birthdate'],
    nullSort: 'last',
    defaultSortBy: [['id', 'DESC']],
    searchableColumns: ['id', 'name', 'phone', 'email', 'documentNumber', 'gender', 'birthdate'],
    select: dataBd,
    filterableColumns: {
        id: [FilterOperator.EQ, FilterSuffix.NOT],
        name: [FilterOperator.EQ, FilterSuffix.NOT],
        phone: [FilterOperator.EQ, FilterSuffix.NOT],
        email: [FilterOperator.EQ, FilterSuffix.NOT],
        documentNumber: [FilterOperator.EQ, FilterSuffix.NOT],
        gender: [FilterOperator.EQ, FilterSuffix.NOT],
        birthdate: [FilterOperator.EQ, FilterSuffix.NOT]
    },
}
  