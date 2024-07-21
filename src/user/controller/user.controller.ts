import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../service/user.service';
import { UserEntity } from '../repository/entity/user.entity';
import { RoleGuard } from '../../auth/guards/role.guard';
import { UserRole } from '../../shared/api-enums';
import { JwtOauthGuard } from '../../auth/guards/jwt-oauth.guard';


@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post('')
    async createClient(@Body() user: UserEntity) {
        return this.userService.create(user);
    }

    @Patch('update')
    @UseGuards(JwtOauthGuard, RoleGuard(UserRole.admin))
    async update(@Body() user: UserEntity) {
        return this.userService.update(user);
    }

    @Delete('delete')
    @UseGuards(JwtOauthGuard, RoleGuard(UserRole.admin))
    async delete(@Body() id: string) {
        return this.userService.delete(id);
    }

    @Get('find/:id')
    @UseGuards(JwtOauthGuard, RoleGuard(UserRole.admin))
    async findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @Get('all')
    @UseGuards(RoleGuard(UserRole.admin))
    async findAll() {
        return this.userService.findAll();
    }
}

