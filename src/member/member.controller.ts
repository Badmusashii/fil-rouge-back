import {
  Controller,
  // Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  // Delete,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { LoginDto } from './dto/login-member.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-member.decorator';
import { Member } from './entities/member.entity';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  // @Post('create')
  // async create(@Body() createMemberDto: CreateMemberDto) {
  //   return this.memberService.create(createMemberDto);
  // }
  // @Post('login')
  // async login(@Body() loginDto: LoginDto) {
  //   return this.memberService.login(loginDto.username, loginDto.password);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
  //   return this.memberService.update(+id, updateMemberDto);
  // }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.memberService.update(
      +id,
      updateMemberDto.currentPassword,
      updateMemberDto,
    );
  }
}
