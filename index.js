/**
 * http://localhost:3000/demo_unit?d1=123&d2=345&result=pass
 * curl -X POST 'http://localhost:3000/demo_unit?d1=123&d2=345&result=pass'
 */
const http = require('http');
const url = require('url');
var count = 0;
const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  
  if (req.method === 'POST' && pathname === '/demo_unit') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const data = query;
      const result = data.result === 'pass' ? 'success' : 'failure';
      console.log(`Count : ${count++}`);
      console.log(`Data 1: ${data.d1}`);
      console.log(`Data 2: ${data.d2}`);
      console.log(`Result: ${result}\n`);
      res.writeHead(202, {'Content-Type': 'text/plain'});
      res.end('202');
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Page not found\n');
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
