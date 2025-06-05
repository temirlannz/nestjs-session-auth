import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import IORedis from 'ioredis';
import { ValidationPipe } from '@nestjs/common';
import { RedisStore } from 'connect-redis';
import * as session from 'express-session';
import { parseBoolean } from './libs/utils/parse-boolean.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const redis = new IORedis(config.getOrThrow<string>('REDIS_URI'));
  const port = config.getOrThrow<number>('APP_PORT');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors({
    credentials: true,
    exposedHeaders: ['Set-Cookie'],
    origin: config.getOrThrow<string>('ALLOWED_ORIGIN').split(', '),
    allowedHeaders: ['Content-Type', 'Origin', 'Accept', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  });

  app.use(
    session({
      secret: config.getOrThrow<string>('SESSION_SECRET'),
      name: config.getOrThrow<string>('SESSION_NAME'),
      resave: true,
      saveUninitialized: false,
      cookie: {
        domain: config.getOrThrow<string>('SESSION_DOMAIN'),
        maxAge: Number(config.getOrThrow<string>('SESSION_MAX_AGE')),
        httpOnly: parseBoolean(config.getOrThrow<string>('SESSION_HTTP_ONLY')),
        secure: parseBoolean(config.getOrThrow<string>('SESSION_SECURE')),
        sameSite: config.getOrThrow<string>('SESSION_SAME_SITE') as
          | 'lax'
          | 'strict'
          | 'none',
      },
      store: new RedisStore({
        client: redis,
        prefix: config.getOrThrow<string>('SESSION_FOLDER'),
      }),
    }),
  );

  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
