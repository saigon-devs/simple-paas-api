/**
 * Created by Phuong on 28/05/15.
 */
import path from 'path';
import DockerApi from '../../libs/docker-api';
import util from 'util';

const dockerApi = new DockerApi();

export default class ImageController {
    getAllImages(req, res){
        dockerApi.getAllImages({all: 0}, function (resData) {
            let imagesList = [];
            let images = JSON.parse(resData.data);
            for (var image of images) {
                imagesList.push({
                    id: image.Id,
                    repository: (image.RepoTags != null && image.RepoTags.length > 0) ? image.RepoTags[0] : '',
                    virtualSize: Math.round(image.VirtualSize / 1000 / 1000),
                    created: new Date(image.Created * 1000).toLocaleString()
                });
            }
            res.status(200).json(imagesList);
        });
    };

    deleteImage(req, res){
        let id = req.params.id;
        dockerApi.removeImage(id, function (resData) {
            let statusCode = resData.statusCode || 200;
            let returnMessage = '';
            switch (statusCode) {
                case 204:
                case 200:
                    returnMessage = 'Image %s is deleted';
                    break;
                case 409:
                    returnMessage = resData.data;
                    break;
                case 404:
                    returnMessage = 'no such image %s';
                    break;
                case 500:
                    returnMessage = resData.data;
                    break;
            }
            res.status(statusCode).json(returnMessage);
        });
    };

    createImage(req, res){
        let fromImage = req.body.fromImage;
        let tag = req.body.tag || 'latest';
        dockerApi.createImage({fromImage: fromImage, tag: tag}, function (resData) {
            let statusCode = resData.statusCode;
            if(statusCode == 500){
                res.status(statusCode).json(resData.data);
            }
            else{
                if(resData.data.indexOf("\"errorDetail\":{\"message\"")>0){
                    var regex = new RegExp('}{', 'g');
                    let logResult = resData.data.replace(regex, '}\r\n{').split('\r\n');
                    for(var log of logResult){
                        if(log != '' && JSON.parse(log).errorDetail != null){
                            res.status(404).json(JSON.parse(log));
                        }
                    }
                }
                else{
                    dockerApi.queryInspectImage(util.format('%s:%s',fromImage, tag), (resData)=>{
                        res.status(statusCode).json(JSON.parse(resData.data));
                    });
                }
            }
        });
    };

    searchImage(req, res){
        let imageName = req.params.term || ' ';
        dockerApi.searchImage(imageName,(resData)=>{
            res.status(200).json(JSON.parse(resData.data));
        });
    };

    queryInspectImage(req, res){
        let imageName = req.params.imagename;
        dockerApi.queryInspectImage(imageName,(resData)=>{
            res.status(200).json(JSON.parse(resData.data));
        })
    };
}