import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedRole1719314548381 implements MigrationInterface {
  name = 'AddedRole1719314548381';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "role" character varying NOT NULL DEFAULT 'user'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
  }
}
