import { Test, TestingModule } from '@nestjs/testing';
import { ReponseutiService } from './reponseuti.service';

describe('ReponseutiService', () => {
  let service: ReponseutiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReponseutiService],
    }).compile();

    service = module.get<ReponseutiService>(ReponseutiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
