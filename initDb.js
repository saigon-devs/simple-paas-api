var init = require('./config/init')(),
    config = require('./config/config'),
    debug = require('debug')('initDb:debug'),
    error = require('debug')('initDb:error');

import r from "rethinkdb";
import async from 'async';

class InitDatabase{
    constructor(){
        this._connection = {};
    }

    initDB(){
        return r.connect({
            host: config.rethinkdb.host,
            port: config.rethinkdb.port,
            authKey:config.rethinkdb.authKey
        },(err, conn)=>{
            if(err) throw err;
            this._connection = conn;
            async.series([
                (cb)=>{this.createDb(cb)},
                (cb)=>{this.createTable('Users', 'Id', cb)},
                (cb)=>{this.createTable('PullImagesQueue', 'Id', cb)},
                (cb)=>{this.importUsers(cb)}
            ], function (err, result) {
                debug('Done !');
                process.exit();
            });
        });
    };

    createDb(cb){
        debug('Create database');
        r.dbCreate(config.rethinkdb.db).run(this._connection, (err, result)=>{
            if(err) {
                error("RethinkDB database '%s' already exists (%s:%s)", config.rethinkdb.db, err.name, err.msg);
            }
            else {
                debug("RethinkDB database '%s' created", config.rethinkdb.db);
            }
            cb(null,'');
        });
    };

    createTable(tableName, primaryKey, cb){
        debug("Create table '%s'", tableName);
        r.db(config.rethinkdb.db)
            .tableCreate(tableName, {primaryKey: primaryKey})
            .run(this._connection, (err, result)=>{
                if(err) {
                    error("RethinkDB table '%s' already exists (%s:%s)", tableName, err.name, err.msg);
                }
                else {
                    debug("RethinkDB table '%s' created", tableName);
                }
                cb(null, '');
            });
    };

    importUsers(cb){
        let userList = [
            {
                id: "33020cab-e2d8-4a64-a559-c66e22d2c5bb",
                userName: "admin",
                passwordHash: "123456"
            }
        ];
        r.db(config.rethinkdb.db)
            .table('Users')
            .insert(userList, {conflict: "replace"})
            .run(this._connection, (err, result)=>{
                if(err) {
                    error("Failed to import users");
                }
                else {
                    debug("Added users");
                }
                cb(null, '');
            });
    };
}

// Roll out everything
new InitDatabase().initDB();