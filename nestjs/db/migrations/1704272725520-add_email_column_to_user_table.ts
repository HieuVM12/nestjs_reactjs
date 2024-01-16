import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmailColumnToUserTable1704272725520 implements MigrationInterface {
    name = 'AddEmailColumnToUserTable1704272725520'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
    }

}
