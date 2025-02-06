FROM node:16-alpine

WORKDIR /app

# Copy ONLY package files for dependency installation
COPY package*.json ./

# Install dependencies (explicitly)
RUN npm install

# Copy ALL project files AFTER dependencies are installed
COPY . /app

# Build the React app





EXPOSE 3000

CMD ["npm", "run", "start"]

