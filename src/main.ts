import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .addCookieAuth('access_token', {
      type: 'http',
      in: 'Header',
      scheme: 'Bearer',
      name: 'access_token',
    })
    .setTitle('Freelande API')
    .setDescription('API FreelandeKS')
    .setVersion('1.0')
    .build();

  const document = await SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  await app.listen(3001);
}
bootstrap();
