"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
var mysql_1 = require("mysql");
function connect() {
    var connection = mysql_1.createConnection({
        host: 'localhost',
        database: 'ELECTIONS',
        user: 'root',
        password: 'password'
    });
    return connection;
}
exports.connect = connect;
