import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user", { database: 'travel_db', schema: "public" })
export class UserEntity {

    @PrimaryGeneratedColumn({ type: 'numeric', name: 'id_user' })
    id: number | null;

    @Column({ type: 'character varying', name: 'name', length: 100 })
    name: string | null;

    @Column("numeric", { name: 'phone' })
    phone: number | null;

    @Column({ type: 'character varying', name: 'email', length: 100 })
    email: string | null;

    @Column({ type: 'character varying', name: 'n_document', length: 100 })
    n_document: string | null;

    @Column({ type: 'character varying', name: 'gender', length: 1 })
    gender: string | null;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'birthdate' })
    birthdate: Date | null;

}