import { ApiProperty } from '@nestjs/swagger';
import { ProductoDto } from './producto.dto';
import { RespuestaDto } from './respuesta.dto';

export class ProductosResponseDto {
  @ApiProperty({ type: RespuestaDto })
  Respuesta: RespuestaDto;

  @ApiProperty({ type: [ProductoDto] })
  Productos: ProductoDto[];
}
