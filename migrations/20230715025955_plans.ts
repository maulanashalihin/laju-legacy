import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    await knex.schema.createTable("plans", (table) => {
        table.uuid('id').primary().notNullable() 
        table.string("title")
        table.text("description")
        table.string("call_to_action_text")
        table.text("point_includes")
        table.boolean("available_in_checkout").defaultTo(true)
        table.boolean("is_renewable").defaultTo(true)
        table.boolean("active_plan").defaultTo(true)
        table.integer("time")
        table.string('time_unit')
        table.integer("time_in_day")
        table.integer("time_in_month")
        table.integer("device_number")
        table.bigInteger("price")
        table.bigInteger("fake_price")
        table.bigInteger("daily_price")
        table.bigInteger("monthly_price")
        table.boolean("default_plan").defaultTo(false)
   
        /**
         * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
         */
        table.timestamp('created_at', { useTz: true })
        table.timestamp('updated_at', { useTz: true })
      })
}


export async function down(knex: Knex): Promise<void> {
}

