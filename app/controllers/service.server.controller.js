'use strict';

import path from 'path';
import DockerApi from '../../libs/docker-api';

const dockerApi = new DockerApi();

export default class ServiceController {
    getDockerVersion(req, res){
        dockerApi.getVersion((resData)=>{
            res.status(200).json(JSON.parse(resData.data));
        });
    };

    getSystemWideInfo(req, res){
        dockerApi.getSystemWideInfo((resData)=>{
            res.status(200).json(JSON.parse(resData.data));
        });
    };

    servicesAction(req, res){
        res.json([
            {
                id: 1,
                type: 1,
                name: "testwordpress1",
                status: 1,
                image: "hvn/wordpress:latest",
                deployed: "a day ago",
            }
        ]);
    };
}

