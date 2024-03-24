import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('vehicle', { database: 'travel_db', schema: 'public' })
export class VehicleEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'numeric', name: 'id_vehicle' })
  id: number | null;

  @Column({ type: 'character varying', name: 'n_bus', length: 50 })
  busNumber: string | null;

  @Column({ type: 'character varying', name: 'license_plate', length: 50 })
  licensePlate: string | null;

  @Column({ type: 'character varying', name: 'state', length: 50 })
  state: string | null;

  @Column('numeric', { name: 'seats_available' })
  seatsAvailable: number | null;
}
