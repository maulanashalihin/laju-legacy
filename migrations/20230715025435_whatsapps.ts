import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("whatsapps", (table) => {
        table.uuid('id').primary().notNullable()
        table.string("name")
        table.string("phone")
        table.string("api_key")
        table.string("status").defaultTo("sleep")
        table.uuid("user_id").index();
        table.uuid("server_id")
        table.string("server_url")
        table.string("connect_url")
        table.integer("port")
        table.boolean("multidevice").defaultTo(false)
        table.string("media_url")
        table.text("tags")
        table.string('delete_time', 16)

        table.string('last_name')
        table.string('last_phone')

        table.string('notif_phone');
        table.boolean("notif_phone_active")

        table.index(['server_id'], 'whatsapp_server_id_index')
        table.index(['status'], 'whatsapp_status_index')

        /**
         * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
         */
        table.timestamp('created_at', { useTz: true })
        table.timestamp('updated_at', { useTz: true })
    })
}


export async function down(knex: Knex): Promise<void> {
}

