import { PartialType } from '@nestjs/mapped-types';
import { CreateAnalyseDto } from './create-analyse.dto';

export class UpdateAnalyseDto extends PartialType(CreateAnalyseDto) {}
