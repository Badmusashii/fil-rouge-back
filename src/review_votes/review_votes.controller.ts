import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ReviewVotesService } from './review_votes.service';
import { CreateReviewVoteDto } from './dto/create-review_vote.dto';
import { UpdateReviewVoteDto } from './dto/update-review_vote.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('review-votes')
export class ReviewVotesController {
  constructor(private readonly reviewVotesService: ReviewVotesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  addVote(@Request() req, @Body() createReviewVoteDto: CreateReviewVoteDto) {
    return this.reviewVotesService.createVote(req.user, createReviewVoteDto);
  }

  @Get()
  findAll() {
    return this.reviewVotesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewVotesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReviewVoteDto: UpdateReviewVoteDto,
  ) {
    return this.reviewVotesService.update(+id, updateReviewVoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewVotesService.remove(+id);
  }
}
