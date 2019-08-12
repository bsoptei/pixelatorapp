const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 5000;

http.createServer((request, response) => {
  const url = request.url;
  const urlUpdated = `.${url[1] == '?' ? '/' : url}`;
  const filePath = urlUpdated == './' ? './index.html' : urlUpdated;
  const extname = String(path.extname(filePath)).toLowerCase();
  const writeResponse = code => contentType => content => {
    response.writeHead(code, { 'Content-Type': contentType });
    response.end(content, 'utf-8');
  };

  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.ico': 'image/x-icon',
    '': 'text/html'
  };

  const contentType = mimeTypes[extname];

  if (contentType == undefined) {
    fs.readFile('./400.html', (_, content) => writeResponse(400)('text/html')(content));
  } else {
    fs.readFile(filePath, (error, content) => {
      if (error) {
        fs.readFile('./404.html', (_, content) => writeResponse(404)(contentType)(content));
      } else {
        writeResponse(200)(contentType)(content);
      }
    });
  }

}).listen(PORT);
console.log(`Server running at http://127.0.0.1:${PORT}/`);
