/**
 * Created by Phuong on 28/05/15.
 */
'use strict';

import path from 'path';
import fs from 'fs';
import multipart from 'connect-multiparty';
import uuid from 'node-uuid';
import DockerApi from '../../libs/docker-api';
import del from 'del';
import async from 'async';
import ImageCntrl from '../../app/controllers/image.server.controller';
var exec = require('child_process').exec;

export default function (app) {
    // Root routing
    let imageCntrl = new ImageCntrl();
    app.route('/api/images').get(imageCntrl.getAllImages);
    app.route('/api/images/:id').delete(imageCntrl.deleteImage);
    app.route('/api/images').post(imageCntrl.createImage);
    app.route('/api/images/search/:term').get(imageCntrl.searchImage);

    const multipartMiddleware = multipart();
    app.post('/api/images/upload', multipartMiddleware, function (req, res) {
        let file = req.files.file;
        let originalFilename = file.name;
        var regex = new RegExp('-', 'g');
        let pathUploadFolder = path.resolve('./www/uploads/' + uuid.v4().replace(regex, ''));
        let pathUpload = path.join(pathUploadFolder, originalFilename);
        let dockerFile;
        fs.readFile(file.path, function(err, data) {
            if(!err) {
                async.series([
                    function createFolder(callback){
                        fs.mkdir(pathUploadFolder,function(e){
                            callback(e);
                        });
                    },
                    function storeFile(callback) {
                        fs.writeFile(pathUpload, data, function() {
                            callback(null);
                        });
                    },
                    function tarFile(callback){
                        if(path.extname(pathUpload) !== '.gz'){
                            dockerFile = originalFilename + '.tar.gz';
                            exec('cd ' + pathUploadFolder + ' &&  tar cvf  ' + dockerFile + ' ' + originalFilename , function (err, stdout, stderr) {
                                callback(err);
                            });
                        }
                        else{
                            dockerFile = originalFilename;
                            callback(null);
                        }
                    },
                    function buildImage(callback){
                        new DockerApi().buildImage( path.join(pathUploadFolder,dockerFile), () => {
                            del(pathUploadFolder);
                            callback(null);
                        });
                    },
                    function redirect(callback){
                        res.redirect('back');
                        callback(null);
                    }
                ]);
            }
        });
    });
};
