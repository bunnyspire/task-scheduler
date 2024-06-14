# Use an official Node runtime as a parent image
FROM node:14 AS build

# Set the working directory
WORKDIR /frontend

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Use Nginx to serve the React app
FROM nginx:alpine
COPY --from=build /frontend/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
