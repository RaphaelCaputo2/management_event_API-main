import { MigrationInterface, QueryRunner } from "typeorm";

export class init1653927324032 implements MigrationInterface {
    name = 'init1653927324032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Orders" DROP CONSTRAINT "FK_e94cce9f00ed8773c40f1a72ca1"`);
        await queryRunner.query(`ALTER TABLE "Orders" DROP CONSTRAINT "REL_e94cce9f00ed8773c40f1a72ca"`);
        await queryRunner.query(`ALTER TABLE "Orders" ADD CONSTRAINT "FK_e94cce9f00ed8773c40f1a72ca1" FOREIGN KEY ("paymentMethodId") REFERENCES "Payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Orders" DROP CONSTRAINT "FK_e94cce9f00ed8773c40f1a72ca1"`);
        await queryRunner.query(`ALTER TABLE "Orders" ADD CONSTRAINT "REL_e94cce9f00ed8773c40f1a72ca" UNIQUE ("paymentMethodId")`);
        await queryRunner.query(`ALTER TABLE "Orders" ADD CONSTRAINT "FK_e94cce9f00ed8773c40f1a72ca1" FOREIGN KEY ("paymentMethodId") REFERENCES "Payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
