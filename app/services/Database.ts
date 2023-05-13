import config from '../../knexfile';



let knex = require('knex')(config.development);
 
knex.connection = (stage)=>{
    knex = require('knex')(config[stage]);
    return knex;
}
export default knex;