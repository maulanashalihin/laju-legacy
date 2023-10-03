import config from "../../knexfile";

require("dotenv").config();

import DBInstance from "knex";
import { Knex } from "knex";

interface DBType extends Knex {
   connection: (stage: string) => DBType;
}

let DB = DBInstance(config[process.env.DB_CONNECTION]) as DBType;

DB.connection = (stage: string) => {
   return DBInstance(config[stage]) as DBType;
};
export default DB;
