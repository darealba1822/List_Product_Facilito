import { ApiProperty } from '@nestjs/swagger';

export class ValorRecargaDto {
  @ApiProperty({ example: '1.00' })
  Valor: string;

  @ApiProperty({ example: '51 canales TV + 3 GB APP, vigencia 3 días', required: false })
  Detalle?: string;
}
