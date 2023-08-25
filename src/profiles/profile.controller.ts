import { Controller } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('api/users/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // @Post()
  // async createProfile(@Body() createDto: CreateProfileDto) {}
}
