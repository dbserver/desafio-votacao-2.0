import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1708061181374 implements MigrationInterface {
    name = 'Migration1708061181374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER DATABASE \`${process.env.DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`)
    }

    public async down(_queryRunner: QueryRunner): Promise<void> {
    }
}
