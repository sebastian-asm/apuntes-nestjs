import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // se agrega el prefijo 'api' en todos los endpoints
  app.setGlobalPrefix('api')
  // validación del dto a nivel global de la app
  app.useGlobalPipes(
    new ValidationPipe({
      // solo deja la data del dto, cualquier otro dato es removido
      whitelist: true,
      // devuelve error cuando se reciben propiedades no definidas en el dto
      forbidNonWhitelisted: true,
      // transformar los datos recibidos según como se especifica en el dto
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  )
  await app.listen(3000)
}
bootstrap()
