import { FilterOperator, FilterSuffix, PaginateConfig } from "nestjs-paginate"
import { VehicleEntity } from 'src/entity';

const dataBd = ['id', 'busNumber', 'licensePlate', 'state', 'seatsAvailable']

export const VehicleConfig: PaginateConfig<VehicleEntity> = {
    sortableColumns: ['id', 'busNumber', 'licensePlate', 'state', 'seatsAvailable'],
    nullSort: 'last',
    defaultSortBy: [['id', 'DESC']],
    searchableColumns: ['id', 'busNumber', 'licensePlate', 'state', 'seatsAvailable'],
    select: dataBd,
    filterableColumns: {
        id: [FilterOperator.EQ, FilterSuffix.NOT],
        busNumber: [FilterOperator.EQ, FilterSuffix.NOT],
        licensePlate: [FilterOperator.EQ, FilterSuffix.NOT],
        state: [FilterOperator.EQ, FilterSuffix.NOT],
        seatsAvailable: [FilterOperator.EQ, FilterSuffix.NOT]
    },
}
