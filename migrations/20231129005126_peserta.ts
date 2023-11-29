import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('peserta', function (table) {
        table.string('id').primary().notNullable()
        table.string('name', 255) 
        table.string('kelas', 255)
        table.string("juz");
        table.string("no_peserta");  
        table.string("sekolah")
        table.string('user_id', 255).index(); 
        /**
         * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
         */
        table.bigInteger("created_at")
        table.bigInteger("updated_at")
      
    }) 
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('peserta')
}

