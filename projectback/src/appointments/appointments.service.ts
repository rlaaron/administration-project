import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { PatientService } from '../patients/patient.service';



@Injectable()
export class AppointmentsService {
  private readonly logger = new Logger(AppointmentsService.name);

  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    private readonly PatientService: PatientService,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    try{
      const  { patient, ...appointmentData } = createAppointmentDto;
      console.log('patient:', patient);
      const appointment = this.appointmentRepository.create({
        ...appointmentData,
        patient: await this.PatientService.findOne(patient.id),
      });
      console.log('appointment:', appointment);
      
      await this.appointmentRepository.save(appointment);
      return appointment;
    }catch(error){
      this.logger.error(error.message, error.stack);
      if (error.code === '23505') {
        throw new BadRequestException('Appointment already exists');
      }
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try{
      const appointments = await this.appointmentRepository.find({
        relations: ['patient'],
      });
      return appointments.map((appointment) => {
        return appointment;
      });
    }catch(error){  
      this.logger.error(error.message, error.stack);
      throw new InternalServerErrorException();
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
