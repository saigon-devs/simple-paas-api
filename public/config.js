'use strict';

import LoginStore from './stores/LoginStore';

export default {
    serverUrl: 'http://localhost:3000',
    subDomainAlias: '/',
    defaultAjaxOptions: {
        dataType: 'json',
        cache: false,
        async: false,
        beforeSend: (request) => {
            request.setRequestHeader("Authorization", 'Bearer ' + (LoginStore.jwt || ''));
        }
    }
}