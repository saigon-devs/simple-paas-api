'use strict';

import React from 'react';
import AuthenticatedComponent from '../libs/AuthenticatedComponent.jsx';

export default AuthenticatedComponent(
    class HomePage extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            return (
                <div>
                    <h3>Tempor proin mauris in rhoncus</h3>

                    <p>Nisi vut sit, et augue? A adipiscing massa. Purus integer vel adipiscing, ultrices vel turpis,
                        mauris
                        pellentesque ultrices, dapibus, habitasse elementum. Elementum elementum, nunc! A nec magna.
                        Aliquet
                        ac odio et phasellus! Natoque! In velit, vel sagittis cursus quis risus odio. Elit odio? Cras eu
                        turpis lorem vel cras! Sed velit facilisis urna, nascetur, lectus! Pulvinar sed magnis. Et.
                        Auctor
                        pid et proin! Diam, ridiculus? Purus? Scelerisque nunc in? Porta amet augue etiam ac eu, proin,
                        lectus porttitor sociis, amet platea magna et? Habitasse amet sociis facilisis pid, nisi! Enim
                        urna
                        amet hac! Ac phasellus. Pulvinar risus ultricies, ac tristique auctor porttitor tempor, augue,
                        diam
                        habitasse lorem turpis sit mauris nascetur rhoncus vel enim scelerisque egestas urna egestas
                        cursus.</p>
                </div>
            );
        }
    }
);