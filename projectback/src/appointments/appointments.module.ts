import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { PatientService } from 'src/patients/patient.service';
import { Patient } from 'src/patients/entities/patient.entity';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService, PatientService],
  imports: [
    TypeOrmModule.forFeature([Appointment, Patient])
  ],
  exports: [
    AppointmentsService,
    TypeOrmModule,
  ]

})
export class AppointmentsModule {}
