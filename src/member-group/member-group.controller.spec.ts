import { Test, TestingModule } from '@nestjs/testing';
import { MemberGroupController } from './member-group.controller';
import { MemberGroupService } from './member-group.service';

describe('MemberGroupController', () => {
  let controller: MemberGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberGroupController],
      providers: [MemberGroupService],
    }).compile();

    controller = module.get<MemberGroupController>(MemberGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
