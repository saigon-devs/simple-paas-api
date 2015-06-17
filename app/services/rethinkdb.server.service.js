/**
 * Created by Phuong on 07/06/15.
 */
import r from "rethinkdb";
import config from '../../config/config';
var  debug = require('debug')('dbService');
import async from 'async';

exports.setup=(callback)=>{
    r.connect({host: config.rethinkdb.host, port: config.rethinkdb.port, authKey:config.rethinkdb.authKey }, (err, conn)=> {
        if (err) {
            debug("[ERROR] Could not open a connection to initialize the database");
            debug(err.message);
            throw err;
        }
        r.dbCreate(config.rethinkdb.db).run(conn, (err, result)=>{
            if(err) {
                debug("[DEBUG] RethinkDB database '%s' already exists (%s:%s)\n%s", config.rethinkdb.db, err.name, err.msg, err.message);
            }
            else {
                debug("[INFO ] RethinkDB database '%s' created", config.rethinkdb.db);
            }
            async.each(config.db.tableList, function(tbl, cb) {
                ((tb)=>{
                    r.db(config.rethinkdb.db)
                        .tableCreate(tb.tableName, {primaryKey: tb.primaryKey})
                        .run(conn, (err, result)=>{
                            if(err) {
                                debug("[DEBUG] RethinkDB table '%s' already exists (%s:%s)\n%s", tb.tableName, err.name, err.msg, err.message);
                            }
                            else {
                                debug("[INFO ] RethinkDB table '%s' created", tb.tableName);
                            }
                            cb();
                        })
                })(tbl);
            }, (err)=>{
                //import dummy data
                r.db(config.rethinkdb.db).table("Users").insert(
                    config.db.adminAccount,
                    {conflict: "replace"}
                ).run(conn);
                if(callback != null){
                    callback(err);
                }
            });
        });
    });
};

//Users api
exports.getUserByName = (userName, callback)=>{
    r.connect(config.rethinkdb).then((conn)=>{
        r.table("Users").filter(r.row("userName").eq(userName))
        .run(conn)
        .then((cursor)=>{
                cursor.toArray(function(err, result) {
                    callback(result);
                });
            });
    });
};
// end
