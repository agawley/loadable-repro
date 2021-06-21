import { Fragment, useState } from 'react';

import loadable from '@loadable/component';

const SomeText = loadable(() => import('./components'), {
    fallback: <div>Loading...</div>,
});

const App = () => {
    const [show, setShow] = useState(false);

    return (
        <Fragment>
            <a href="#" onClick={() => setShow(!show)}>
                show/hide
            </a>
            {show && <SomeText />}
        </Fragment>
    );
};

export default App;
