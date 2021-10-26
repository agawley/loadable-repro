import App from './app.js';
import ReactDOM from 'react-dom';
import { loadableReady } from '@loadable/component';

loadableReady(() => {
    ReactDOM.hydrate(<App />, document.getElementById('root'));
});
