import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as sql from 'mssql';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);
  private pool: sql.ConnectionPool | null = null;

  async onModuleInit() {
    const config: sql.config = {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      server: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 1433,
      options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true',
      },
    };

    this.pool = await sql.connect(config);
    this.logger.log('Conexión a SQL Server establecida');
  }

  async onModuleDestroy() {
    if (this.pool) {
      await this.pool.close();
      this.logger.log('Conexión a SQL Server cerrada');
    }
  }

  async executeStoredProcedure<T>(
    procedure: string,
    params: Record<string, string | number>,
  ): Promise<sql.IResult<T>> {
    if (!this.pool) {
      throw new Error('La conexión a SQL Server no está inicializada.');
    }

    const request = this.pool.request();
    Object.entries(params).forEach(([key, value]) => {
      request.input(key, value as string | number);
    });

    return request.execute<T>(procedure);
  }
}
