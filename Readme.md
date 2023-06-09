To generate self signed ssl certificate
Run from linux terminal
    openssl req -newkey rsa:4096  -x509  -sha512  -days 365 -nodes -out certificate.pem -keyout privatekey.pem