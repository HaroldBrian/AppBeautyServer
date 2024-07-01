/* eslint-disable prettier/prettier */
import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SessionBuilder } from '@ngrok/ngrok';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Beautify API Documentation')
    .setDescription('Beautify is a web an mobile app for hairdressers')
    .setVersion('1.0')
    .addTag('Get rid of unecessary stress and dependencies')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);

  // Setup ngrok ingress
  const session = await new SessionBuilder().authtokenFromEnv().connect();
  const listener = await session.httpEndpoint().listen();
  new Logger('main').log(`Ingress established at ${listener.url()}`);
  listener.forward(`localhost:${port}`);
}
bootstrap();
