import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { validate as isUUID } from 'uuid';

@Injectable()
export class PatientService {
  private readonly logger = new Logger(PatientService.name);

  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    try {
      const patient = this.patientRepository.create(createPatientDto);
      await this.patientRepository.save(patient);
      return patient;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error.code === '23505') {
        throw new BadRequestException('Patient already exists');
      }
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return this.patientRepository.find({});
  }

  async findOne(term: string): Promise<Patient> {
    let patient: Patient;
    try {
      if (isUUID(term)) {
        console.log('term', term);

        patient = await this.patientRepository.findOneBy({ id: term });
      } else {
        patient = await this.patientRepository.findOne({
          where: { name: term },
        });
      }
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new InternalServerErrorException();
    }
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
    return patient;
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
