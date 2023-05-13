import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', function (table) {
        table.increments('id').primary(); 
        table.string('email').unique();
        table.string('password');
        table.timestamps();
      
    }) 
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users')
}

