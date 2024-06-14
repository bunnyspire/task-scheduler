# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /backend

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ./src ./src

# Expose the backend port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
