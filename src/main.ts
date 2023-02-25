import { NestFactory } from '@nestjs/core';
import { UserModule } from 'Users/application/UserModule';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  await app.listen(3000);
  console.log('Runing on port ==> ', 3000);
}
bootstrap();
