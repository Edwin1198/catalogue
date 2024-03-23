import { FilterOperator, FilterSuffix, PaginateConfig } from "nestjs-paginate"
import { VehicleEntity } from 'src/entity';

const dataBd = ['id', 'n_bus', 'license_plate', 'state', 'seats_available']

export const VehicleConfig: PaginateConfig<VehicleEntity> = {
    sortableColumns: ['id', 'n_bus', 'license_plate', 'state', 'seats_available'],
    nullSort: 'last',
    defaultSortBy: [['id', 'DESC']],
    searchableColumns: ['id', 'n_bus', 'license_plate', 'state', 'seats_available'],
    select: dataBd,
    filterableColumns: {
        id: [FilterOperator.EQ, FilterSuffix.NOT],
        n_bus: [FilterOperator.EQ, FilterSuffix.NOT],
        license_plate: [FilterOperator.EQ, FilterSuffix.NOT],
        state: [FilterOperator.EQ, FilterSuffix.NOT],
        seats_available: [FilterOperator.EQ, FilterSuffix.NOT]
    },
}
