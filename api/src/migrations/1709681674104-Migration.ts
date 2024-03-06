import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709681674104 implements MigrationInterface {
    name = 'Migration1709681674104'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`polls\` ADD \`category\` varchar(250) NULL`);
        await queryRunner.query(`ALTER TABLE \`polls_options\` DROP FOREIGN KEY \`FK_fe13fe7b4c2a66c51fc55e0fb67\``);
        await queryRunner.query(`ALTER TABLE \`polls_options\` CHANGE \`pollId\` \`pollId\` bigint(11) UNSIGNED NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`polls\` DROP FOREIGN KEY \`FK_1bcd3d19f7cf7caccf9dfc6d3c5\``);
        await queryRunner.query(`ALTER TABLE \`polls\` CHANGE \`createdByUserId\` \`createdByUserId\` int(11) UNSIGNED NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`polls_options\` ADD CONSTRAINT \`FK_fe13fe7b4c2a66c51fc55e0fb67\` FOREIGN KEY (\`pollId\`) REFERENCES \`polls\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`polls\` ADD CONSTRAINT \`FK_1bcd3d19f7cf7caccf9dfc6d3c5\` FOREIGN KEY (\`createdByUserId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`polls\` DROP FOREIGN KEY \`FK_1bcd3d19f7cf7caccf9dfc6d3c5\``);
        await queryRunner.query(`ALTER TABLE \`polls_options\` DROP FOREIGN KEY \`FK_fe13fe7b4c2a66c51fc55e0fb67\``);
        await queryRunner.query(`ALTER TABLE \`polls\` CHANGE \`createdByUserId\` \`createdByUserId\` int UNSIGNED NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`polls\` ADD CONSTRAINT \`FK_1bcd3d19f7cf7caccf9dfc6d3c5\` FOREIGN KEY (\`createdByUserId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`polls_options\` CHANGE \`pollId\` \`pollId\` bigint UNSIGNED NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`polls_options\` ADD CONSTRAINT \`FK_fe13fe7b4c2a66c51fc55e0fb67\` FOREIGN KEY (\`pollId\`) REFERENCES \`polls\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`polls\` DROP COLUMN \`category\``);
    }

}
