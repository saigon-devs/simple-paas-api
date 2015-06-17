'use strict';

import path from 'path';
import DockerApi from '../../libs/docker-api';
import util from 'util';

const dockerApi = new DockerApi();

exports.containersAction = (req, res) => {
    dockerApi.getAllContainers({all: 1}, function (resData) {
        let containerList = [];
        let containers = JSON.parse(resData.data);
        for (var container of containers) {
            containerList.push({
                id: container.Id,
                command: container.Command,
                name: container.Names || '',
                image: container.Image,
                status: container.Status,
                ports: container.Ports,
                isRunning: container.Status.indexOf('Exited') >= 0 ? 0 : 1
            });
        }
        res.status(200).json(containerList);
    });
};

exports.stopContainer = (req, res) => {
    let containerId = req.params.id;
    dockerApi.stopContainer(containerId, function (resData) {
        let statusCode = resData.statusCode;
        switch (statusCode) {
            case 204:
                res.status(statusCode).json('Container %s is stopped');
                break;
            case 304:
                res.status(statusCode).json('Container %s already stopped');
                break;
            case 404:
                res.status(statusCode).json('no such container %s');
                break;
            case 500:
                res.status(statusCode).json('server error');
                break;
        }
    });
};

exports.stopAllContainers = (req, res) => {
    dockerApi.stopAllContainers(function (resData) {
        let statusCode = resData.statusCode;
        switch (statusCode) {
            case 200:
            case 204:
                res.status(statusCode).send('Containers are stopped');
                break;
            case 304:
                res.status(statusCode).send('Containers already stopped');
                break;
            case 500:
                res.status(statusCode).send('server error');
                break;
        }
    });
};

exports.startContainer = (req, res) => {
    let containerId = req.params.id;
    dockerApi.startContainer(containerId, function (resData) {
        let statusCode = resData.statusCode;
        switch (statusCode) {
            case 204:
            case 200:
                res.status(statusCode).send('Container %s is started');
                break;
            case 304:
                res.status(statusCode).send('Container %s already started');
                break;
            case 404:
                res.status(statusCode).send('no such container %s');
                break;
            case 500:
                res.status(statusCode).send('server error');
                break;
        }
    });
};

exports.createContainer = (req, res)=>{
    var createdReq = {
        "Tty": false
    };
    createdReq.HostConfig ={};
    if(req.body.image !== undefined){
        createdReq.Image = req.body.image;
    }
    if(req.body.env !== undefined){
        createdReq.Env = JSON.parse(req.body.env);
    }
    if(req.body.exposedports !== undefined){
        createdReq.ExposedPorts={};
        createdReq.ExposedPorts[util.format('%d/tcp',req.body.exposedports)] = {};
    }
    if(req.body.entrypoint !== undefined){
        createdReq.Entrypoint = req.body.entrypoint;
    }
    if(req.body.links !== undefined){
        createdReq.HostConfig.Links = JSON.parse(req.body.links);
    }
    if(req.body.binds !== undefined){
        createdReq.HostConfig.Binds = JSON.parse(req.body.binds);
    }
    if(req.body.portbindings !== undefined){
        createdReq.HostConfig.PortBindings = {};
        createdReq.HostConfig.PortBindings[util.format('%d/tcp',req.body.exposedports)] = JSON.parse(req.body.portbindings);
    }

    dockerApi.createContainer(createdReq, (resData)=>{
        res.status(200).json(resData);
    });
};