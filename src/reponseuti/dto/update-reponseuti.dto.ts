import { PartialType } from '@nestjs/mapped-types';
import { CreateReponseutiDto } from './create-reponseuti.dto';

export class UpdateReponseutiDto extends PartialType(CreateReponseutiDto) {}
