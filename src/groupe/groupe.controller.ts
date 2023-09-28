import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Req,
  Put,
  Query,
} from '@nestjs/common';
import { GroupeService } from './groupe.service';
import { CreateGroupeDto } from './dto/create-groupe.dto';
import { UpdateGroupeDto } from './dto/update-groupe.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('groupe')
export class GroupeController {
  constructor(private readonly groupeService: GroupeService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Request() req, @Body() createGroupeDto: CreateGroupeDto) {
    try {
      const member = req.user;
      return this.groupeService.createAndAssign(createGroupeDto, member);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findAllUserForGroupe(@Request() req, @Param('id') id: number) {
    return this.groupeService.findAllUserForGroupe(id, req);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAllGroupeForUser(@Request() req) {
    const memberId = req.user.id;
    return this.groupeService.findAllGroupeForUser(memberId);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  putAnUserInGroupe(@Request() req, @Param('id') groupeId: number) {
    const member = req.user;
    return this.groupeService.putAnUserInGroupe(member, groupeId);
  }

  @Put('verifier/:id')
  putAnUserInGroupeWithQueryToken(
    @Query('token') token: string,
    @Param('id') groupeId: number,
  ) {
    return this.groupeService.putAnUserInGroupeWithToken(token, groupeId);
  }

  @Put(':id/update-name')
  @UseGuards(AuthGuard('jwt'))
  async updateGroupName(
    @Request() req,
    @Param('id') groupeId: number,
    @Body('newName') newName: string,
  ) {
    try {
      console.log('newname ' + newName);
      // Vous pouvez également ajouter une logique pour vérifier si l'utilisateur actuel a le droit de changer le nom du groupe
      return await this.groupeService.updateGroupName(groupeId, newName);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  removeAnUserInGroupe(@Request() req, @Param('id') id: string) {
    const member = req.user;
    return this.groupeService.removeAndUserInGroupe(+id, member);
  }
}
