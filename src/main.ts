import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://krhipita:qhSzLh65EFm3WRxUf_1PO2FrAoDR1YcL@toad.rmq.cloudamqp.com/krhipita'],
      queue: 'main_queue',
      queueOptions: {
        durable: false
      },
    }
  })

  const options = new DocumentBuilder()
    .setTitle('Radar de estudiantes')
    .setDescription('Se encuentran las rutas usadas para el radar sofka u')
    .setVersion('1.0')
    .addTag('Sofka U')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/doc', app, document);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
