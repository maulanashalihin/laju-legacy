import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("open_ai_api", (table) => {
        table.string('id').primary().notNullable()  

        table.integer("tokens").defaultTo(1000).index()

        table.bigInteger("created_at")
        
        table.bigInteger("updated_at")

    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users')
}

