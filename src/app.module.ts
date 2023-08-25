import { Module } from '@nestjs/common';
import 'dotenv/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as process from 'process';
import { UserModule } from './user/user.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), UserModule],
})
export class AppModule {}
