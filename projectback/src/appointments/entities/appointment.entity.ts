import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Patient } from "../../patients/entities/patient.entity";

@Entity()
export class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: number;
    
    @Column()
    date: string;

    @Column()
    time: string;

    @OneToOne(
        () => Patient,
        patient => patient.appointment,
        { nullable: true},
    )
    @JoinColumn({ name: 'patient_id'})
    patient: Patient;
}
