import { Module } from '@nestjs/common';
import { MemberGroupService } from './member-group.service';
import { MemberGroupController } from './member-group.controller';

@Module({
  controllers: [MemberGroupController],
  providers: [MemberGroupService],
})
export class MemberGroupModule {}
