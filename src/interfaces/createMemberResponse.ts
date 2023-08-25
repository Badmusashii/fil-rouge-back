import { HttpStatus } from '@nestjs/common';

export interface CreateMemberResponse {
  status: HttpStatus;
  message: string;
}
