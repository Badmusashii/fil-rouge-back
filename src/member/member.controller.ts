import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Delete,
  Req,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { UpdateMemberDto } from './dto/update-member.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  // @Patch(':id')
  // @UseGuards(AuthGuard('jwt'))
  // update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
  //   return this.memberService.update(
  //     +id,
  //     updateMemberDto.currentPassword,
  //     updateMemberDto,
  //   );
  // }
  @Patch()
  @UseGuards(AuthGuard('jwt'))
  update(@Req() req, @Body() updateMemberDto: UpdateMemberDto) {
    const memberId = req.user.id;
    // La const memberId sert à recuperer l'id utilisateur
    // qui se trouve dans le Token
    return this.memberService.update(
      memberId,
      updateMemberDto.currentPassword,
      updateMemberDto,
    );
  }
}
