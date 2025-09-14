# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Expose frontend port
EXPOSE 3000

# Start frontend in dev mode
CMD ["npm", "run", "dev"]