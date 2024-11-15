const express = require('express');
const fetch = require('node-fetch');
const session = require('express-session');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000; // Use the PORT environment variable

// Set up session middleware
app.use(session({
    secret: 'your-secret-key', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(express.static('public'));

// Middleware to track request origins
app.use((req, res, next) => {
    if (!req.session.requestOrigins) {
        req.session.requestOrigins = [];
    }
    req.session.requestOrigins.push(req.headers.referer || 'direct');
    next();
});

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
            return `<a ${p1}href="#" onclick="parent.handleAnchorClick('${p2}')" ${p3}>`;
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

// Route to display session data
app.get('/session-data', (req, res) => {
    res.json({
        requestOrigins: req.session.requestOrigins
    });
});

app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});