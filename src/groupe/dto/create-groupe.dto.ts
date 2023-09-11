import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateGroupeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
}
