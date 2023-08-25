import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserModule } from './user/user.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profiles/profile.module';
import { SERVER_CONFIG } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  console.log(new Date());

  // swagger
  const options = new DocumentBuilder()
    .setTitle('YOUAPP API')
    .setDescription('Simple YouApp RestAPI')
    .setVersion('1.0.0')
    .addTag('API')
    .build();
  const docs = SwaggerModule.createDocument(app, options, {
    include: [UserModule, AuthModule, ProfileModule],
  });
  SwaggerModule.setup('api', app, docs);

  await app.listen(SERVER_CONFIG.port);
  console.warn(`server running at port: ${SERVER_CONFIG.port}`);
}
bootstrap();
