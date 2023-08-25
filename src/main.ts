import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserModule } from './user/user.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // swagger
  const options = new DocumentBuilder()
    .setTitle('YOUAPP API')
    .setDescription('Simple YouApp RestAPI')
    .setVersion('1.0.0')
    .addTag('API')
    .build();
  const docs = SwaggerModule.createDocument(app, options, {
    include: [UserModule],
  });
  SwaggerModule.setup('api', app, docs);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.warn(`server running at port: ${port}`);
}
bootstrap();
