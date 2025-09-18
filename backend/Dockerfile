# Use official Node.js image
FROM node:18

# Create app directory
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Expose port (change if needed)
EXPOSE 5000

# Start backend app
CMD ["npm", "start"]