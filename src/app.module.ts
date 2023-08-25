import { Module } from '@nestjs/common';
import 'dotenv/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profiles/profile.module';
import { MONGO_CONFIG } from './config';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_CONFIG.uri),
    UserModule,
    AuthModule,
    ProfileModule,
  ],
})
export class AppModule {}
