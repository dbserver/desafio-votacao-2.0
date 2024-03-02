import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709408177672 implements MigrationInterface {
    name = 'Migration1709408177672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`polls_options_users\` (\`pollOptionId\` bigint UNSIGNED NOT NULL, \`userId\` int UNSIGNED NOT NULL, \`pollId\` bigint UNSIGNED NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`pollOption\` (\`pollId\`, \`userId\`), PRIMARY KEY (\`pollOptionId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`polls_options\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`option\` varchar(250) NOT NULL, \`selectCount\` int NOT NULL DEFAULT '0', \`pollId\` bigint(11) UNSIGNED NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`polls\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`text\` text NULL, \`ops\` longtext NULL, \`answers\` int NOT NULL DEFAULT '0', \`expiresAt\` timestamp NULL, \`createdByUserId\` int(11) UNSIGNED NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`password\` varchar(64) NULL, \`email\` varchar(255) NOT NULL, \`document\` varchar(14) NOT NULL, \`permission\` varchar(10) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_951b8f1dfc94ac1d0301a14b7e\` (\`uuid\`), FULLTEXT INDEX \`IDX_51b8b26ac168fbe7d6f5653e6c\` (\`name\`), UNIQUE INDEX \`IDX_U_EMAIL\` (\`email\`), UNIQUE INDEX \`IDX_U_DOCUMENT\` (\`document\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`polls_options_users\` ADD CONSTRAINT \`FK_ee1f5ed85b5cd8d90633577db6b\` FOREIGN KEY (\`pollOptionId\`) REFERENCES \`polls_options\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`polls_options_users\` ADD CONSTRAINT \`FK_62762d3dd85d30edbdfe54ffb0d\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`polls_options_users\` ADD CONSTRAINT \`FK_de872a407eed943bca26924d9fa\` FOREIGN KEY (\`pollId\`) REFERENCES \`polls\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`polls_options\` ADD CONSTRAINT \`FK_fe13fe7b4c2a66c51fc55e0fb67\` FOREIGN KEY (\`pollId\`) REFERENCES \`polls\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`polls\` ADD CONSTRAINT \`FK_1bcd3d19f7cf7caccf9dfc6d3c5\` FOREIGN KEY (\`createdByUserId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`polls\` DROP FOREIGN KEY \`FK_1bcd3d19f7cf7caccf9dfc6d3c5\``);
        await queryRunner.query(`ALTER TABLE \`polls_options\` DROP FOREIGN KEY \`FK_fe13fe7b4c2a66c51fc55e0fb67\``);
        await queryRunner.query(`ALTER TABLE \`polls_options_users\` DROP FOREIGN KEY \`FK_de872a407eed943bca26924d9fa\``);
        await queryRunner.query(`ALTER TABLE \`polls_options_users\` DROP FOREIGN KEY \`FK_62762d3dd85d30edbdfe54ffb0d\``);
        await queryRunner.query(`ALTER TABLE \`polls_options_users\` DROP FOREIGN KEY \`FK_ee1f5ed85b5cd8d90633577db6b\``);
        await queryRunner.query(`DROP INDEX \`IDX_U_DOCUMENT\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_U_EMAIL\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_51b8b26ac168fbe7d6f5653e6c\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_951b8f1dfc94ac1d0301a14b7e\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`polls\``);
        await queryRunner.query(`DROP TABLE \`polls_options\``);
        await queryRunner.query(`DROP INDEX \`pollOption\` ON \`polls_options_users\``);
        await queryRunner.query(`DROP TABLE \`polls_options_users\``);
    }

}
