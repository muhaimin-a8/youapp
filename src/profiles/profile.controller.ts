import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';
import { WebResponse } from '../common/response/web.response';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User Profile')
@UseGuards(AuthGuard('jwt'))
@Controller('api/users/profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @ApiOperation({})
  async createProfile(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createDto: CreateProfileDto,
  ) {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      createDto.userId = req.user.id;
      const data = await this.profileService.createProfile(createDto);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return WebResponse.sendResponseMessage({
        res: res,
        code: HttpStatus.CREATED,
        message: 'success to create new profile',
        data: this.toResponse(data),
      });
    } catch (e) {
      return WebResponse.sendErrorMessage(res, e);
    }
  }

  @Put()
  @ApiOperation({})
  async updateProfile(
    @Req() req: Request,
    @Res() res: Response,
    @Body() updateDto: UpdateProfileDto,
  ) {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      updateDto.userId = req.user.id;
      const data = await this.profileService.updateProfile(updateDto);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return WebResponse.sendResponseMessage({
        res: res,
        code: HttpStatus.OK,
        message: 'success to update new profile',
        data: this.toResponse(data),
      });
    } catch (e) {
      return WebResponse.sendErrorMessage(res, e);
    }
  }
  @Get()
  @ApiOperation({})
  async getProfile(@Req() req: Request, @Res() res: Response) {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const data = await this.profileService.getProfileByUserId(req.user.id);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return WebResponse.sendResponseMessage({
        res: res,
        code: HttpStatus.OK,
        data: this.toResponse(data),
      });
    } catch (e) {
      return WebResponse.sendErrorMessage(res, e);
    }
  }

  private toResponse(data) {
    return {
      userId: data.userId,
      profileImage: data.profileImage,
      displayName: data.displayName,
      gender: data.gender,
      birthday: data.birthday,
      heroscope: data.heroscope,
      zodiac: data.zodiac,
    };
  }
}
