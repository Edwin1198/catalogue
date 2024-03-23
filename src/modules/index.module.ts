import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CityModule } from './city/city.module';
import { VehicleModule } from './vehicle/vehicle.module';

@Module({
    imports: [
        UserModule,
        CityModule,
        VehicleModule
    ]
})
export class IndexModule { }
