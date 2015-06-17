'use strict';

export default {
    secret: 'crazy group',
    app: {
        title: 'Simple PAAS',
        description: 'Make your Docker Orchestration more easier...',
        keywords: 'simplepaas'
    },
    port: process.env.PORT || 3000,
    templateEngine: 'swig',
    sessionSecret: 'SimplePaas',
    sessionCollection: 'sessions',
    dockerHost:{
        ip: 'jackyu21404.cloudapp.net',
        port: 2375
    },
    rethinkdb: {
        host: "jackyu21404.cloudapp.net",
        port: 28015,
        authKey: "simplepaas2cbfa42934df4decb01454376fa00d9e",
        db: "simplepaas"
    },
    db:{
        tableList:[{
            tableName: "Users",
            primaryKey: "id"
        },{
            tableName: "PullImagesQueue",
            primaryKey:"id"
        }],
        adminAccount:{
            id: "33020cab-e2d8-4a64-a559-c66e22d2c5bb",
            userName: "admin",
            passwordHash: "123456"
        }
    }
};