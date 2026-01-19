import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}
