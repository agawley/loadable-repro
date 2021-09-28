import Select from 'react-select';

const App = () => {
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
