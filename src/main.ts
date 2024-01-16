import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  const origin = configService.get('origin');

  app.enableCors({
    allowedHeaders: '*',
    origin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  await app.listen(port);
}
bootstrap();
