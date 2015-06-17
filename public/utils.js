'use strict';

import config from './config';

export default {
    getSubDomainAliasUrl: (route) => {
        if (config.subDomainAlias === '/' || config.subDomainAlias === '') {
            return route;
        }

        return '/' + config.subDomainAlias + route;
    }
}