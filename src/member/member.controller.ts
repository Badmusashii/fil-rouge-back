import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Delete,
  Request,
  Query,
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
  update(@Request() req, @Body() updateMemberDto: UpdateMemberDto) {
    const memberId = req.user.id;
    console.log('req.user: ', memberId);
    // La const memberId sert à recuperer l'id utilisateur
    // qui se trouve dans le Token
    return this.memberService.update(
      memberId,
      updateMemberDto.currentPassword,
      updateMemberDto,
    );
  }

  @Get('user')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Request() req) {
    const member = req.user;
    return this.memberService.findOne(member);
  }
  @Get('email')
  @UseGuards(AuthGuard('jwt'))
  findOneByEmail(@Query('email') email: string) {
    return this.memberService.findOneByEmail(email);
  }

  @Get()
  findAll() {
    return this.memberService.findAll();
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  remove(@Request() req): Promise<void> {
    const member = req.user;
    return this.memberService.remove(member);
  }
}
