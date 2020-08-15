import knex from 'knex';

const connection = knex({
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        user : 'teste',
        password : '12345678',
        database : 'teste'
    },
    useNullAsDefault: true
});

export default connection;
