import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ProductosResponseDto } from './dto/productos-response.dto';

interface ProductoRecord {
  IDProducto: string;
  Servicio: string;
  Proveedor: string;
  Producto: string;
  Nombre: string;
  Valor: string;
  Detalle?: string;
  ReversoEnLinea: string;
  TipoPago: string;
  NombreGrupo: string;
}

@Injectable()
export class ProductosService {
  constructor(private readonly databaseService: DatabaseService) {}

  async obtenerProductos(params: {
    Tipo: string;
    Institucion: string;
    Aplicacion: string;
    IDGrupo: string;
  }): Promise<ProductosResponseDto> {
    const result = await this.databaseService.executeStoredProcedure<ProductoRecord>(
      '[CNF].[SP_Productos]',
      params,
    );

    const productosMap = new Map<string, ProductosResponseDto['Productos'][0]>();

    result.recordset.forEach((record) => {
      const key = record.IDProducto;
      const producto = productosMap.get(key) ?? {
        IDProducto: record.IDProducto,
        Servicio: record.Servicio,
        Proveedor: record.Proveedor,
        Producto: record.Producto,
        Nombre: record.Nombre,
        ValoresRecarga: [],
        ReversoEnLinea: record.ReversoEnLinea,
        TipoPago: record.TipoPago,
        NombreGrupo: record.NombreGrupo,
      };

      if (record.Valor) {
        producto.ValoresRecarga.push({
          Valor: record.Valor,
          Detalle: record.Detalle || undefined,
        });
      }

      productosMap.set(key, producto);
    });

    return {
      Respuesta: {
        codigo: '000',
        mensaje: 'CONSULTA OK',
      },
      Productos: Array.from(productosMap.values()),
    };
  }
}
