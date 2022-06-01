import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1653695254094 implements MigrationInterface {
  name = 'init1653695254094';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "method" character varying NOT NULL, CONSTRAINT "PK_50c3077812277d7b8c68c54d61a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL,  "password" character varying NOT NULL, "phone" character varying NOT NULL,  "role" character varying NOT NULL, CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "ticketId" uuid, "userId" uuid, "paymentMethodId" uuid, CONSTRAINT "REL_e94cce9f00ed8773c40f1a72ca" UNIQUE ("paymentMethodId"), CONSTRAINT "PK_ce8e3c4d56e47ff9c8189c26213" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Tickets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "eventId" uuid, CONSTRAINT "PK_6533595a87a7d0e3b7ed082b2aa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "locale" character varying NOT NULL, "stock" integer NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_894abf6d0c8562b398c717414d6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "Orders" ADD CONSTRAINT "FK_de14738df3ccc4c2b07a0b4fc69" FOREIGN KEY ("ticketId") REFERENCES "Tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Orders" ADD CONSTRAINT "FK_cc257418e0228f05a8d7dcc5553" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Orders" ADD CONSTRAINT "FK_e94cce9f00ed8773c40f1a72ca1" FOREIGN KEY ("paymentMethodId") REFERENCES "Payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Tickets" ADD CONSTRAINT "FK_f26583cdf2b701b6406a85fa43b" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Tickets" DROP CONSTRAINT "FK_f26583cdf2b701b6406a85fa43b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Orders" DROP CONSTRAINT "FK_e94cce9f00ed8773c40f1a72ca1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Orders" DROP CONSTRAINT "FK_cc257418e0228f05a8d7dcc5553"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Orders" DROP CONSTRAINT "FK_de14738df3ccc4c2b07a0b4fc69"`,
    );
    await queryRunner.query(`DROP TABLE "Event"`);
    await queryRunner.query(`DROP TABLE "Tickets"`);
    await queryRunner.query(`DROP TABLE "Orders"`);
    await queryRunner.query(`DROP TABLE "Users"`);
    await queryRunner.query(`DROP TABLE "Payments"`);
  }
}
