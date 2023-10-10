import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Param,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }
  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }

  @Patch('update')
  @UseGuards(AuthGuard('jwt'))
  update(@Request() req, @Body() updateDto: UpdateAuthDto) {
    const utilisateur = req.user;
    console.log(utilisateur);
    return this.authService.update(utilisateur, updateDto);
  }
}
