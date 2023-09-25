import { Test, TestingModule } from '@nestjs/testing';
import { ReviewVotesService } from './review_votes.service';

describe('ReviewVotesService', () => {
  let service: ReviewVotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewVotesService],
    }).compile();

    service = module.get<ReviewVotesService>(ReviewVotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
