import { Patient } from "@/app/pacientes/crear-paciente/interfaces/Patient";

export interface Appointment {
    date: string;
    time: string;
    patient: Patient
}