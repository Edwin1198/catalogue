import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("vehicle", { database: 'travel_db', schema: "public" })
export class VehicleEntity {

    @PrimaryGeneratedColumn({ type: 'numeric', name: 'id_vehicle' })
    id: number | null;

    @Column({ type: 'character varying', name: 'n_bus', length: 50 })
    n_bus: string | null;

    @Column({ type: 'character varying', name: 'license_plate', length: 50 })
    license_plate: string | null;

    @Column({ type: 'character varying', name: 'state', length: 50 })
    state: string | null;

    @Column("numeric", { name: 'seats_available' })
    seats_available: number | null;

}