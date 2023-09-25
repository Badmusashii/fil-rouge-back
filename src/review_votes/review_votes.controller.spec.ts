import { Test, TestingModule } from '@nestjs/testing';
import { ReviewVotesController } from './review_votes.controller';
import { ReviewVotesService } from './review_votes.service';

describe('ReviewVotesController', () => {
  let controller: ReviewVotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewVotesController],
      providers: [ReviewVotesService],
    }).compile();

    controller = module.get<ReviewVotesController>(ReviewVotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
