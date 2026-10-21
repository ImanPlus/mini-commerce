#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/7ab9ecafdfef2105497f0e1f9396dd807f69e9e701a39715993d04b5d431d119/contract';
import endContract from '../../snapshots/7ab9ecafdfef2105497f0e1f9396dd807f69e9e701a39715993d04b5d431d119/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'Product',
        columns: [
          col('category', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('description', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('price', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
