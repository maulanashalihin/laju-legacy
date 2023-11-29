import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('years', function (table) {
        table.string('year').primary();  
        table.integer("counter").defaultTo(0); 
    });
}


export async function down(knex: Knex): Promise<void> {
}

