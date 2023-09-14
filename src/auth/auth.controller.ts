import { Controller, Post, Body, Request, UseGuards, Param, Patch } from '@nestjs/common';
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

//  @Patch('update-password/:id')
//   async updatePassword(
//     @Param() memberId: number, // Obtenez l'ID du membre à partir de la route.
//     @Body() updateAuthDto:UpdateAuthDto,
//   ): Promise<any> {
//      const { currentPassword, newPassword } = updateAuthDto;
//     // Appelez la méthode du service pour mettre à jour le mot de passe.
//     await this.authService.updatePassword(updateAuthDto, currentPassword, newPassword, memberId);

//     return { message: 'Mot de passe mis à jour avec succès.' };
//   }

@Patch('update')
@UseGuards(AuthGuard('jwt'))
update(@Request() req, @Body() updateDto:UpdateAuthDto ){
  const member = req.user
 
  return this.authService.update(member,updateDto)
}
}
  