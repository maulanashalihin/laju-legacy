import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    knex.schema.createTable("posts",(table)=>{
        table.string("title")
    })
}


export async function down(knex: Knex): Promise<void> {
}

