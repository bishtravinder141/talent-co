# Use an official node runtime as the parent image
FROM node:14-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./


# Install production dependencies only
RUN npm ci --only=production

RUN npm install vite
# Copy the current directory contents into the container
COPY . .

# Make port 3000 available outside this container
EXPOSE 5173

# Run the app when the container launches
CMD ["npm", "run", "dev"]