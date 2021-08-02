import { Fragment, useState } from 'react';

import Select from 'react-select';

const App = () => {
    const [show, setShow] = useState(false);

    return (
        <Select
            name="hi"
            option={[
                { label: 'hello', value: 0 },
                { label: 'world', value: 1 },
            ]}
        />
    );
};

export default App;
