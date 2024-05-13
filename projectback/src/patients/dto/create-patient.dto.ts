import { IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";
import { Appointment } from "../../appointments/entities/appointment.entity";

export class CreatePatientDto {
    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    gender: string;

    @IsNumber()
    @IsPositive()
    age: number;

    @IsOptional()
    appointment: Appointment;
}

