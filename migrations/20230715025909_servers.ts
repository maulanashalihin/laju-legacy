import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    await knex.schema.createTable("servers", (table) => {
        table.uuid('id').primary().notNullable() 
        
        table.string("server_url");
        table.integer("capasity").defaultTo(200)
        table.integer("usage").defaultTo(0);
        table.integer("available").defaultTo(200).index()
        table.string("media_url");
  
        table.timestamp('created_at', { useTz: true })
        table.timestamp('updated_at', { useTz: true })
      })
}


export async function down(knex: Knex): Promise<void> {
}

