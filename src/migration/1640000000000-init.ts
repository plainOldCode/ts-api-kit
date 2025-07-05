import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1640000000000 implements MigrationInterface {
  name = 'Init1640000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`base_entity\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`name\` varchar(255) NOT NULL,
        \`state\` enum ('ACTIVE', 'INACTIVE', 'PENDING', 'DELETED') NOT NULL DEFAULT 'ACTIVE',
        \`description\` text,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE \`user\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`name\` varchar(255) NOT NULL,
        \`state\` enum ('ACTIVE', 'INACTIVE', 'PENDING', 'DELETED') NOT NULL DEFAULT 'ACTIVE',
        \`description\` text,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`email\` varchar(255) NOT NULL,
        \`password\` varchar(255) NOT NULL,
        \`firstName\` varchar(255),
        \`lastName\` varchar(255),
        PRIMARY KEY (\`id\`),
        UNIQUE INDEX \`IDX_email\` (\`email\`)
      ) ENGINE=InnoDB
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`IDX_email\` ON \`user\``);
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`base_entity\``);
  }
}