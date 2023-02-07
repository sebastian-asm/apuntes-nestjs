import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // se agrega el prefijo 'api' en todos los endpoints
  app.setGlobalPrefix('api')
  await app.listen(3000)
}
bootstrap()
