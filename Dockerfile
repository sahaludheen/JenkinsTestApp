# Use a Node.js base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy files
COPY app.js .
COPY certificate.pem ./
COPY privatekey.pem ./

# Expose the server port
EXPOSE 443

# Start the server
CMD ["node", "app.js"]
