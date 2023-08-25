import { Module } from '@nestjs/common';
import 'dotenv/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as process from 'process';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profiles/profile.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    UserModule,
    AuthModule,
    ProfileModule,
  ],
})
export class AppModule {}
