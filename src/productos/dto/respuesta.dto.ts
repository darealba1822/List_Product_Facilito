import { ApiProperty } from '@nestjs/swagger';

export class RespuestaDto {
  @ApiProperty({ example: '000' })
  codigo: string;

  @ApiProperty({ example: 'CONSULTA OK' })
  mensaje: string;
}
