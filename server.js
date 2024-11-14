const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/proxy', async (req, res) => {
    const url = req.query.url;
    try {
        const response = await fetch(url);
        const contentType = response.headers.get('content-type');
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Content-Type', contentType);
        let data = await response.text();

        // Rewrite URLs for specific static resources, including relative paths
        const baseUrl = new URL(url).origin;
        data = data.replace(/(href|src)="([^"]+)"/g, (match, p1, p2) => {
            const newUrl = new URL(p2, baseUrl).href;
            return `${p1}="${newUrl}"`;
        });

        // Replace anchor tags with function calls, handling additional attributes
        data = data.replace(/<a\s+([^>]*?)href="([^"]+)"([^>]*)>/g, (match, p1, p2, p3) => {
            return `<a ${p1}href="#" onclick="handleAnchorClick('${p2}')" ${p3}>`;
        });

        res.send(data);
    } catch (error) {
        res.status(500).send('Error fetching the URL');
    }
});

app.get('/proxy/*', async (req, res) => {
    const url = req.originalUrl.replace('/proxy/', '');
    try {
        const response = await fetch(url);
        const contentType = response.headers.get('content-type');
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Content-Type', contentType);
        const data = await response.buffer();
        res.send(data);
    } catch (error) {
        res.status(500).send('Error fetching the URL');
    }
});

app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});