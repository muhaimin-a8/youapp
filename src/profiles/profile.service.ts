import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from './interface/profile.interface';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';
import { InvariantError } from '../common/exceptions/invariant.error';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('Profile') private readonly profileModel: Model<Profile>,
  ) {}

  async createProfile(createDto: CreateProfileDto) {
    await this.isProfileNotExistsByUserId(createDto.userId);

    const profile = new this.profileModel(createDto);
    profile.zodiac = await this.getZodiacByBirthday(profile.birthday);
    profile.heroscope = await this.getHeroscopeByBirthday(profile.birthday);

    await profile.save();
    return profile;
  }

  async updateProfile(updateDto: UpdateProfileDto) {
    const profile = await this.getProfileByUserId(updateDto.userId);

    const newProfile = new this.profileModel(profile);
    newProfile.zodiac = await this.getZodiacByBirthday(newProfile.birthday);
    newProfile.heroscope = await this.getHeroscopeByBirthday(
      newProfile.birthday,
    );

    await newProfile.save();
    return newProfile;
  }

  async getProfileByUserId(userId: string) {
    const profile = this.profileModel.findOne({ userId: userId });
    if (!profile) {
      throw new InvariantError(
        'cannot find profile, please use create request',
      );
    }

    return profile;
  }

  // PRIVATE METHOD
  private async isProfileNotExistsByUserId(userId: string) {
    const profile = await this.profileModel.findOne({ userId: userId });
    if (profile) {
      throw new InvariantError(
        'profile already exists, please use update request',
      );
    }
  }

  private async getZodiacByBirthday(date: Date): Promise<string> {
    return (await this.findZodiacAndHeroscopeByBirthday(date)).zodiac;
  }

  private async getHeroscopeByBirthday(date: Date): Promise<string> {
    return (await this.findZodiacAndHeroscopeByBirthday(date)).heroscope;
  }

  private async findZodiacAndHeroscopeByBirthday(date: Date) {
    return this.zodiacAndHeroscope.find((i) => {
      return (
        i.start.date >= 19 &&
        i.start.month >= date.getMonth() &&
        i.end.date <= date.getDate() &&
        i.end.month <= date.getMonth()
      );
    });
  }

  private zodiacAndHeroscope = [
    {
      zodiac: 'Aries',
      heroscope: 'Ram',
      start: {
        date: 21,
        month: 3,
      },
      end: {
        date: 19,
        month: 4,
      },
    },
    {
      zodiac: 'Taurus',
      heroscope: 'Bull',
      start: {
        date: 20,
        month: 4,
      },
      end: {
        date: 20,
        month: 5,
      },
    },
    {
      zodiac: 'Gemini',
      heroscope: 'Twins',
      start: {
        date: 21,
        month: 5,
      },
      end: {
        date: 21,
        month: 6,
      },
    },
    {
      zodiac: 'Cancer',
      heroscope: 'Crab',
      start: {
        date: 22,
        month: 6,
      },
      end: {
        date: 22,
        month: 7,
      },
    },
    {
      zodiac: 'Leo',
      heroscope: 'Lion',
      start: {
        date: 23,
        month: 7,
      },
      end: {
        date: 22,
        month: 8,
      },
    },
    {
      zodiac: 'Virgo',
      heroscope: 'Virgin',
      start: {
        date: 23,
        month: 8,
      },
      end: {
        date: 22,
        month: 9,
      },
    },
    {
      zodiac: 'Libra',
      heroscope: 'Balance',
      start: {
        date: 23,
        month: 9,
      },
      end: {
        date: 23,
        month: 10,
      },
    },
    {
      zodiac: 'Scorpius',
      heroscope: 'Scorpion',
      start: {
        date: 24,
        month: 10,
      },
      end: {
        date: 21,
        month: 11,
      },
    },
    {
      zodiac: 'Sagittarius',
      heroscope: 'Archer',
      start: {
        date: 22,
        month: 11,
      },
      end: {
        date: 21,
        month: 12,
      },
    },
    {
      zodiac: 'Capricornus',
      heroscope: 'Goat',
      start: {
        date: 22,
        month: 12,
      },
      end: {
        date: 19,
        month: 1,
      },
    },
    {
      zodiac: 'Aquarius',
      heroscope: 'Water Bearer',
      start: {
        date: 20,
        month: 1,
      },
      end: {
        date: 18,
        month: 2,
      },
    },
    {
      zodiac: 'Pisces',
      heroscope: 'Fish',
      start: {
        date: 19,
        month: 2,
      },
      end: {
        date: 20,
        month: 3,
      },
    },
  ];
}
