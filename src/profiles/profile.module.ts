import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileSchema } from './schema/profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Profile', schema: ProfileSchema }]),
  ],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
