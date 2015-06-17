'use strict';

import jwt from 'jsonwebtoken';
import _ from 'lodash';
import {secret} from '../../config/env/all';
import rethinkdbService from '../services/rethinkdb.server.service';

exports.users = (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send("You must send the username and the password");
    }
    if (_.find(users, {username: req.body.username})) {
        return res.status(400).send("A user with that username already exists");
    }

    var profile = _.pick(req.body, 'username', 'password', 'extra');
    profile.id = _.max(users, 'id').id + 1;

    users.push(profile);

    res.status(201).send({
        id_token: createToken(profile)
    });
};

exports.sessionCreate = (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send("You must send the username and the password");
    }

    rethinkdbService.getUserByName(req.body.username, (result)=>{
        let user = _.find(result, {userName: req.body.username});
        if (!user) {
            return res.status(401).send("The username or password don't match");
        }

        if (user.passwordHash !== req.body.password) {
            return res.status(401).send("The username or password don't match");
        }

        res.status(201).send({
            id_token: createToken(user)
        });
    });
};

function createToken(user) {
    return jwt.sign(_.omit(user, 'password'), secret, {expiresInMinutes: 60 * 5});
}