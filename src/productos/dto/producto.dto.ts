import { ApiProperty } from '@nestjs/swagger';
import { ValorRecargaDto } from './valor-recarga.dto';

export class ProductoDto {
  @ApiProperty({ example: 'uuid' })
  IDProducto: string;

  @ApiProperty({ example: '1008' })
  Servicio: string;

  @ApiProperty({ example: '012' })
  Proveedor: string;

  @ApiProperty({ example: '0010121008' })
  Producto: string;

  @ApiProperty({ example: 'CNT - RC - (01104)' })
  Nombre: string;

  @ApiProperty({ type: [ValorRecargaDto] })
  ValoresRecarga: ValorRecargaDto[];

  @ApiProperty({ example: 'SI' })
  ReversoEnLinea: string;

  @ApiProperty({ example: 'T' })
  TipoPago: string;

  @ApiProperty({ example: 'RECARGAS' })
  NombreGrupo: string;
}
