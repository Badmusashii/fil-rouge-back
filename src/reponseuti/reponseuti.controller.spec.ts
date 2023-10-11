import { Test, TestingModule } from '@nestjs/testing';
import { ReponseutiController } from './reponseuti.controller';
import { ReponseutiService } from './reponseuti.service';

describe('ReponseutiController', () => {
  let controller: ReponseutiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReponseutiController],
      providers: [ReponseutiService],
    }).compile();

    controller = module.get<ReponseutiController>(ReponseutiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
