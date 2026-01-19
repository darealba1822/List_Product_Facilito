import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ProductosModule } from './productos/productos.module';

@Module({
  imports: [DatabaseModule, ProductosModule],
})
export class AppModule {}
