# nestjs-productos-api

API REST construida con NestJS para consultar productos en SQL Server mediante el Stored Procedure `[CNF].[SP_Productos]`.

## Requisitos

- Node.js 20+
- Acceso a SQL Server

## Configuración

1. Instala dependencias:
   ```bash
   npm install
   ```
2. Copia y ajusta variables de entorno en `.env`:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=1433
   DB_USER=sa
   DB_PASSWORD=yourStrong(!)Password
   DB_NAME=ProductosDB
   DB_ENCRYPT=false
   DB_TRUST_SERVER_CERTIFICATE=true
   ```

## Ejecución

- Modo desarrollo:
  ```bash
  npm run start:dev
  ```

La documentación Swagger está disponible en: `http://localhost:3000/api/docs`.

## Endpoint principal

`GET /productos`

Parámetros requeridos:
- `Tipo`
- `Institucion`
- `Aplicacion`
- `IDGrupo`

Ejemplo de solicitud:
```
GET http://localhost:3000/productos?Tipo=R&Institucion=001&Aplicacion=WEB&IDGrupo=0001
```

Respuesta esperada:
```json
{
  "Respuesta": {
    "codigo": "000",
    "mensaje": "CONSULTA OK"
  },
  "Productos": [
    {
      "IDProducto": "uuid",
      "Servicio": "1008",
      "Proveedor": "012",
      "Producto": "0010121008",
      "Nombre": "CNT - RC - (01104)",
      "ValoresRecarga": [
        { "Valor": "1.00" },
        { "Valor": "2.00", "Detalle": "51 canales TV + 3 GB APP, vigencia 3 días" }
      ],
      "ReversoEnLinea": "SI",
      "TipoPago": "T",
      "NombreGrupo": "RECARGAS"
    }
  ]
}
```

## Docker

Para construir y ejecutar con Docker:

```bash
docker build -t nestjs-productos-api .
```

```bash
docker run --env-file .env -p 3000:3000 nestjs-productos-api
```
