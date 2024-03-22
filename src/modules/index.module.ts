import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CityModule } from './city/city.module';

@Module({
    imports: [
        UserModule,
        CityModule
    ]
})
export class IndexModule { }
