import config from '../../knexfile';

require('dotenv').config()


let DB = require('knex')(config[process.env.DB_CONNECTION]);

DB.connection = (stage)=>{
    DB = require('knex')(config[stage]);
    return DB;
}
export default DB;