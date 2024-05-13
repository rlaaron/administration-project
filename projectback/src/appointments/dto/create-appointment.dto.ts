import { IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";
import { Patient } from "src/patients/entities/patient.entity";

export class CreateAppointmentDto {
    @IsString()
    @MinLength(3)
    date: string;

    @IsString()
    time: string;

    @IsOptional()
    patient: Patient;
}
