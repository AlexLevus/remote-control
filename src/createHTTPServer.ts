import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

const createHTTPServer = () =>
    http.createServer((req, res) => {
        const __dirname = path.resolve(path.dirname(''));
        const file_path = __dirname + (req.url === '/' ? '/front/index.html' : '/front' + req.url);
        fs.readFile(file_path, function (err, data) {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200);
            res.end(data);
        });
    });

export default createHTTPServer;
