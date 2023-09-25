import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewVoteDto } from './create-review_vote.dto';

export class UpdateReviewVoteDto extends PartialType(CreateReviewVoteDto) {}
