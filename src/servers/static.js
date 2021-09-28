import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';

import App from '../client/app';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import path from 'path';
import serverless from 'serverless-http';

// Setup the server
export const app = express();
app.set('view engine', 'pug');

app.use('/public', express.static(path.normalize(path.join(__dirname, '../', 'public'))));

app.get('/*', (req, res) => {
    const statsFile = path.normalize(path.join(__dirname, '../', 'public/loadable-stats.json'));
    const extractor = new ChunkExtractor({ statsFile });

    const context = {};
    const app = ReactDOMServer.renderToString(
        <ChunkExtractorManager extractor={extractor}>
            <App />
        </ChunkExtractorManager>
    );
    const scriptTags = extractor.getScriptTags();
    const linkTags = extractor.getLinkTags();
    console.log(app);

    res.setHeader('content-type', 'text/html; charset=utf-8');
    res.status(200);
    res.write('<html><head>');
    res.write(linkTags);
    res.write('</head><body><div id="root">');
    res.write(app);
    res.write('</div>');
    res.write(scriptTags);
    res.end('</body></html>');
});

export const handler = serverless(app);
