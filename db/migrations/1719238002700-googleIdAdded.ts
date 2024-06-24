import { MigrationInterface, QueryRunner } from 'typeorm';

export class GoogleIdAdded1719238002700 implements MigrationInterface {
  name = 'GoogleIdAdded1719238002700';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "google_id" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "google_id"`);
  }
}
