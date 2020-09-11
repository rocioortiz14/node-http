const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;
const server = http.createServer((req, res) => {
        console.log('Petición para' + req.url + ' con el método ' + req.method);

        if (req.method == 'GET') {
            var archivoUrl;
            if (req.url == '/') archivoUrl= '/index.html';
            else archivoUrl = req.url;
            var direccionArchivo= path.resolve('./public'+archivoUrl);
            const extensionArchivo= path.extname(direccionArchivo);
            if (extensionArchivo== '.html') {
              fs.exists(direccionArchivo, (exists) => {
                if (!exists) {
                  res.statusCode = 404;
                  res.setHeader('Content-Type', 'text/html');
                  res.end('<html><body><h1>Error 404: ' + archivoUrl + 
                              ' no se encuentra</h1></body></html>');
                  return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(direccionArchivo).pipe(res);
              });
            }
            else {
              res.statusCode = 404;
              res.setHeader('Content-Type', 'text/html');
              res.end('<html><body><h1>Error 404: ' + archivoUrl + 
                      ' no es un archivo HTML</h1></body></html>');
            }
          }
          else {
              res.statusCode = 404;
              res.setHeader('Content-Type', 'text/html');
              res.end('<html><body><h1>Error 404: ' + req.method + 
                      ' not supported</h1></body></html>');
          }
})
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);

});