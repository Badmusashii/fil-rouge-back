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
import { GetUser } from 'src/auth/get-member.decorator';

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
  update(@GetUser() member, @Body() updateMemberDto: UpdateMemberDto) {
    const memberId = member.id;
    console.log('req.user: ', member);
    // La const memberId sert à recuperer l'id utilisateur
    // qui se trouve dans le Token
    return this.memberService.update(
      memberId,
      updateMemberDto.currentPassword,
      updateMemberDto,
    );
  }

  @Get()
  findAll() {
    return this.memberService.findAll();
  }
}
