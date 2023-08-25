import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from './interface/profile.interface';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('Profile') private readonly profileModel: Model<Profile>,
  ) {}

  // async createProfile(profileDto: CreateProfileDto) {}

  // async updateProfile(updateDto: UpdateProfileDto) {}
}
