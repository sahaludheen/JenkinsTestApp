const https = require('https');
const fs = require('fs');

const options = {
  //key: fs.readFileSync('private-key.pem'),     // Replace with the path to your private key file
  key: fs.readFileSync('./privatekey.pem'),
  //cert: fs.readFileSync('certificate.pem')     // Replace with the path to your certificate file
  cert: fs.readFileSync('./certificate.pem')
};

const server = https.createServer(options, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello , World over HTTPS!');
});

const port = 443;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
