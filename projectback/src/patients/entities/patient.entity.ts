import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "src/appointments/entities/appointment.entity";

@Entity()
export class Patient {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    name: string;

    @Column()
    gender: string;

    @Column()
    age: number;

    @OneToOne(
        () => Appointment,
        appointment => appointment.patient,
        { nullable: true}
    )
    appointment: Appointment;
}
