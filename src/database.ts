import { createConnection } from 'mysql';

export function connect() {

    const connection = createConnection({
        host: 'localhost',
        database: 'ELECTIONS',
        user: 'root',
        password: 'password'
    });

    return connection;
}