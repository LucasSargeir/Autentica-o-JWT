import path from 'path';
    
module.exports = {
    client: 'mysql',
    connection:{
        client: 'mysql',
        host : '127.0.0.1',
        user : 'teste',
        password : '12345678',
        database : 'teste'
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault: true
}; 