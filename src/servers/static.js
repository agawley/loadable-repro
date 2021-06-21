import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';

import App from '../client/app';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import path from 'path';
import serverless from 'serverless-http';

// Setup the server
export const app = express();
app.set('view engine', 'pug');

app.use(
    '/public',
    express.static(path.normalize(path.join(__dirname, '../', 'public')), {
        cacheControl: true,
        setHeaders: res => {
            res.setHeader('Cache-Control', 'max-age=2592000, immutable');
            res.setHeader('X-Robots-Tag', 'noindex');
        },
    })
);

app.get('/*', (req, res) => {
    console.log('start');
    res.setHeader('Surrogate-Control', 'no-store');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    res.setHeader('Expires', '0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('X-Robots-Tag', 'noindex');
    //res.sendFile(path.normalize(path.join(__dirname, '../', 'public/index.html')));

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

const baseHandler = serverless(app);
export const handler = (event, context) => {
    if (event.source === 'serverless-plugin-warmup') {
        console.log('Warmer function');
        return 'Lambda is warm!';
    }
    return baseHandler(event, context);
};
