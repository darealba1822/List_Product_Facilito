import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductosResponseDto } from './dto/productos-response.dto';
import { ProductosService } from './productos.service';

@ApiTags('productos')
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  @ApiOperation({ summary: 'Consultar productos' })
  @ApiQuery({ name: 'Tipo', example: 'R', required: true })
  @ApiQuery({ name: 'Institucion', example: '001', required: true })
  @ApiQuery({ name: 'Aplicacion', example: 'WEB', required: true })
  @ApiQuery({ name: 'IDGrupo', example: '0001', required: true })
  @ApiResponse({ status: 200, type: ProductosResponseDto })
  async obtenerProductos(
    @Query('Tipo') tipo: string,
    @Query('Institucion') institucion: string,
    @Query('Aplicacion') aplicacion: string,
    @Query('IDGrupo') idGrupo: string,
  ): Promise<ProductosResponseDto> {
    return this.productosService.obtenerProductos({
      Tipo: tipo,
      Institucion: institucion,
      Aplicacion: aplicacion,
      IDGrupo: idGrupo,
    });
  }
}
